import { Movie } from './models';

type Props = {
  movies: Movie[];
};

function SearchResult({ movies }: Props) {
  return (
    <div>
      <p>SearchResult</p>
      <article className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {movies?.map((movie) => (
          <div key={movie.id}>
            {movie.poster_path && (
              <div
                className={`h-60 bg-no-repeat`}
                style={{
                  backgroundImage:
                    'url(' +
                    `https://image.tmdb.org/t/p/w154${movie.poster_path}` +
                    ')'
                }}
              ></div>
            )}
            {!movie.poster_path && (
              <div className="h-60 flex items-center">N/A poster</div>
            )}
            <div>{movie.title}</div>
          </div>
        ))}
      </article>
    </div>
  );
}

export default SearchResult;
