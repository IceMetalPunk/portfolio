import { useEffect, useState } from 'react';

type JsonResult =
  | Record<string, unknown>
  | Array<Record<string, unknown> | string | number>
  | null;

export const useFetchJson = (
  url: string,
  queryParams?: Record<string, string>,
  postBody?: Record<string, string>,
  baseURL: string = window.location.origin
): [JsonResult, boolean, unknown | null] => {
  const [json, setJson] = useState<JsonResult>(null);
  const [fetching, setFetching] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    setFetching(true);
    const controller: AbortController = new AbortController();
    const fullURL: URL = new URL(url, baseURL);
    if (queryParams) {
      const query: URLSearchParams = new URLSearchParams(queryParams);
      fullURL.search = query.toString();
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
      .then((decoded: JsonResult) => {
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
