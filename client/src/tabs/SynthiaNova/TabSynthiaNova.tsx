import './TabSynthiaNova.css';
import { useCallback, useState } from 'react';
import { useFetchJson } from '../../util/util';
import { VideoCard } from './VideoCard';
import { LyricsPanel, type LyricsPanelProps } from './LyricsPanel';

type VideoResult = {
  id: string;
  title: string;
  thumbnail_url: string;
  description?: string;
  published_at: string;
  etag: string;
  created_at: string;
};

export const TabSynthiaNova = () => {
  const [lyricsData, setLyricsData] = useState<LyricsPanelProps>({
    fullTitle: 'N/A',
    description: '',
    open: false,
  });
  const toggleLyricsPanel = useCallback(() => {
    setLyricsData((current: LyricsPanelProps) => {
      return {
        ...current,
        open: !current.open,
      };
    });
  }, []);
  const [fetchParams, setFetchParams] = useState<Record<string, string>>({
    limit: '15',
    page: '1',
  });
  const [videoResults, fetchingVideos, videoFetchError] = useFetchJson(
    '/api/getLatestVideos',
    fetchParams
  );
  const changePage = useCallback((amount: number) => {
    setFetchParams((previous) => {
      return {
        ...previous,
        page: (parseInt(previous.page) + amount).toString(),
      };
    });
  }, []);
  if (fetchingVideos) {
    return <em>Getting list of Synthia Nova videos...</em>;
  }
  if (videoFetchError) {
    return (
      <strong style={{ color: '#aa0000' }}>
        Error getting video list: {videoFetchError.toString()}
      </strong>
    );
  }

  return (
    <div className='video-container'>
      <div className='video-card-container'>
        {(videoResults as Array<VideoResult>).map((record: VideoResult) => {
          return (
            <VideoCard
              id={record.id}
              title={record.title}
              thumbnail_url={record.thumbnail_url}
              description={record.description ?? ''}
              setLyricsData={setLyricsData}
            />
          );
        })}
        <div className='video-card-footer'>
          {parseInt(fetchParams.page) > 1 && (
            <a onClick={() => changePage(-1)}>«</a>
          )}
          Page {fetchParams.page}
          {(videoResults as Array<VideoResult>).length >=
            parseInt(fetchParams.limit) && (
            <a onClick={() => changePage(1)}>»</a>
          )}
        </div>
      </div>
      <LyricsPanel {...lyricsData} togglePanelCallback={toggleLyricsPanel} />
    </div>
  );
};
