import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaBasketballBall,
  FaSlidersH,
  FaSearch,
  FaFlag,
} from "react-icons/fa";
import { fetchLeagues } from "../../services/api";
import ClearFilterButton from "../ClearFilterButton";

const TeamsSidebar = ({ isOpen, filters, onFilterChange, onClearFilters }) => {
  const [leagues, setLeagues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [isLeagueDropdownOpen, setIsLeagueDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allLeagues, setAllLeagues] = useState([]);

  useEffect(() => {
    const getLeagues = async () => {
      try {
        setLoading(true);
        const data = await fetchLeagues();
        if (data && Array.isArray(data.response)) {
          setAllLeagues(data.response);
          setLeagues(data.response);
        } else {
          throw new Error("Geçersiz API yanıtı");
        }
      } catch (error) {
        setError("Ligler yüklenirken bir hata oluştu: " + error.message);
        setAllLeagues([]);
        setLeagues([]);
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

    if (searchTerm) {
      filteredLeagues = filteredLeagues.filter((league) =>
        league.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setLeagues(filteredLeagues);
  }, [searchTerm, countrySearchTerm, allLeagues]);

  useEffect(() => {
    const savedFilters = localStorage.getItem("filters");
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      onFilterChange({
        target: { name: "season", value: parsedFilters.season || "" },
      });
      onFilterChange({
        target: { name: "league", value: parsedFilters.league || "" },
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  const groupedLeagues = leagues.reduce((acc, league) => {
    const country = league.country?.name || "Diğer";
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(league);
    return acc;
  }, {});

  const handleClearFilters = () => {
    localStorage.removeItem("filters");
    onClearFilters();
  };

  return (
    <aside
      className={`bg-slate-800 text-white w-64 min-h-screen transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed z-20`}
    >
      <div className="p-4">
        <h2 className="text-2xl  mb-6 mt-12 flex items-center">
          <FaSlidersH className="mr-2 " />
          Team Filters
        </h2>

        <div className="space-y-4">
          <div>
            <label className=" text-sm mb-2 flex items-center">
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
                className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none  flex justify-between items-center"
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search League..."
                        className="w-full pl-10 pr-3 py-2 bg-slate-600 rounded-md focus:outline-none"
                      />
                    </div>
                  </div>

                  {Object.entries(groupedLeagues).map(
                    ([country, leagueList]) => (
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
                              setSearchTerm("");
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
                    )
                  )}
                </div>
              )}
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
