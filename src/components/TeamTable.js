import React from "react";
import { FaFlag, FaBasketballBall, FaFilter } from "react-icons/fa";
import TeamTableRow from "./TeamTableRow";

function TeamTable({
  teams,
  sortConfig,
  onSort,
  getSortIcon,
  selectedTeam,
  onSelectTeam,
}) {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="text-left p-3 whitespace-nowrap cursor-pointer hover:bg-gray-200"
                onClick={() => onSort("country")}
              >
                <div className="flex items-center">
                  <FaFlag className="mr-2" />
                  Country {getSortIcon("country")}
                </div>
              </th>
              <th
                className="text-left p-3 whitespace-nowrap cursor-pointer hover:bg-gray-200"
                onClick={() => onSort("name")}
              >
                <div className="flex items-center">
                  <FaBasketballBall className="mr-2" />
                  Name {getSortIcon("name")}
                </div>
              </th>
              <th
                className="text-left p-3 whitespace-nowrap cursor-pointer hover:bg-gray-200"
                onClick={() => onSort("id")}
              >
                <div className="flex items-center">
                  <FaFilter className="mr-2" />
                  ID {getSortIcon("id")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teams.map((team) => (
              <TeamTableRow
                key={team.id}
                team={team}
                isSelected={selectedTeam?.id === team.id}
                onSelect={onSelectTeam}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeamTable;
