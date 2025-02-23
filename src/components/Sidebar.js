import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaBasketballBall,
  FaTrash,
  FaSlidersH,
  FaSearch,
} from "react-icons/fa";
import { fetchLeagues } from "../services/api";

const Sidebar = ({ isOpen, filters, onFilterChange, onClearFilters }) => {
  const [leagues, setLeagues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLeagueDropdownOpen, setIsLeagueDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allLeagues, setAllLeagues] = useState([]);

  useEffect(() => {
    const getLeagues = async () => {
      try {
        setLoading(true);
        const data = await fetchLeagues();
        // İlk 10 ligi göster
        setLeagues(data.response?.slice(0, 10) || []);
        // Tüm ligleri sakla
        setAllLeagues(data.response || []);
      } catch (error) {
        setError("Ligler yüklenirken bir hata oluştu");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getLeagues();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const searchResults = allLeagues.filter((league) =>
        league.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setLeagues(searchResults);
    } else {
      setLeagues(allLeagues.slice(0, 10));
    }
  }, [searchTerm, allLeagues]);

  // Ligleri ülkelere göre grupla
  const groupedLeagues = leagues.reduce((acc, league) => {
    const country = league.country?.name || "Diğer";
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(league);
    return acc;
  }, {});

  return (
    <aside
      className={`bg-slate-800 text-white w-64 min-h-screen transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed z-20`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FaSlidersH className="mr-2" />
          Filtreler
        </h2>

        <div className="space-y-4">
          <div>
            <label className=" text-sm mb-2 flex items-center">
              <FaCalendarAlt className="mr-2" />
              Sezon
            </label>
            <select
              name="season"
              value={filters.season}
              onChange={onFilterChange}
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
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
              Lig
            </label>

            <div className="relative">
              <button
                onClick={() => setIsLeagueDropdownOpen(!isLeagueDropdownOpen)}
                className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
                disabled={loading}
              >
                <span>
                  {filters.league
                    ? allLeagues.find((l) => l.id === filters.league)?.name
                    : "Lig Seçin"}
                </span>
                <span className="transform transition-transform duration-200">
                  ▼
                </span>
              </button>

              {isLeagueDropdownOpen && (
                <div className="absolute w-full mt-1 bg-slate-700 rounded-md shadow-lg max-h-96 overflow-y-auto z-30">
                  <div className="p-2 sticky top-0 bg-slate-700 border-b border-slate-600">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Lig ara..."
                        className="w-full pl-10 pr-3 py-2 bg-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default Sidebar;
