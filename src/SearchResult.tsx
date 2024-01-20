import { Movie } from './models';

type Props = {
  movies: Movie[];
};

function SearchResult({ movies }: Props) {
  return (
    <div>
      <p className="text-gray-700 text-sm font-bold mb-5">SearchResult:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {movies.map((movie) => {
          return (
            <div
              className="max-w-sm w-full lg:max-w-full lg:flex"
              key={movie.id}
            >
              {movie.poster_path && (
                <div
                  className={`h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden`}
                  style={{
                    backgroundImage:
                      'url(' +
                      `https://image.tmdb.org/t/p/w154${movie.poster_path}` +
                      ')'
                  }}
                ></div>
              )}
              {!movie.poster_path && (
                <div className="h-20 flex items-center justify-center">
                  N/A poster
                </div>
              )}
              <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div>
                  <div className="text-gray-900 font-bold text-xl mb-2">
                    {movie.title}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm">
                    <p className="text-gray-900 leading-none">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchResult;
