import React, { useState, useEffect } from "react";
import renderLoading from "../RenderLoading";
import renderError from "../RenderError";
import { getTeams } from "../../services/api";
import TeamCard from "./TeamCard";
import Modal from "../Modal";
import TeamTable from "./TeamTable";
import NoTeamsFound from "./NoTeamsFound";
import TeamsTitle from "./TeamsTitle";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

function Teams({ season, league, search }) {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState(search || "");
  const [loading, setLoading] = useState(true);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [selectedTeam, setSelectedTeam] = useState(null);

  const fetchTeams = async () => {
    try {
      if (!season || !league) {
        throw new Error("Sezon ve lig parametreleri zorunludur.");
      }
      setLoading(true);
      setError(null);
      const { response } = await getTeams(league, season);

      if (!Array.isArray(response)) {
        throw new Error("Geçersiz API yanıtı");
      }

      setTeams(response);
      setFilteredTeams(response);
    } catch (error) {
      console.error("Takımlar yüklenirken hata oluştu:", error);
      setError(
        error.message.includes("parametreleri") || error.message.includes("API")
          ? error.message
          : "Takımlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."
      );
      setTeams([]);
      setFilteredTeams([]);
    } finally {
      setLoading(false);
    }
  };

  const filterTeams = () => {
    const filtered = teams.filter((team) => {
      const teamName = team?.name?.toLowerCase() || "";
      const countryName = team?.country?.name?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      return teamName.includes(search) || countryName.includes(search);
    });
    setFilteredTeams(filtered);
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

  useEffect(() => {
    setSearchTerm(search || "");
  }, [search]);

  useEffect(() => {
    filterTeams();
  }, [searchTerm, teams]);

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
        <NoTeamsFound />
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
