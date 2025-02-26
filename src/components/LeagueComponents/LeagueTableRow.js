import React from "react";

const TeamLogo = ({ logo, name }) => (
  <div className="flex items-center gap-2 sm:gap-3">
    <img
      src={logo}
      alt={name}
      className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
    />
    <span className="text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[150px]">
      {name}
    </span>
  </div>
);

const LeagueTableRow = ({ standing }) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors text-xs sm:text-sm">
      <td className="p-2 sm:p-3">{standing.position}</td>
      <td className="p-2 sm:p-3">
        <TeamLogo logo={standing.team.logo} name={standing.team.name} />
      </td>
      <td className="p-2 sm:p-3">{standing.games.played}</td>
      <td className="p-2 sm:p-3">{standing.games.win.total}</td>
      <td className="p-2 sm:p-3">{standing.games.lose.total}</td>
      <td className="p-2 sm:p-3 whitespace-nowrap">
        {(parseFloat(standing.games.win.percentage) * 100).toFixed(0)}%
      </td>
      <td className="hidden sm:table-cell p-2 sm:p-3">{standing.points.for}</td>
      <td className="hidden sm:table-cell p-2 sm:p-3">
        {standing.points.against}
      </td>
    </tr>
  );
};

export default LeagueTableRow;
