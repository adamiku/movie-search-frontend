import { useEffect, useState } from 'react';
import { FetchState } from '../models';

type Props = {
  url: string;
  page?: number;
  query?: string;
};

type Error = {
  message: string;
};

function useFetch<T>({ url, page, query }: Props) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [status, setStatus] = useState<FetchState>(FetchState.IDLE);

  const searchparams = new URLSearchParams({
    ...(query && { query }),
    ...(page && { page: page.toString() })
  });

  useEffect(() => {
    const abortController = new AbortController();
    if (!query) return;
    const fetchData = async () => {
      try {
        setStatus(FetchState.PENDING);
        const response = await fetch(`${url}?${searchparams.toString()}`, {
          signal: abortController.signal,
          headers: {
            // "content-type": "application/json",
          }
        });
        if (!response.ok) {
          setStatus(FetchState.ERROR);
          // handle 400,401,..500
          setError({ message: `${response.status} ${response.statusText}` });
          // throw new Error(`${response.status} ${response.statusText}`)
        }
        const responseBody = await response.json();

        setData(responseBody as T);
        setStatus(FetchState.SUCCESS);
      } catch (error) {
        if (error instanceof TypeError) {
          // handle network error
          setStatus(FetchState.ERROR);
        }
        if (error instanceof SyntaxError) {
          // handle parsing error
          setStatus(FetchState.ERROR);
        }
        if (error instanceof DOMException) {
          // handle abort error
        }
        setError({ message: 'custom error' });
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, page, query]);

  return {
    data,
    error,
    status
  };
}

export default useFetch;
