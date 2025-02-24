import React from "react";
import {
  FaCalendarAlt,
  FaUserAlt,
  FaTrash,
  FaSlidersH,
  FaSearch,
} from "react-icons/fa";

const PlayerSidebar = ({ isOpen, filters, onFilterChange, onClearFilters }) => {
  return (
    <aside
      className={`bg-slate-800 text-white w-64 min-h-screen transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed z-20`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FaSlidersH className="mr-2" />
          Oyuncu Filtreleri
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm mb-2 flex items-center">
              <FaCalendarAlt className="mr-2" />
              Sezon
            </label>
            <select
              name="season"
              value={filters.season || ""}
              onChange={onFilterChange}
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sezon Seçin</option>
              {[...Array(10)].map((_, i) => {
                const year = 2024 - i;
                const season = `${year - 1}-${year}`;
                return (
                  <option key={season} value={season}>
                    {season}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="text-sm mb-2 flex items-center">
              <FaUserAlt className="mr-2" />
              Takım ID
            </label>
            <input
              type="number"
              name="team"
              value={filters.team || ""}
              onChange={onFilterChange}
              placeholder="Takım ID..."
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm mb-2 flex items-center">
              <FaUserAlt className="mr-2" />
              Oyuncu Ara
            </label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={filters.search || ""}
                onChange={(e) =>
                  onFilterChange({
                    target: { name: "search", value: e.target.value },
                  })
                }
                placeholder="Oyuncu adı..."
                className="w-full pl-10 pr-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={onClearFilters}
            className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors flex items-center justify-center"
          >
            <FaTrash className="mr-2" />
            Filtreleri Temizle
          </button>
        </div>
      </div>
    </aside>
  );
};

export default PlayerSidebar;
