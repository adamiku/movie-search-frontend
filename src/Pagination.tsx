import { Dispatch, SetStateAction } from 'react';

enum Direction {
  NEXT = 'next',
  PREVIOUS = 'previous'
}

type Props = {
  totalPages: number;
  currentPage: number;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
  searchParams: URLSearchParams;
};

function Pagination({
  totalPages,
  currentPage,
  searchParams,
  setSearchParams
}: Props) {
  const handlePagination = (direction: Direction) => {
    const isNextPage = direction === Direction.NEXT;
    searchParams.set(
      'page',
      isNextPage ? String(currentPage + 1) : String(currentPage - 1)
    );
    setSearchParams(searchParams);
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={() => handlePagination(Direction.PREVIOUS)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => handlePagination(Direction.NEXT)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
