import { useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import useFetch from './hooks/useFetch';
import { FetchState, MovieResponse } from './models';

const API_URL = 'http://localhost:3000/movies';

function App() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') ?? '';
  const currentPage = Number(searchParams.get('page')) || 1;

  // TODO make useFetch more generic with the queryparams
  const { data, error, status } = useFetch<MovieResponse>({
    url: API_URL,
    query: initialQuery,
    page: currentPage
  });

  return (
    <main>
      <SearchBar />
      {status === FetchState.PENDING && <div>Fetching data...</div>}
      {status === FetchState.ERROR && (
        <div>Something went wrong {error?.message}</div>
      )}
      {status === FetchState.SUCCESS && data && (
        <>
          <SearchResult movies={data.results} />
          <Pagination totalPages={data.total_pages} currentPage={currentPage} />
        </>
      )}
    </main>
  );
}

export default App;
