import React from "react";

const TeamLogo = ({ logo, name }) => (
  <div className="flex items-center gap-3">
    <img src={logo} alt={name} className="w-6 h-6 object-contain" />
    <span>{name}</span>
  </div>
);

const FormIndicator = ({ form }) => {
  if (!form) return null;

  const formArray = typeof form === "string" ? form.split("") : [];

  if (formArray.length === 0) return null;

  return (
    <div className="flex gap-1">
      {formArray.map((result, index) => (
        <span
          key={index}
          className={`
            inline-flex items-center justify-center w-5 h-5 rounded text-xs font-semibold text-white
            ${result === "W" ? "bg-green-500" : ""}
            ${result === "L" ? "bg-red-500" : ""}
            ${result === "D" ? "bg-yellow-500" : ""}
          `}
        >
          {result}
        </span>
      ))}
    </div>
  );
};

const LeagueTableRow = ({ standing }) => {
  console.log("Form data:", standing.form);
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="p-3">{standing.position}</td>
      <td className="p-3">
        <TeamLogo logo={standing.team.logo} name={standing.team.name} />
      </td>
      <td className="p-3">{standing.games.played}</td>
      <td className="p-3">{standing.games.win.total}</td>
      <td className="p-3">{standing.games.lose.total}</td>
      <td className="p-3">
        {(parseFloat(standing.games.win.percentage) * 100).toFixed(1)}%
      </td>
      <td className="p-3">{standing.points.for}</td>
      <td className="p-3">{standing.points.against}</td>
      <td className="p-3">
        <FormIndicator form={standing.form} />
      </td>
    </tr>
  );
};

export default LeagueTableRow;
