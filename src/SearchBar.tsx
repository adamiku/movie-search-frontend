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
      setError('Please provide a search query that at least 3 characters long');
      return;
    }
    searchParams.set('query', queryValue.value);
    searchParams.set('page', String(1));
    setSearchParams(searchParams);
  };

  return (
    <form
      className="flex justify-center items-end gap-10 bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-sm mx-auto"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col">
        <label
          htmlFor="search"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Search for movies:
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="query"
          id="search"
        />
        {error && <p>{error}</p>}
      </div>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1.5 px-4 border border-blue-500 hover:border-transparent rounded">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
