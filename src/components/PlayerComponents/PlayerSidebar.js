import React from "react";
import { FaCalendarAlt, FaUserAlt, FaSlidersH, FaSearch } from "react-icons/fa";
import ClearFilterButton from "../ClearFilterButton";
const PlayerSidebar = ({ isOpen, filters, onFilterChange, onClearFilters }) => {
  return (
    <aside
      className={`bg-slate-800 text-white w-64 min-h-screen transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed z-20`}
    >
      <div className="p-4">
        <h2 className="text-2xl  mb-6 mt-12 flex items-center">
          <FaSlidersH className="mr-2 " />
          Player Filters
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm mb-2 flex items-center">
              <FaCalendarAlt className="mr-2" />
              Season
            </label>
            <select
              name="season"
              value={filters.season || ""}
              onChange={onFilterChange}
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none"
            >
              <option value="">Select Season</option>
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
              Team ID
            </label>
            <input
              type="number"
              name="team"
              value={filters.team || ""}
              onChange={(e) => {
                if (e.target.value >= 0) {
                  onFilterChange(e);
                }
              }}
              placeholder="Takım ID..."
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none "
            />
          </div>

          <div>
            <label className="text-sm mb-2 flex items-center">
              <FaUserAlt className="mr-2" />
              Search Player
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
                placeholder="Player Name..."
                className="w-full pl-10 pr-3 py-2 bg-slate-700 rounded-md focus:outline-none "
              />
            </div>
            <div>
              <label className="text-sm mb-2 flex items-center">
                <FaUserAlt className="mr-2" />
                Player ID
              </label>
              <input
                type="number"
                name="id"
                value={filters.id || ""}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    onFilterChange(e);
                  }
                }}
                placeholder="Player ID..."
                className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none "
              />
            </div>
          </div>
          <ClearFilterButton onClearFilters={onClearFilters} />
        </div>
      </div>
    </aside>
  );
};

export default PlayerSidebar;
