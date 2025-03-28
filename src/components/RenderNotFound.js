import React from "react";
import { FaSearchMinus } from "react-icons/fa";
const RenderNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <div className="text-center">
        <FaSearchMinus className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No Results Found
        </h2>
        <p className="text-gray-500">Please try a different search term.</p>
      </div>
    </div>
  );
};

export default RenderNotFound;
