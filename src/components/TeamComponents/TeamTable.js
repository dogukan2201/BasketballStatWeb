import React from "react";
import { FaFlag, FaBasketballBall, FaFilter } from "react-icons/fa";
import TeamTableRow from "./TeamTableRow";

function TeamTable({ teams, onSort, getSortIcon, onSelectTeam }) {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg max-w-3xl mx-auto px-1 sm:px-0">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="text-left p-1.5 sm:p-3 whitespace-nowrap cursor-pointer  w-[30%] sm:w-auto"
                onClick={() => onSort("country")}
              >
                <div className="flex items-center">
                  <FaFlag className="mr-1 sm:mr-2 text-[10px] sm:text-sm" />
                  <span className="hidden sm:inline">Country</span>
                  <span className="sm:hidden">Ctry</span>
                  {getSortIcon("country")}
                </div>
              </th>
              <th
                className="text-left p-1.5 sm:p-3 whitespace-nowrap cursor-pointer  w-[40%] sm:w-auto"
                onClick={() => onSort("name")}
              >
                <div className="flex items-center">
                  <FaBasketballBall className="mr-1 sm:mr-2 text-[10px] sm:text-sm" />
                  <span className="hidden sm:inline">Name</span>
                  <span className="sm:hidden">Name</span>
                  {getSortIcon("name")}
                </div>
              </th>
              <th
                className="text-left p-1.5 sm:p-3 whitespace-nowrap cursor-pointer w-[30%] sm:w-auto"
                onClick={() => onSort("id")}
              >
                <div className="flex items-center">
                  <FaFilter className="mr-1 sm:mr-2 text-[10px] sm:text-sm" />
                  ID {getSortIcon("id")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teams.map((team) => (
              <TeamTableRow key={team.id} team={team} onSelect={onSelectTeam} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeamTable;
