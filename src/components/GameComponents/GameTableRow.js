import React from "react";

function GameTableRow({ game, onSelect }) {
  const formattedDate = new Date(game.date).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <tr
      className={"hover:bg-blue-200 cursor-pointer"}
      onClick={() => onSelect(game)}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formattedDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex items-center space-x-3">
          <img
            src={game.teams.home.logo}
            alt={`${game.teams.home.name} logo`}
            className="w-8 h-8 object-contain"
          />
          <span>{game.teams.home.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex items-center space-x-3">
          <img
            src={game.teams.away.logo}
            alt={`${game.teams.away.name} logo`}
            className="w-8 h-8 object-contain"
          />
          <span>{game.teams.away.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {game.scores.home.total} - {game.scores.away.total}
      </td>
    </tr>
  );
}

export default GameTableRow;
