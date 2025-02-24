import React, { useState, useEffect, useRef } from "react";
import { getPlayers } from "../../services/api";
import TableView from "./TableView";
import MobileView from "./MobileView";
import Pagination from "./Pagination";
import renderLoading from "../RenderLoading";
import renderError from "../RenderError";
import NoPlayerFound from "./NoPlayerFound";
import Modal from "../Modal";
import PlayerCard from "./PlayerCard";

const Players = ({ team, season, search }) => {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPlayers();
    const handleResize = () => setIsTableView(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [team, season, search]);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!team || !season) {
        setError(
          "Takım ve sezon bilgisi zorunludur. Lütfen her iki alanı da doldurunuz."
        );
        setPlayers([]);
        setFilteredPlayers([]);
        setLoading(false);
        return;
      }

      const params = {
        team,
        season,
      };
      if (search && search.length >= 3) params.search = search;

      const response = await getPlayers(params);
      const playerData = response.response || [];
      setPlayers(playerData);
      setFilteredPlayers(playerData);
    } catch (error) {
      setError(
        "Oyuncular yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."
      );
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
  if (sortedPlayers.length === 0) return <NoPlayerFound />;

  return (
    <div className="container mx-auto px-4 py-2 md:p-4">
      {isTableView ? (
        <TableView
          players={sortedPlayers}
          sortConfig={sortConfig}
          onSort={handleSort}
          onPlayerSelect={(player) => {
            setSelectedPlayer(player);
            setIsModalOpen(true);
          }}
        />
      ) : (
        <MobileView
          players={sortedPlayers}
          onPlayerSelect={(player) => {
            setSelectedPlayer(player);
            setIsModalOpen(true);
          }}
        />
      )}

      <Pagination
        totalItems={filteredPlayers.length}
        entriesPerPage={entriesPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
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
    </div>
  );
};

Players.defaultProps = {
  team: null,
  season: null,
  search: null,
};

export default Players;
