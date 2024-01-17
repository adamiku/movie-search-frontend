import './App.css';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

function App() {
  return (
    <main>
      <SearchBar />
      <SearchResult movies={[]} />
      <Pagination totalPages={0} currentPage={0} />
    </main>
  );
}

export default App;
