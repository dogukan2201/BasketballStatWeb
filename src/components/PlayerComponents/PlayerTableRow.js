import React from "react";
import { FaUser } from "react-icons/fa";

function PlayerTableRow({ player, onSelect }) {
  return (
    <tr
      className="hover:bg-blue-200 cursor-pointer"
      onClick={() => onSelect(player)}
    >
      <td className="p-1.5 sm:p-3 whitespace-nowrap">
        <div className="flex items-center gap-2">{player.country}</div>
      </td>
      <td className="p-1.5 sm:p-3 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <FaUser className="w-6 h-6 text-gray-400" />
          <span>{player.name}</span>
        </div>
      </td>
      <td className="p-1.5 sm:p-3 whitespace-nowrap">
        <div className="flex items-center">{player.id}</div>
      </td>
    </tr>
  );
}

export default PlayerTableRow;
