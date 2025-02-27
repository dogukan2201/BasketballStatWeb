import React, { useState, useEffect } from "react";
import { fetchLeagues, getTeams } from "../../services/api";
import {
  FaCalendarAlt,
  FaBasketballBall,
  FaSlidersH,
  FaUsers,
  FaCalendar,
} from "react-icons/fa";
import ClearFilterButton from "../ClearFilterButton";
import { LeagueDropdown } from "../SidebarComponents/LeagueDropdown";
import {
  filterAndGroupLeagues,
  loadLeagues,
} from "../SidebarComponents/FilterGroupLeagues";

function GamesSidebar({ isOpen, filters, onFilterChange, onClearFilters }) {
  const [leagues, setLeagues] = useState(localStorage.getItem("leagues"));
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allLeagues, setAllLeagues] = useState([]);
  const [isLeagueDropdownOpen, setIsLeagueDropdownOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    leagueSearchTerm: "",
    countrySearchTerm: "",
  });

  const seasons = [
    "2023-2024",
    "2022-2023",
    "2021-2022",
    "2020-2021",
    "2019-2020",
  ];

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
    const fetchTeams = async () => {
      if (filters.league && filters.season) {
        try {
          setLoading(true);
          const { response } = await getTeams(filters.league, filters.season);
          if (Array.isArray(response)) {
            setTeams(response);
          }
        } catch (error) {
          setError("An error occurred while loading teams.");
        } finally {
          setLoading(false);
        }
      } else {
        setTeams([]);
      }
    };

    fetchTeams();
  }, [filters.league, filters.season]);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!isOpen) {
    return null;
  }

  return (
    <aside
      className={`bg-slate-800 text-white w-64 min-h-screen transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed z-20`}
    >
      <div className="p-4">
        <h2 className="text-2xl mb-6 mt-12 flex items-center">
          <FaSlidersH className="mr-2" />
          Match Filters
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm mb-2 flex items-center">
              <FaCalendar className="mr-2" />
              Date
            </label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={onFilterChange}
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label className="text-sm mb-2 flex items-center">
              <FaBasketballBall className="mr-2" />
              Country/League
            </label>
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

          <div>
            <label className="text-sm mb-2 flex items-center">
              <FaCalendarAlt className="mr-2" />
              Season
            </label>
            <select
              name="season"
              value={filters.season}
              onChange={onFilterChange}
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Season</option>
              {seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm mb-2 flex items-center">
              <FaUsers className="mr-2" />
              Team
            </label>
            <select
              name="team"
              value={filters.team}
              onChange={onFilterChange}
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!filters.league || !filters.season}
            >
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <ClearFilterButton onClearFilters={onClearFilters} />
        </div>
      </div>
    </aside>
  );
}

export default GamesSidebar;
