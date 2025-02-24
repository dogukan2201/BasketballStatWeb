import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

function SearchTeam({ value, onChange, onClear }) {
  return (
    <div className="flex justify-start mb-6">
      <div className="relative w-full md:w-80">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-800" />
        <input
          type="text"
          placeholder="Takım veya Ülke Ara..."
          className="w-full px-12 py-3 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:border-slate-800 focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-200 text-gray-700 placeholder-gray-400"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition duration-200"
            aria-label="Aramayı Temizle"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchTeam;
