import React from "react";
import { FaFlag, FaImage, FaEye } from "react-icons/fa";

function TeamTableRow({ team, isSelected, onSelect }) {
  return (
    <tr
      key={team.id}
      className="hover:bg-blue-200 cursor-pointer"
      onClick={() => onSelect(isSelected ? null : team)}
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
  );
}

export default TeamTableRow;
