import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaUserAlt,
  FaSlidersH,
  FaBasketballBall,
  FaSearch,
  FaFlag,
} from "react-icons/fa";
import ClearFilterButton from "../ClearFilterButton";
import { fetchLeagues, getTeams, getSeasons } from "../../services/api";

function PlayerSidebar({ isOpen, filters, onFilterChange, onClearFilters }) {
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLeagueDropdownOpen, setIsLeagueDropdownOpen] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [leagueSearchTerm, setLeagueSearchTerm] = useState("");
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [teamSearchTerm, setTeamSearchTerm] = useState("");
  const [allLeagues, setAllLeagues] = useState([]);
  const [allTeams, setAllTeams] = useState([]);

  useEffect(() => {
    const getLeagues = async () => {
      try {
        setLoading(true);
        const { response } = await fetchLeagues();
        if (Array.isArray(response)) {
          setAllLeagues(response);
          setLeagues(response);
        }
      } catch (error) {
        setError("An error occurred while loading leagues.");
      } finally {
        setLoading(false);
      }
    };

    getLeagues();
  }, []);

  useEffect(() => {
    let filteredLeagues = allLeagues;

    if (countrySearchTerm) {
      filteredLeagues = filteredLeagues.filter((league) =>
        league.country?.name
          ?.toLowerCase()
          .includes(countrySearchTerm.toLowerCase())
      );
    }

    if (leagueSearchTerm) {
      filteredLeagues = filteredLeagues.filter((league) =>
        league.name.toLowerCase().includes(leagueSearchTerm.toLowerCase())
      );
    }

    setLeagues(filteredLeagues);
  }, [leagueSearchTerm, countrySearchTerm, allLeagues]);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        setLoading(true);
        const response = await getSeasons();
        if (response && Array.isArray(response.response)) {
          setSeasons(response.response);
        }
      } catch (error) {
        setError("An error occurred while loading seasons.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeasons();
  }, []);

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
          setError("An error occurred while loading teams.");
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

  const groupedLeagues = leagues.reduce((acc, league) => {
    const country = league.country?.name || "Other";
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(league);
    return acc;
  }, {});

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

            {isLeagueDropdownOpen && (
              <div className="absolute w-full mt-1 bg-slate-700 rounded-md shadow-lg max-h-96 overflow-y-auto z-30">
                <div className="p-2 sticky top-0 bg-slate-700 border-b border-slate-600 space-y-2">
                  <div className="relative">
                    <FaFlag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={countrySearchTerm}
                      onChange={(e) => setCountrySearchTerm(e.target.value)}
                      placeholder="Search Country..."
                      className="w-full pl-10 pr-3 py-2 bg-slate-600 rounded-md focus:outline-none"
                    />
                  </div>
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={leagueSearchTerm}
                      onChange={(e) => setLeagueSearchTerm(e.target.value)}
                      placeholder="Search League..."
                      className="w-full pl-10 pr-3 py-2 bg-slate-600 rounded-md focus:outline-none"
                    />
                  </div>
                </div>

                {Object.entries(groupedLeagues).map(([country, leagueList]) => (
                  <div
                    key={country}
                    className="border-b border-slate-600 last:border-0"
                  >
                    <div className="px-3 py-2 bg-slate-800 font-semibold">
                      {country}
                    </div>
                    {leagueList.map((league) => (
                      <button
                        key={league.id}
                        onClick={() => {
                          onFilterChange({
                            target: { name: "league", value: league.id },
                          });
                          setIsLeagueDropdownOpen(false);
                          setLeagueSearchTerm("");
                          setCountrySearchTerm("");
                        }}
                        className={`w-full px-3 py-2 text-left hover:bg-slate-600 flex items-center ${
                          filters.league === league.id ? "bg-slate-600" : ""
                        }`}
                      >
                        <span>{league.name}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
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

            {isTeamDropdownOpen && (
              <div className="absolute w-full mt-1 bg-slate-700 rounded-md shadow-lg max-h-96 overflow-y-auto z-30">
                <div className="p-2 sticky top-0 bg-slate-700 border-b border-slate-600">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={teamSearchTerm}
                      onChange={(e) => setTeamSearchTerm(e.target.value)}
                      placeholder="Search Team..."
                      className="w-full pl-10 pr-3 py-2 bg-slate-600 rounded-md focus:outline-none"
                    />
                  </div>
                </div>

                {teams.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => {
                      onFilterChange({
                        target: { name: "team", value: team.id },
                      });
                      setIsTeamDropdownOpen(false);
                      setTeamSearchTerm("");
                    }}
                    className={`w-full px-3 py-2 text-left hover:bg-slate-600 flex items-center ${
                      filters.team === team.id ? "bg-slate-600" : ""
                    }`}
                  >
                    <span>{team.name}</span>
                  </button>
                ))}
              </div>
            )}
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

          <ClearFilterButton onClearFilters={onClearFilters} />
        </div>
      </div>
    </aside>
  );
}

export default PlayerSidebar;
