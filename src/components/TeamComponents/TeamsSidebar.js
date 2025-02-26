import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaBasketballBall,
  FaSlidersH,
  FaSearch,
} from "react-icons/fa";
import { fetchLeagues } from "../../services/api";
import ClearFilterButton from "../ClearFilterButton";
import { LeagueDropdown } from "../SidebarComponents/LeagueDropdown";
import {
  filterAndGroupLeagues,
  loadLeagues,
} from "../SidebarComponents/FilterGroupLeagues";

const TeamsSidebar = ({ isOpen, filters, onFilterChange, onClearFilters }) => {
  const [leagues, setLeagues] = useState(localStorage.getItem("leagues"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allLeagues, setAllLeagues] = useState([]);
  const [isLeagueDropdownOpen, setIsLeagueDropdownOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    leagueSearchTerm: "",
    countrySearchTerm: "",
  });

  useEffect(() => {
    const getLeagues = async () => {
      await loadLeagues(
        fetchLeagues,
        setLoading,
        setError,
        setAllLeagues,
        setLeagues,
        searchTerms
      );
    };
    getLeagues();
  }, []);

  useEffect(() => {
    if (allLeagues.length > 0) {
      const filteredAndGroupedLeagues = filterAndGroupLeagues(
        allLeagues,
        searchTerms
      );
      setLeagues(filteredAndGroupedLeagues);
    }
  }, [searchTerms, allLeagues]);

  useEffect(() => {
    const savedFilters = localStorage.getItem("TeamFilters");
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      onFilterChange({
        target: { name: "season", value: parsedFilters.season || "" },
      });
      onFilterChange({
        target: { name: "league", value: parsedFilters.league || "" },
      });
      onFilterChange({
        target: { name: "search", value: parsedFilters.search || "" },
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("TeamFilters", JSON.stringify(filters));
  }, [filters]);

  const handleClearFilters = () => {
    localStorage.removeItem("TeamFilters");
    onClearFilters();
  };

  return (
    <aside
      className={`bg-slate-800 text-white w-64 min-h-screen transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed z-20`}
    >
      <div className="p-4">
        <h2 className="text-2xl mb-6 mt-12 flex items-center">
          <FaSlidersH className="mr-2" />
          Team Filters
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
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <div className="relative">
            <label className="text-sm mb-2 flex items-center">
              <FaBasketballBall className="mr-2" />
              Country/League
            </label>

            <div className="relative">
              <button
                onClick={() => setIsLeagueDropdownOpen(!isLeagueDropdownOpen)}
                className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none flex justify-between items-center"
                disabled={loading}
              >
                <span>
                  {filters.league
                    ? allLeagues.find((l) => l.id === filters.league)?.name
                    : "Select Country/League"}
                </span>
                <span className="transform transition-transform duration-200">
                  ▼
                </span>
              </button>

              <LeagueDropdown
                isOpen={isLeagueDropdownOpen}
                onClose={() => setIsLeagueDropdownOpen(false)}
                filters={filters}
                onFilterChange={onFilterChange}
                leagues={leagues}
                loading={loading}
                searchTerms={searchTerms}
                setSearchTerms={setSearchTerms}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label className="text-sm mb-2 flex items-center">
              Search Team
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
                placeholder="Team Name..."
                className="w-full pl-10 pr-3 py-2 bg-slate-700 rounded-md focus:outline-none"
              />
            </div>
          </div>
          <ClearFilterButton onClearFilters={handleClearFilters} />
        </div>
      </div>
    </aside>
  );
};

export default TeamsSidebar;
