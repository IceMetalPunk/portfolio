import { useEffect, useState } from 'react';

export const useFetchJson = (
  url: string,
  queryParams?: Record<string, string>,
  postBody?: Record<string, string>
): [Record<string, unknown> | null, boolean, unknown | null] => {
  const [json, setJson] = useState<Record<string, unknown> | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    setFetching(true);
    const controller: AbortController = new AbortController();
    let fullURL = url;
    if (queryParams) {
      const query: URLSearchParams = new URLSearchParams(queryParams);
      fullURL = url + '?' + query.toString();
    }

    let fetchOptions: RequestInit = {
      signal: controller.signal,
    };
    if (postBody) {
      fetchOptions = {
        signal: controller.signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postBody),
      };
    }
    fetch(fullURL, fetchOptions)
      .then((res: Response) => res.json())
      .then((decoded: Record<string, unknown>) => {
        setJson(decoded);
        setError(null);
      })
      .catch((er: unknown) => {
        setError(er);
        setJson(null);
      })
      .finally(() => setFetching(false));
    return () => controller.abort();
  }, [url, queryParams, postBody]);

  return [json, fetching, error];
};
