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

function GamesSidebar({ isOpen, filters, onFilterChange, onClearFilters }) {
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLeagueDropdownOpen, setIsLeagueDropdownOpen] = useState(false);

  const seasons = [
    "2023-2024",
    "2022-2023",
    "2021-2022",
    "2020-2021",
    "2019-2020",
  ];

  useEffect(() => {
    const getLeagues = async () => {
      try {
        setLoading(true);
        const { response } = await fetchLeagues();
        if (Array.isArray(response)) {
          setLeagues(response);
        }
      } catch (error) {
        setError("Ligler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    getLeagues();
  }, []);

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
          setError("Takımlar yüklenirken bir hata oluştu.");
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
          Maç Filtreleri
        </h2>

        <div className="space-y-4">
          {/* Tarih Seçimi */}
          <div>
            <label className="text-sm mb-2 flex items-center">
              <FaCalendar className="mr-2" />
              Tarih
            </label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={onFilterChange}
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Lig Seçimi */}
          <div className="relative">
            <label className="text-sm mb-2 flex items-center">
              <FaBasketballBall className="mr-2" />
              Lig
            </label>
            <button
              onClick={() => setIsLeagueDropdownOpen(!isLeagueDropdownOpen)}
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none flex justify-between items-center"
              disabled={loading}
            >
              <span>
                {filters.league
                  ? leagues.find((l) => l.id === filters.league)?.name
                  : "Lig Seçin"}
              </span>
              <span className="transform transition-transform duration-200">
                ▼
              </span>
            </button>

            {isLeagueDropdownOpen && (
              <div className="absolute w-full mt-1 bg-slate-700 rounded-md shadow-lg max-h-96 overflow-y-auto z-30">
                {leagues.map((league) => (
                  <button
                    key={league.id}
                    onClick={() => {
                      onFilterChange({
                        target: { name: "league", value: league.id },
                      });
                      setIsLeagueDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left hover:bg-slate-600 flex items-center ${
                      filters.league === league.id ? "bg-slate-600" : ""
                    }`}
                  >
                    <span>{league.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sezon Seçimi */}
          <div>
            <label className="text-sm mb-2 flex items-center">
              <FaCalendarAlt className="mr-2" />
              Sezon
            </label>
            <select
              name="season"
              value={filters.season}
              onChange={onFilterChange}
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sezon Seçin</option>
              {seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </div>

          {/* Takım Seçimi */}
          <div>
            <label className="text-sm mb-2 flex items-center">
              <FaUsers className="mr-2" />
              Takım
            </label>
            <select
              name="team"
              value={filters.team}
              onChange={onFilterChange}
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!filters.league || !filters.season}
            >
              <option value="">Takım Seçin</option>
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
