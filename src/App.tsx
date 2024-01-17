import './App.css';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

function App() {
  return (
    <main>
      <SearchBar />
      <SearchResult movies={[]} />
    </main>
  );
}

export default App;
