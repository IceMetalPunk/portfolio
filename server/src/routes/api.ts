import { config } from 'dotenv';
import { Request, Response, Router } from 'express';
import { Pool, QueryResult } from 'pg';
import {
  YTResultItem,
  YTSnippet,
  YTThumbnail,
  YTThumbnailList,
  YTVideoId,
  YTVideoSnippet,
} from 'types.js';
config();
export const APIRouter: Router = Router();

const connectionString = `postgresql://${process.env.SUPABASE_UN}:${process.env.SUPABASE_PW}@${process.env.SUPABASE_DOMAIN}:${process.env.SUPABASE_PORT}/${process.env.SUPABASE_DB}`;
const pool = new Pool({ connectionString });

async function* getYouTubeResults<T extends YTSnippet>(
  url: string,
  params: Record<string, string>
): AsyncGenerator<YTResultItem<T>, void, boolean> {
  const query = new URLSearchParams(params);
  query.set('channelId', process.env.YT_CHANNEL_ID as string);
  query.set('key', process.env.YT_API_KEY as string);
  while (true) {
    const response = await fetch(url + '?' + query.toString());
    const json: Record<string, unknown> = (await response.json()) as Record<
      string,
      unknown
    >;
    if (json.items) {
      for (let item of json.items as Array<YTResultItem<T>>) {
        yield item;
      }
    }
    if (json.nextPageToken) {
      query.set('pageToken', json.nextPageToken as string);
    } else {
      return;
    }
  }
}

const getBestThumbnail = (thumbnails: YTThumbnailList): YTThumbnail | null => {
  const descendingQualityOrder: Array<keyof YTThumbnailList> = [
    'maxres',
    'high',
    'default',
    'medium',
    'standard',
  ];
  for (let quality of descendingQualityOrder) {
    if (thumbnails.hasOwnProperty(quality)) {
      return thumbnails[quality]!;
    }
  }
  return null;
};
const updateVideoCache = async (
  videos: Array<YTResultItem<YTVideoSnippet>>
): Promise<void> => {
  for (let video of videos) {
    const id: string = (video.id as YTVideoId).videoId;
    const title: string = video.snippet.title;
    const description: string = video.snippet.description;
    const thumbnail: YTThumbnail | null = getBestThumbnail(
      video.snippet.thumbnails
    );
    const thumbnailUrl: string = thumbnail?.url ?? '';
    const etag: string = video.etag;
    const publishedTime: string = video.snippet.publishTime;
    await pool.query(
      'INSERT INTO synthia_videos (id, title, description, thumbnail_url, published_at, etag) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING',
      [id, title, description, thumbnailUrl, publishedTime, etag]
    );
  }
  await pool.query('UPDATE metadata SET last_video_check=$1 WHERE id=$2', [
    new Date(),
    1,
  ]);
};

APIRouter.get('/getLatestVideos', async (_: Request, res: Response) => {
  const url: string = 'https://www.googleapis.com/youtube/v3/search';
  const params: Record<string, string> = {
    part: 'snippet',
    maxResults: '50',
    order: 'date',
    q: 'Synthia',
    type: 'video',
  };
  const lastCheckResult: QueryResult = await pool.query(
    'SELECT * FROM metadata'
  );
  if (
    lastCheckResult &&
    lastCheckResult.rowCount &&
    lastCheckResult.rowCount > 0
  ) {
    const lastCheck: Date = lastCheckResult.rows[0].last_video_check;
    // lastCheck.setDate(lastCheck.getDate() - 1000); // DEBUG CODE TO PULL OLDER VIDEOS
    params.publishedAfter = lastCheck.toISOString();
  }
  const videos: Array<YTResultItem<YTVideoSnippet>> = await Array.fromAsync(
    getYouTubeResults<YTVideoSnippet>(url, params)
  );
  console.log('Found ' + videos.length.toString() + ' new videos. Cacheing...');
  await updateVideoCache(videos);
  const allVideos: QueryResult = await pool.query(
    'SELECT * FROM synthia_videos'
  );
  res.json(allVideos.rows);
});
