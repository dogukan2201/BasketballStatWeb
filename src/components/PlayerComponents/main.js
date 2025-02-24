import React, { useState, useEffect } from "react";
import { getPlayers } from "../../services/api";
import PlayerTable from "./PlayerTable";
import renderLoading from "../RenderLoading";
import renderError from "../RenderError";
import NoPlayerFound from "./NoPlayerFound";
import Modal from "../Modal";
import PlayerCard from "./PlayerCard";
import PlayersTitle from "./PlayersTitle";

const Players = ({ team, season, search }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: "asc",
  });
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPlayers();
  }, [team, season, search]);

  const fetchPlayers = async () => {
    try {
      if (!team || !season) {
        throw new Error("Takım ve sezon parametreleri zorunludur.");
      }
      setLoading(true);
      setError(null);

      const params = {
        team,
        season,
      };
      if (search && search.length >= 3) params.search = search;

      const { response } = await getPlayers(params);

      if (!Array.isArray(response)) {
        throw new Error("Geçersiz API yanıtı");
      }

      setPlayers(response);
      setFilteredPlayers(response);
    } catch (error) {
      console.error("Oyuncular yüklenirken hata oluştu:", error);
      setError(
        error.message.includes("parametreleri") || error.message.includes("API")
          ? error.message
          : "Oyuncular yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."
      );
      setPlayers([]);
      setFilteredPlayers([]);
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

  if (loading) return renderLoading();
  if (error) return renderError({ error });

  const sortedPlayers = getSortedPlayers();

  return (
    <div className="container mx-auto px-4 py-2 md:p-4">
      <PlayersTitle />
      {sortedPlayers.length === 0 ? (
        <NoPlayerFound />
      ) : (
        <>
          <PlayerTable
            players={sortedPlayers}
            sortConfig={sortConfig}
            onSort={handleSort}
            onPlayerSelect={(player) => {
              setSelectedPlayer(player);
              setIsModalOpen(true);
            }}
          />

          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedPlayer(null);
            }}
          >
            {selectedPlayer && <PlayerCard player={selectedPlayer} />}
          </Modal>
        </>
      )}
    </div>
  );
};

Players.defaultProps = {
  team: null,
  season: null,
  search: null,
};

export default Players;
