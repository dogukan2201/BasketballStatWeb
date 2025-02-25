import React, { useState, useEffect } from "react";
import renderLoading from "../RenderLoading";
import renderError from "../RenderError";
import { getGames } from "../../services/api";
import GameCard from "./GameCard";
import Modal from "../Modal";
import GameTable from "./GameTable";
import NoGamesFound from "./NoGamesFound";
import GamesTitle from "./GamesTitle";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

function Games({ season, league }) {
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
        throw new Error("Sezon ve lig parametreleri zorunludur.");
      }
      setLoading(true);
      setError(null);
      const { response } = await getGames(league, season);

      if (!Array.isArray(response)) {
        throw new Error("Geçersiz API yanıtı");
      }

      setGames(response);
      setFilteredGames(response);
    } catch (error) {
      console.error("Maçlar yüklenirken hata oluştu:", error);
      setError(
        error.message.includes("parametreleri") || error.message.includes("API")
          ? error.message
          : "Maçlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."
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
  }, [season, league]);

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
        <NoGamesFound />
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
