import React from "react";
import LeagueTableRow from "./LeagueTableRow";
import TableHeader from "./LeagueTableHeader";

function LeagueStanding({ standings }) {
  return (
    <div className="w-full overflow-x-auto my-5">
      <table className="w-full border-collapse bg-white shadow-sm">
        <TableHeader />
        <tbody>
          {standings?.map((standing) => (
            <LeagueTableRow key={standing.team.id} standing={standing} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeagueStanding;
