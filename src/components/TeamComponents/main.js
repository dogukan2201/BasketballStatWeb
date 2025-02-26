import React, { useState, useEffect } from "react";
import renderLoading from "../RenderLoading";
import renderError from "../RenderError";
import TeamCard from "./TeamCard";
import Modal from "../Modal";
import TeamTable from "./TeamTable";
import RenderNotFound from "../RenderNotFound";
import TeamsTitle from "./TeamsTitle";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { getTeams } from "../../services/api";

function Teams({ season, league, search }) {
  const [loading, setLoading] = useState(true);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const fetchTeams = async () => {
    try {
      if (!season || !league) {
        throw new Error("Season and league parameters are required.");
      }
      setLoading(true);
      setError(null);
      const result = await getTeams(
        league,
        season,
        search?.length >= 3 ? search : undefined
      );

      if (!Array.isArray(result.response)) {
        throw new Error("Invalid API response");
      }

      setFilteredTeams(result.response);
    } catch (error) {
      console.error("An error occurred while loading teams:", error);
      setError(
        error.message.includes("parameters") || error.message.includes("API")
          ? error.message
          : "An error occurred while loading teams. Please try again later."
      );
      setFilteredTeams([]);
    } finally {
      setLoading(false);
    }
  };

  const sortTeams = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";

    setSortConfig({ key, direction });

    const sortedTeams = [...filteredTeams].sort((a, b) => {
      const getSortValue = (item, key) => {
        switch (key) {
          case "country":
            return item.country?.name?.toLowerCase() || "";
          case "name":
            return item.name?.toLowerCase() || "";
          case "id":
            return item.id;
          default:
            return "";
        }
      };

      const aValue = getSortValue(a, key);
      const bValue = getSortValue(b, key);

      if (typeof aValue === "string") {
        return direction === "ascending"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return direction === "ascending" ? aValue - bValue : bValue - aValue;
    });

    setFilteredTeams(sortedTeams);
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <FaSort />;
    }
    return sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown />;
  };

  useEffect(() => {
    fetchTeams();
  }, [season, league, search]);

  if (loading) {
    return renderLoading();
  }

  if (error) {
    return renderError({ error });
  }

  return (
    <div className="p-6">
      <TeamsTitle />
      {filteredTeams.length === 0 ? (
        <RenderNotFound />
      ) : (
        <TeamTable
          teams={filteredTeams}
          sortConfig={sortConfig}
          onSort={sortTeams}
          getSortIcon={getSortIcon}
          selectedTeam={selectedTeam}
          onSelectTeam={setSelectedTeam}
        />
      )}
      <Modal isOpen={!!selectedTeam} onClose={() => setSelectedTeam(null)}>
        <TeamCard teamId={selectedTeam?.id} season={season} league={league} />
      </Modal>
    </div>
  );
}

export default Teams;
