import React, { useState, useEffect } from "react";
import { getPlayers } from "../../services/api";
import renderLoading from "../RenderLoading";
import renderError from "../RenderError";
import NoPlayerFound from "./TableComponents/NoPlayerFound";
import Modal from "../Modal";
import PlayersTitle from "./PlayersTitle";
import PlayerStatistic from "./CardComponents/PlayerStatistic";
import PlayerTable from "./TableComponents/PlayerTable";

const Players = ({ team, season, search, id }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: "asc",
  });
  const fetchPlayers = async () => {
    try {
      if (!team || !season) {
        throw new Error("Team and season parameters are required.");
      }

      if (search && search.length < 3) {
        throw new Error("Search requires at least 3 characters.");
      }

      setLoading(true);
      setError(null);

      const apiResponse = await getPlayers({
        team,
        season,
        ...(search?.length >= 3 && { search }),
        ...(id && { id }),
      });

      if (apiResponse.errors && apiResponse.errors.length > 0) {
        throw new Error(apiResponse.errors.join(", "));
      }

      const playerData = apiResponse.response;

      if (!Array.isArray(playerData)) {
        throw new Error("Player data is not in a valid format.");
      }

      setPlayers(playerData);
      setFilteredPlayers(playerData);
    } catch (error) {
      console.error("API Error:", error);
      setError(error.message);
      setPlayers([]);
      setFilteredPlayers([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPlayers();
  }, [team, season, search, id]);

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
            {selectedPlayer && (
              <PlayerStatistic player={selectedPlayer?.id} season={season} />
            )}
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
  id: null,
};

export default Players;
