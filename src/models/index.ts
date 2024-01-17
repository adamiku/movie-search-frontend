export type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
  cached: boolean;
};

export enum FetchState {
  IDLE = 'idle',
  PENDING = 'pending',
  ERROR = 'error',
  SUCCESS = 'success'
}
