import { config } from 'dotenv';
import { Request, Response, Router } from 'express';
import { Pool, QueryResult, QueryResultRow } from 'pg';
import {
  Nullable,
  YTResultItem,
  YTResultsGenerator,
  YTSnippet,
  YTThumbnail,
  YTThumbnailList,
  YTVideoId,
  YTVideoSnippet,
} from 'types.js';
import { numericQueryParam, prepareFormFields, sanitizeDbValuesForHTML } from '../util/util.js';
import formidable, { Fields, Files } from 'formidable';
config();
export const APIRouter: Router = Router();
const formHandler = formidable();

// const connectionString = `postgresql://${process.env.SUPABASE_UN}:${process.env.SUPABASE_PW}@${process.env.SUPABASE_DOMAIN}:${process.env.SUPABASE_PORT}/${process.env.SUPABASE_DB}`;
const connectionString = process.env.DB_URL ?? '';
const pool = new Pool({ connectionString });

async function sendEmail(body: string, subject: Nullable<string>, name: Nullable<string>, reply_to: Nullable<string>): Promise<string> {
  const data: FormData = new FormData();
  data.append('service_id', process.env.EMAIL_SERVICE!);
  data.append('template_id', process.env.EMAIL_TEMPLATE!);
  data.append('user_id', process.env.EMAIL_PUBLIC_KEY!);
  data.append('accessToken', process.env.EMAIL_PRIVATE_KEY!);

  data.append('title', subject || '(No Subject)');
  data.append('name', name || 'Anonymous');
  if (reply_to) {
    data.append('email', reply_to);
  }
  data.append('message', body);

  const res: globalThis.Response = await fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
    method: 'POST',
    body: data
  });
  const result: string = await res.text();
  return (result === 'OK') ? '' : result;
}

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

APIRouter.post('/sendContact', async (req, res) => {
  const [fields, _]: [Fields<string>, Files<string>] = await formHandler.parse(req);
  if (!fields?.body) {
    res.json({ success: false, error: 'You must enter a message.' });
    return;
  }
  const preparedFields = prepareFormFields(fields, ['body', 'subject', 'name', 'reply_to'], ['body']);
  if (!preparedFields) {
    res.json({ success: false, error: 'You must enter a message.' });
    return;
  }
  const result: string = await sendEmail(preparedFields.body!, preparedFields.subject, preparedFields.name, preparedFields.reply_to);
  if (!result) {
    res.json({ success: true });
    return;
  }
  res.json({ success: false, error: result });
})