type Props = {
  totalPages: number;
  currentPage: number;
};

function Pagination({ totalPages, currentPage }: Props) {
  return (
    <div className="flex gap-3">
      <button>Previous</button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button>Next</button>
    </div>
  );
}

export default Pagination;
