import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App';
import useFetch from '../shared/hooks/useFetch';
import { FetchState } from '../shared/models';

jest.mock('../constants', () => ({
  VITE_API_URL: 'http://localhost:3000'
}));

jest.mock('../shared/hooks/useFetch', () => ({
  default: jest
    .fn()
    .mockReturnValue({ data: [], error: undefined, status: undefined })
}));

jest.mock('react-router-dom', () => ({
  useSearchParams: jest
    .fn()
    .mockReturnValue([
      new URLSearchParams(),
      (param: URLSearchParams) => new URLSearchParams(param)
    ])
}));

jest.mock('../shared/ui/Pagination', () => ({
  default: () => <div data-testid="pagination-component">Mock Pagination</div>
}));

jest.mock('../shared/ui/Skeleton', () => ({
  default: () => <div data-testid="skeleton-component">Mock Skeleton</div>
}));

test('Renders the main page', () => {
  render(<App />);
  expect(true).toBeTruthy();
});

test('renders loading message in PENDING state', () => {
  (useFetch as jest.Mock).mockReturnValue({ status: FetchState.PENDING });

  const { getAllByTestId } = render(<App />);
  expect(getAllByTestId('skeleton-component')).toHaveLength(6);
});

test('renders error message in ERROR state', () => {
  (useFetch as jest.Mock).mockReturnValue({
    status: FetchState.ERROR,
    error: { message: 'Test error' }
  });

  const { getByText } = render(<App />);
  expect(getByText('Something went wrong Test error')).toBeInTheDocument();
});

test('renders data in SUCCESS state', () => {
  const testData = {
    status: FetchState.SUCCESS,
    data: { cached: false, results: [], total_pages: 1 }
  };
  (useFetch as jest.Mock).mockReturnValue(testData);

  const { getByText } = render(<App />);
  expect(getByText('Data was served from Movie DB')).toBeInTheDocument();
});

test('renders Pagination component when total_pages > 1', () => {
  const testData = {
    status: FetchState.SUCCESS,
    data: { total_pages: 2, results: [] }
  };
  (useFetch as jest.Mock).mockReturnValue(testData);

  const { getByTestId } = render(<App />);
  expect(getByTestId('pagination-component')).toBeInTheDocument();
});
