import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaUserAlt,
  FaSlidersH,
  FaBasketballBall,
  FaSearch,
} from "react-icons/fa";
import ClearFilterButton from "../ClearFilterButton";
import { fetchLeagues, getTeams } from "../../services/api";
import { LeagueDropdown } from "../SidebarComponents/LeagueDropdown";
import { TeamDropdown } from "../SidebarComponents/TeamDropdown";
import {
  filterAndGroupLeagues,
  loadLeagues,
} from "../SidebarComponents/FilterGroupLeagues";

function PlayerSidebar({ isOpen, filters, onFilterChange, onClearFilters }) {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [isLeagueDropdownOpen, setIsLeagueDropdownOpen] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    leagueSearchTerm: "",
    countrySearchTerm: "",
  });
  const [teamSearchTerm, setTeamSearchTerm] = useState("");
  const [allLeagues, setAllLeagues] = useState([]);
  const [allTeams, setAllTeams] = useState([]);

  const filterAndGroupLeagues = (leaguesData) => {
    let filteredLeagues = [...leaguesData];

    if (searchTerms.countrySearchTerm) {
      filteredLeagues = filteredLeagues.filter((league) =>
        league.country?.name
          ?.toLowerCase()
          .includes(searchTerms.countrySearchTerm.toLowerCase())
      );
    }

    if (searchTerms.leagueSearchTerm) {
      filteredLeagues = filteredLeagues.filter((league) =>
        league.name
          .toLowerCase()
          .includes(searchTerms.leagueSearchTerm.toLowerCase())
      );
    }

    return filteredLeagues.reduce((acc, league) => {
      const country = league.country?.name || "Diğer";
      if (!acc[country]) {
        acc[country] = [];
      }
      acc[country].push(league);
      return acc;
    }, {});
  };

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
            setAllTeams(response);
            setTeams(response);
          }
        } catch (error) {
          setError("Takımlar yüklenirken bir hata oluştu: " + error.message);
          setAllTeams([]);
          setTeams([]);
        } finally {
          setLoading(false);
        }
      } else {
        setAllTeams([]);
        setTeams([]);
      }
    };
    fetchTeams();
  }, [filters.league, filters.season]);

  useEffect(() => {
    let filteredTeams = allTeams;
    if (teamSearchTerm) {
      filteredTeams = filteredTeams.filter((team) =>
        team.name.toLowerCase().includes(teamSearchTerm.toLowerCase())
      );
    }
    setTeams(filteredTeams);
  }, [teamSearchTerm, allTeams]);

  useEffect(() => {
    const savedFilters = localStorage.getItem("PlayerFilters");
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      onFilterChange({
        target: { name: "season", value: parsedFilters.season || "" },
      });
      onFilterChange({
        target: { name: "league", value: parsedFilters.league || "" },
      });
      onFilterChange({
        target: { name: "team", value: parsedFilters.team || "" },
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("PlayerFilters", JSON.stringify(filters));
  }, [filters]);

  const handleClearFilters = () => {
    localStorage.removeItem("PlayerFilters");
    onClearFilters();
  };

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!isOpen) return null;

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
          {/* League Selection */}
          <div className="relative">
            <label className="text-sm mb-2 flex items-center">
              <FaBasketballBall className="mr-2" />
              League
            </label>
            <button
              onClick={() => setIsLeagueDropdownOpen(!isLeagueDropdownOpen)}
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none flex justify-between items-center"
              disabled={loading}
            >
              <span>
                {filters.league
                  ? allLeagues.find((l) => l.id === filters.league)?.name
                  : "Select League"}
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

          {/* Season Selection */}
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

          {/* Team Selection */}
          <div className="relative">
            <label className="text-sm mb-2 flex items-center">
              <FaUserAlt className="mr-2" />
              Team
            </label>
            <button
              onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none flex justify-between items-center"
              disabled={!filters.league || !filters.season || loading}
            >
              <span>
                {filters.team
                  ? allTeams.find((t) => t.id === filters.team)?.name
                  : "Select Team"}
              </span>
              <span className="transform transition-transform duration-200">
                ▼
              </span>
            </button>

            <TeamDropdown
              isOpen={isTeamDropdownOpen}
              onClose={() => setIsTeamDropdownOpen(false)}
              filters={filters}
              onFilterChange={onFilterChange}
              teams={teams}
              teamSearchTerm={teamSearchTerm}
              setTeamSearchTerm={setTeamSearchTerm}
            />
          </div>

          {/* Player Search */}
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

          <ClearFilterButton onClearFilters={handleClearFilters} />
        </div>
      </div>
    </aside>
  );
}

export default PlayerSidebar;
