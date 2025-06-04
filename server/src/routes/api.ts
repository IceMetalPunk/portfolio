import { config } from 'dotenv';
import { Request, Response, Router } from 'express';
import { Pool, QueryResult, QueryResultRow } from 'pg';
import {
  YTResultItem,
  YTResultsGenerator,
  YTSnippet,
  YTThumbnail,
  YTThumbnailList,
  YTVideoId,
  YTVideoSnippet,
} from 'types.js';
import { numericQueryParam, sanitizeDbValuesForHTML } from '../util/util.js';
config();
export const APIRouter: Router = Router();

const connectionString = `postgresql://${process.env.SUPABASE_UN}:${process.env.SUPABASE_PW}@${process.env.SUPABASE_DOMAIN}:${process.env.SUPABASE_PORT}/${process.env.SUPABASE_DB}`;
const pool = new Pool({ connectionString });

async function* getYouTubeResults<T extends YTSnippet>(
  url: string,
  params: Record<string, string>
): YTResultsGenerator<T> {
  const query = new URLSearchParams(params);
  query.set('channelId', process.env.YT_CHANNEL_ID as string);
  query.set('key', process.env.YT_API_KEY as string);
  const fullURL: URL = new URL(url);
  while (true) {
    fullURL.search = query.toString();
    const response = await fetch(fullURL);
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

async function* getYouTubeResultsByIds<T extends YTSnippet>(
  url: string,
  params: Record<string, string>,
  ids: Array<string>
): YTResultsGenerator<T> {
  const query = new URLSearchParams(params);
  query.set('key', process.env.YT_API_KEY as string);
  const fullURL: URL = new URL(url);
  let idList: Array<string> = [...ids];
  while (true) {
    const currentIdSet: Array<string> = idList.splice(0, 50);
    query.set('id', currentIdSet.join(','));
    fullURL.search = query.toString();
    const response = await fetch(fullURL);
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
      idList = [...ids];
      query.set('pageToken', json.nextPageToken as string);
    } else if (idList.length <= 0) {
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
  videos: YTResultsGenerator<YTVideoSnippet>,
  videoIdType: 'object' | 'string' = 'object'
): Promise<Array<string>> => {
  const cachedIds: Array<string> = [];
  for await (let video of videos) {
    let id: string;
    if (videoIdType === 'object') {
      id = (video.id as YTVideoId).videoId;
    } else {
      id = video.id as string;
    }
    cachedIds.push(id);
    const title: string = video.snippet.title;
    const description: string = video.snippet.description;
    const thumbnail: YTThumbnail | null = getBestThumbnail(
      video.snippet.thumbnails
    );
    const thumbnailUrl: string = thumbnail?.url ?? '';
    const etag: string = video.etag;
    const publishedTime: string =
      video.snippet.publishTime ?? video.snippet.publishedAt;
    await pool.query(
      'INSERT INTO synthia_videos (id, title, description, thumbnail_url, published_at, etag) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO UPDATE SET title=$2, description=$3, thumbnail_url=$4, etag=$6',
      [id, title, description, thumbnailUrl, publishedTime, etag]
    );
  }
  await pool.query('UPDATE metadata SET last_video_check=$1 WHERE id=$2', [
    new Date(),
    1,
  ]);
  return cachedIds;
};

const updateVideoDescriptions = async (
  allIds: Array<string>
): Promise<void> => {
  if (allIds.length <= 0) {
    return;
  }
  const url: string = 'https://www.googleapis.com/youtube/v3/videos';
  const params: Record<string, string> = {
    part: 'snippet',
  };

  const videoDescriptions: YTResultsGenerator<YTVideoSnippet> =
    getYouTubeResultsByIds<YTVideoSnippet>(url, params, allIds);
  await updateVideoCache(videoDescriptions, 'string');
};

APIRouter.get('/getLatestVideos', async (req: Request, res: Response) => {
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
    params.publishedAfter = lastCheck.toISOString();
  }
  const videos: YTResultsGenerator<YTVideoSnippet> =
    getYouTubeResults<YTVideoSnippet>(url, params);
  const newResultIds: Array<string> = await updateVideoCache(videos);
  if (newResultIds.length > 0) {
    await updateVideoDescriptions(newResultIds);
    console.log(
      'Found ' + newResultIds.length.toString() + ' new videos and cached them.'
    );
  }

  const limit: number = numericQueryParam(req, 'limit', 0);
  const offset: number = (numericQueryParam(req, 'page', 1) - 1) * limit;
  const allVideos: QueryResult<QueryResultRow> = await pool.query(
    'SELECT * FROM synthia_videos ORDER BY published_at DESC LIMIT $1 OFFSET $2',
    [limit > 0 ? limit : null, offset]
  );
  sanitizeDbValuesForHTML(allVideos);
  res.json(allVideos.rows);
});
