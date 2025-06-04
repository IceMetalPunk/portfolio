export interface YTThumbnail {
  url: string;
  width: number;
  height: number;
}
export interface YTThumbnailList {
  default?: YTThumbnail;
  medium?: YTThumbnail;
  high?: YTThumbnail;
  standard?: YTThumbnail;
  maxres?: YTThumbnail;
}
export interface YTSnippetBase {
  publishedAt: string;
  channelId: string;
  channelTitle: string;
  thumbnails: YTThumbnailList;
}
export interface YTUploadSnippet extends YTSnippetBase {
  type: 'upload';
  title: string;
  description: string;
}
export interface YTSubscriptionSnippet extends YTSnippetBase {
  type: 'subscription';
}
export interface YTVideoSnippet extends YTSnippetBase {
  liveBroadcastContent: 'upcoming' | 'live' | 'none';
  publishTime: string;
  title: string;
  description: string;
}
export type YTSnippet =
  | YTUploadSnippet
  | YTSubscriptionSnippet
  | YTVideoSnippet;

export type YTKind = 'youtube#activity' | 'youtube#searchResult';
export interface YTVideoId {
  videoId: string;
  kind: 'youtube#video';
}
export interface YTResultItem<T extends YTSnippet> {
  kind: YTKind;
  etag: string;
  id: string | YTVideoId;
  snippet: T;
}

export type YTResultsGenerator<T extends YTSnippet> = AsyncGenerator<
  YTResultItem<T>,
  void,
  void
>;
