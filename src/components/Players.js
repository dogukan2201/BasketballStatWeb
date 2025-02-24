import React, { useState, useEffect, useRef } from "react";
import { getPlayers } from "../services/api";
import PlayerCard from "./PlayerCard";
import renderLoading from "./RenderLoading";
import renderError from "./RenderError";
function Players() {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: "asc",
  });
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const selectedPlayerRef = useRef(null);
  const [isTableView, setIsTableView] = useState(window.innerWidth > 768);

  useEffect(() => {
    fetchPlayers();
    const handleResize = () => {
      setIsTableView(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    filterPlayers();
  }, [searchTerm, players]);

  useEffect(() => {
    if (selectedPlayer && selectedPlayerRef.current) {
      selectedPlayerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedPlayer]);

  const filterPlayers = () => {
    const filtered = players.filter((player) =>
      player?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlayers(filtered);
  };

  const fetchPlayers = async () => {
    try {
      setError(null);
      const response = await getPlayers(139, "2023-2024");
      const playerData = response.response || [];
      setPlayers(playerData);
      setFilteredPlayers(playerData);
    } catch (error) {
      setError(
        "Oyuncular yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."
      );
      console.error("Oyuncular yüklenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    setSortConfig((prevConfig) => ({
      field,
      direction:
        prevConfig.field === field && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const getSortedPlayers = () => {
    const { field, direction } = sortConfig;
    if (!field) return filteredPlayers;

    return [...filteredPlayers].sort((a, b) => {
      if (field === "id") {
        return direction === "asc" ? a.id - b.id : b.id - a.id;
      }
      const aValue = (a[field] || "").toLowerCase();
      const bValue = (b[field] || "").toLowerCase();
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  };

  if (loading) {
    return renderLoading();
  }

  if (error) {
    return renderError({ error });
  }

  const sortedPlayers = getSortedPlayers();
  const { field: sortField, direction: sortDirection } = sortConfig;

  const renderSearchBar = () => (
    <div className="mb-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Oyuncu ara..."
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );

  const renderMobileView = () => (
    <div className="grid grid-cols-1 gap-4">
      {sortedPlayers.map((player) => (
        <div
          key={player.id}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setSelectedPlayer(player)}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{player.name}</h3>
              <p className="text-sm text-gray-600">{player.country}</p>
            </div>
            <span className="text-sm text-gray-500">ID: {player.id}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTableView = () => (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["country", "name", "id"].map((field) => (
                <th
                  key={field}
                  className="text-left p-3 whitespace-nowrap cursor-pointer hover:bg-gray-200 transition-colors duration-200 text-sm"
                  onClick={() => handleSort(field)}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {sortField === field &&
                    (sortDirection === "asc" ? " ↑" : " ↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedPlayers.map((player) => (
              <tr
                key={player.id}
                className="hover:bg-blue-200 cursor-pointer"
                onClick={() => setSelectedPlayer(player)}
              >
                <td className="p-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{player.country}</span>
                  </div>
                </td>
                <td className="p-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{player.name}</span>
                  </div>
                </td>
                <td className="p-3 whitespace-nowrap text-sm">{player.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPagination = () => (
    <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
      <div className="text-xs md:text-sm text-gray-700 text-center md:text-left">
        Gösterilen: 1 - {entriesPerPage} / Toplam: {filteredPlayers.length}
      </div>
      <div className="flex gap-1">
        <button className="px-2 py-1 text-sm border rounded hover:bg-gray-100 transition-colors duration-200">
          Önceki
        </button>
        <button className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200">
          1
        </button>
        <button className="px-2 py-1 text-sm border rounded hover:bg-gray-100 transition-colors duration-200">
          Sonraki
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-2 md:p-4">
      {renderSearchBar()}
      {isTableView ? renderTableView() : renderMobileView()}
      {renderPagination()}

      {selectedPlayer && (
        <div ref={selectedPlayerRef} className="mt-6 border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Seçilen Oyuncu Detayları</h2>
          <PlayerCard player={selectedPlayer} />
        </div>
      )}
    </div>
  );
}

export default Players;
