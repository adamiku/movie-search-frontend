import { useSearchParams } from 'react-router-dom';
import { VITE_API_URL } from './constants';
import SearchBar from './features/search/SearchBar';
import SearchResult from './features/search/SearchResult';
import useFetch from './shared/hooks/useFetch';
import { FetchState, MovieResponse } from './shared/models';
import Pagination from './shared/ui/Pagination';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') ?? '';
  const currentPage = Number(searchParams.get('page')) || 1;

  // TODO make useFetch more generic with the queryparams
  const { data, error, status } = useFetch<MovieResponse>({
    url: `${VITE_API_URL}/movies`,
    query: initialQuery,
    page: currentPage
  });

  return (
    <main className="h-screen w-screen max-w-7xl m-auto p-5 flex flex-col gap-5">
      <SearchBar />
      {status === FetchState.PENDING && <div>Fetching data...</div>}
      {status === FetchState.ERROR && (
        <div>Something went wrong {error?.message}</div>
      )}
      {status === FetchState.SUCCESS && data && (
        <>
          <div
            className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
            </svg>
            <p>
              {' '}
              {data.cached
                ? 'Data was served from cache'
                : 'Data was served from Movie DB'}
            </p>
          </div>
          <SearchResult movies={data.results} query={initialQuery} />
          {data.total_pages > 1 && (
            <Pagination
              totalPages={data.total_pages}
              currentPage={currentPage}
              setSearchParams={setSearchParams}
              searchParams={searchParams}
            />
          )}
        </>
      )}
    </main>
  );
}

export default App;
