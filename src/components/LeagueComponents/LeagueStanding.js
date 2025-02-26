import React from "react";
import LeagueTableRow from "./LeagueTableRow";
import TableHeader from "./LeagueTableHeader";

function LeagueStanding({ standings }) {
  return (
    <div className="w-full overflow-x-auto my-3 sm:my-5 -mx-4 sm:mx-0 px-4 sm:px-0">
      <table className="min-w-full w-max sm:w-full border-collapse bg-white shadow-sm text-sm sm:text-base">
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
