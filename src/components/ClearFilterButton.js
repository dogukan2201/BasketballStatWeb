import React from "react";
import { FaTrash } from "react-icons/fa";

const ClearFilterButton = ({ onClearFilters }) => (
  <button
    onClick={onClearFilters}
    className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors flex items-center justify-center"
  >
    <FaTrash className="mr-2" />
    Clear Filters
  </button>
);

export default ClearFilterButton;
