import React, { useState, useEffect } from "react";
import renderLoading from "./RenderLoading";
import renderError from "./RenderError";
import { getTeams } from "../services/api";
import SearchTeam from "./SearchTeam";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaFlag,
  FaImage,
  FaBasketballBall,
  FaSearch,
  FaTimes,
  FaExclamationCircle,
  FaSpinner,
  FaFilter,
  FaEye,
  FaWindowClose,
} from "react-icons/fa";
import TeamCard from "./TeamCard";

function Teams({ season, league }) {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
      setError(null);
      const response = await getTeams(league, season);
      const teamsData = response.response || [];
      setTeams(teamsData);
      setFilteredTeams(teamsData);
    } catch (error) {
      console.error("Takımlar yüklenirken hata oluştu:", error);
      setError(
        "Takımlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."
      );
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
  }, [season, league]);

  useEffect(() => {
    filterTeams();
  }, [searchTerm, teams]);

  if (loading) {
    return <renderLoading />;
  }

  if (error) {
    return <renderError message={error} />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 flex items-center">
        <FaBasketballBall className="mr-2" />
        Basketball Teams
      </h1>
      <div className="flex justify-end mb-4">
        <SearchTeam
          value={searchTerm}
          onChange={(value) => setSearchTerm(value)}
          onClear={() => setSearchTerm("")}
          placeholder="Team or Country"
        />
      </div>

      {filteredTeams.length === 0 ? (
        <div className="text-center py-8">
          <FaExclamationCircle className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-gray-600">
            Aradığınız kriterlere uygun takım bulunamadı. Lütfen farklı bir
            arama terimi deneyin.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    className="text-left p-3 whitespace-nowrap cursor-pointer hover:bg-gray-200"
                    onClick={() => sortTeams("country")}
                  >
                    <div className="flex items-center">
                      <FaFlag className="mr-2" />
                      Country {getSortIcon("country")}
                    </div>
                  </th>
                  <th
                    className="text-left p-3 whitespace-nowrap cursor-pointer hover:bg-gray-200"
                    onClick={() => sortTeams("name")}
                  >
                    <div className="flex items-center">
                      <FaBasketballBall className="mr-2" />
                      Name {getSortIcon("name")}
                    </div>
                  </th>
                  <th
                    className="text-left p-3 whitespace-nowrap cursor-pointer hover:bg-gray-200"
                    onClick={() => sortTeams("id")}
                  >
                    <div className="flex items-center">
                      <FaFilter className="mr-2" />
                      ID {getSortIcon("id")}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTeams.map((team) => (
                  <tr
                    key={team.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      setSelectedTeam(
                        selectedTeam?.id === team.id ? null : team
                      )
                    }
                  >
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {team.country?.flag ? (
                          <img
                            src={team.country.flag}
                            alt={team.country.name || "Unknown"}
                            className="w-6 h-4 object-cover"
                          />
                        ) : (
                          <FaFlag className="w-6 h-4 text-gray-400" />
                        )}
                        <span className="hidden sm:inline">
                          {team.country?.name || "Unknown Country"}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {team.logo ? (
                          <img
                            src={team.logo}
                            alt={team.name || "Unknown"}
                            className="w-6 h-6 object-cover"
                          />
                        ) : (
                          <FaImage className="w-6 h-6 text-gray-400" />
                        )}
                        <span className="hidden sm:inline">
                          {team.name || "Unknown Team"}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaEye className="mr-2" />
                        {team.id}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 flex items-center"
              onClick={() => setSelectedTeam(null)}
            >
              <FaWindowClose className="w-5 h-5" />
            </button>
            <TeamCard
              teamId={selectedTeam.id}
              season={season}
              league={league}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;
