import { Movie } from './models';

type Props = {
  movies: Movie[];
};

function SearchResult({ movies }: Props) {
  return (
    <div>
      <p>SearchResult</p>
      {movies?.map((movie) => <div>{movie.description}</div>)}
    </div>
  );
}

export default SearchResult;
