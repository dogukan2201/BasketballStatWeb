import React, { useState, useEffect } from "react";
import { getPlayers } from "../services/api";

function Player() {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    const filtered = players.filter((player) => {
      if (!player || !player.name) return false;
      const playerName = player.name.toLowerCase();
      const search = searchTerm.toLowerCase();
      return playerName.includes(search);
    });
    setFilteredPlayers(filtered);
  }, [searchTerm, players]);

  const fetchPlayers = async () => {
    try {
      setError(null);
      const response = await getPlayers(139, "2023-2024");
      setPlayers(response.response || []);
      setFilteredPlayers(response.response || []);
      setLoading(false);
    } catch (error) {
      console.error("Oyuncular yüklenirken hata oluştu:", error);
      setError(
        "Oyuncular yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."
      );
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-xl">Yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Hata! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Basketball Players</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          Show
          <select
            className="border rounded px-2 py-1"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          entries
        </div>

        <input
          type="text"
          placeholder="Player or Team"
          className="border rounded px-4 py-2 w-full md:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 whitespace-nowrap">Country</th>
                <th className="text-left p-3 whitespace-nowrap">Name</th>
                <th className="text-left p-3 whitespace-nowrap">Id</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <img
                        src={player.country}
                        className="w-6 h-6 object-cover"
                      />
                      <span className="hidden sm:inline">{player.country}</span>
                    </div>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline">{player.name}</span>
                    </div>
                  </td>
                  <td className="p-3 whitespace-nowrap">{player.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-sm text-gray-700">
          Showing 1 to {entriesPerPage} of {filteredPlayers.length} entries
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
