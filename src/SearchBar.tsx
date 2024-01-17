import { FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function SearchBar() {
  const [error, setError] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { query: queryValue } = event.target as typeof event.target & {
      query: { value: string };
    };
    if (queryValue?.value?.length < 3 || !queryValue?.value) {
      setError('Please provide a search query that at least 2 characters long');
      return;
    }
    searchParams.set('query', queryValue.value);
    setSearchParams(searchParams);
  };

  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <div className="flex flex-col">
        <label>Search for movies:</label>
        <input type="text" className="border border-solid" name="query" />
        {error && <p>{error}</p>}
      </div>
      <button>Search</button>
    </form>
  );
}

export default SearchBar;
