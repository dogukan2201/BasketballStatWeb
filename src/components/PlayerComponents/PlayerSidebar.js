import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaUserAlt, FaSlidersH, FaSearch } from "react-icons/fa";
import ClearFilterButton from "../ClearFilterButton";
import { getSeasons } from "../../services/api";
const FilterInput = ({ icon: Icon, label, ...inputProps }) => (
  <div>
    <label className="text-sm mb-2 flex items-center">
      <Icon className="mr-2" />
      {label}
    </label>
    <input
      {...inputProps}
      className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none"
    />
  </div>
);

const NumberInput = ({ ...props }) => (
  <FilterInput
    {...props}
    type="number"
    onChange={(e) => {
      if (e.target.value >= 0) {
        props.onChange(e);
      }
    }}
  />
);

const PlayerSidebar = ({ isOpen, filters, onFilterChange, onClearFilters }) => {
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        setLoading(true);
        const response = await getSeasons();
        if (response && Array.isArray(response.response)) {
          setSeasons(response.response);
        }
      } catch (error) {
        console.error("Sezonlar yüklenirken hata oluştu:", error);
        setError("Sezonlar yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchSeasons();
  }, []);

  return (
    <aside
      className={`bg-slate-800 text-white w-64 min-h-screen transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed z-20`}
    >
      <div className="p-4">
        <h2 className="text-2xl mb-6 mt-12 flex items-center">
          <FaSlidersH className="mr-2" />
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
              disabled={loading}
            >
              <option value="">Select Season</option>
              {seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <NumberInput
            icon={FaUserAlt}
            label="Team ID"
            name="team"
            value={filters.team || ""}
            onChange={onFilterChange}
            placeholder="Enter Team ID..."
          />

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
                placeholder="Enter Player Name..."
                className="w-full pl-10 pr-3 py-2 bg-slate-700 rounded-md focus:outline-none"
              />
            </div>
          </div>

          <NumberInput
            icon={FaUserAlt}
            label="Player ID"
            name="id"
            value={filters.id || ""}
            onChange={onFilterChange}
            placeholder="Enter Player ID..."
          />

          <ClearFilterButton onClearFilters={onClearFilters} />
        </div>
      </div>
    </aside>
  );
};

export default PlayerSidebar;
