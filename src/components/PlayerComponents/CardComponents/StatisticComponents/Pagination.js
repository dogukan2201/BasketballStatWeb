import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const PaginationButton = ({ onClick, disabled, children, isActive }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      px-2 py-1 md:px-4 md:py-2 
      text-sm md:text-base 
      rounded-lg
      transition-all duration-200 ease-in-out
      font-medium
      shadow-sm
      min-w-[36px] md:min-w-[44px]
      ${
        disabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70"
          : isActive
          ? "bg-blue-500 text-white shadow-blue-200 hover:bg-blue-600 transform hover:scale-105"
          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
      }
    `}
  >
    {children}
  </button>
);

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const delta = 1;
    const range = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    if (totalPages > 1) range.unshift(1);
    if (totalPages > 2) range.push(totalPages);

    return range;
  };

  return (
    <div className="flex justify-center items-center mt-8 space-x-1.5 md:space-x-3 flex-wrap gap-y-2 p-2 rounded-xl bg-gray-50/50">
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span className="flex items-center">
          <FaChevronLeft className="w-4 h-4 mr-1" />
          <span className="hidden md:inline">Previous</span>
        </span>
      </PaginationButton>

      {getPageNumbers().map((pageNum, index) =>
        pageNum === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
            •••
          </span>
        ) : (
          <PaginationButton
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            isActive={currentPage === pageNum}
          >
            {pageNum}
          </PaginationButton>
        )
      )}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="flex items-center">
          <span className="hidden md:inline">Next</span>
          <FaChevronRight className="w-4 h-4 ml-1" />
        </span>
      </PaginationButton>
    </div>
  );
};
