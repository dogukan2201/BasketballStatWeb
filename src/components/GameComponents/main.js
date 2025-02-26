import React, { useState, useEffect } from "react";
import renderLoading from "../RenderLoading";
import renderError from "../RenderError";
import { getGames } from "../../services/api";
import GameCard from "./GameCard";
import Modal from "../Modal";
import GameTable from "./GameTable";
import RenderNotFound from "../RenderNotFound";
import GamesTitle from "./GamesTitle";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

function Games({ season, league, team, date }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredGames, setFilteredGames] = useState([]);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const fetchGames = async () => {
    try {
      if (!season || !league) {
        throw new Error("Season and league parameters are required.");
      }
      setLoading(true);
      setError(null);
      const { response } = await getGames(league, season, team, date);

      if (!Array.isArray(response)) {
        throw new Error("Invalid API response");
      }

      setGames(response);
      setFilteredGames(response);
    } catch (error) {
      console.error("An error occurred while loading games:", error);
      setError(
        error.message.includes("parameters") || error.message.includes("API")
          ? error.message
          : "An error occurred while loading games. Please try again later."
      );
      setGames([]);
      setFilteredGames([]);
    } finally {
      setLoading(false);
    }
  };

  const sortGames = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";

    setSortConfig({ key, direction });

    const sortedGames = [...filteredGames].sort((a, b) => {
      const getSortValue = (item, key) => {
        switch (key) {
          case "date":
            return new Date(item.date);
          case "homeTeam":
            return item.teams?.home?.name?.toLowerCase() || "";
          case "awayTeam":
            return item.teams?.away?.name?.toLowerCase() || "";
          case "id":
            return item.id;
          default:
            return "";
        }
      };

      const aValue = getSortValue(a, key);
      const bValue = getSortValue(b, key);

      if (aValue instanceof Date) {
        return direction === "ascending"
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      if (typeof aValue === "string") {
        return direction === "ascending"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return direction === "ascending" ? aValue - bValue : bValue - aValue;
    });

    setFilteredGames(sortedGames);
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <FaSort />;
    }
    return sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown />;
  };

  useEffect(() => {
    fetchGames();
  }, [season, league, team, date]);

  if (loading) {
    return renderLoading();
  }

  if (error) {
    return renderError({ error });
  }

  return (
    <div className="p-6">
      <GamesTitle />
      {filteredGames.length === 0 ? (
        <RenderNotFound />
      ) : (
        <GameTable
          games={filteredGames}
          sortConfig={sortConfig}
          onSort={sortGames}
          getSortIcon={getSortIcon}
          selectedGame={selectedGame}
          onSelectGame={setSelectedGame}
        />
      )}
      <Modal isOpen={!!selectedGame} onClose={() => setSelectedGame(null)}>
        <GameCard gameId={selectedGame?.id} selectedGame={selectedGame} />
      </Modal>
    </div>
  );
}

export default Games;
