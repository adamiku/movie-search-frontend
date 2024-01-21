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
    <div className="inline-flex justify-center items-center gap-5 p-5">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        onClick={() => handlePagination(Direction.PREVIOUS)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span>{`${currentPage} / ${totalPages}`}</span>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        onClick={() => handlePagination(Direction.NEXT)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
