import React from "react";
import { FaTrophy } from "react-icons/fa";

function LeaguesTitle() {
  return (
    <div className="mb-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center">
        <span className="bg-blue-50 p-2 rounded-lg mr-3">
          <FaTrophy className="text-slate-800 w-8 h-8" />
        </span>
        Leagues
      </h1>
      <p className="mt-2 text-gray-600 text-lg text-center">
        All standings of leagues in the selected season
      </p>
    </div>
  );
}

export default LeaguesTitle;
