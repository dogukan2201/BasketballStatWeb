import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

function SearchTeam({ value, onChange, onClear, placeholder }) {
  return (
    <div className={"relative w-full md:w-64"}>
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="border rounded pl-10 pr-4 py-2 w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
}

export default SearchTeam;
