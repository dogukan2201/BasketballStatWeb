import React from "react";

const Pagination = ({
  totalItems,
  entriesPerPage,
  currentPage,
  onPageChange,
}) => (
  <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
    <div className="text-xs md:text-sm text-gray-700 text-center md:text-left">
      Gösterilen: 1 - {entriesPerPage} / Toplam: {totalItems}
    </div>
    <div className="flex gap-1">
      <button
        className="px-2 py-1 text-sm border rounded hover:bg-gray-100 transition-colors duration-200"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Önceki
      </button>
      <button className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200">
        {currentPage}
      </button>
      <button
        className="px-2 py-1 text-sm border rounded hover:bg-gray-100 transition-colors duration-200"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage * entriesPerPage >= totalItems}
      >
        Sonraki
      </button>
    </div>
  </div>
);

export default Pagination;
