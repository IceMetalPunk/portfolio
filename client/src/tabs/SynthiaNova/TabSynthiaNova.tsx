import { useState } from 'react';
import { useFetchJson } from '../../util/util';

export const TabSynthiaNova = () => {
  const [fetchParams, _setFetchParams] = useState<Record<string, string>>({
    limit: '10',
    page: '1',
  });
  const [videoResults, fetchingVideos, videoFetchError] = useFetchJson(
    '/api/getLatestVideos',
    fetchParams
  );
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

  return <pre>{JSON.stringify(videoResults, null, 2)}</pre>;
};
