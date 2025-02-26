import React from "react";

const PlayerHeader = ({ player, type, gameId, teamId }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-200">
    <div>
      <h3 className="text-2xl font-bold text-blue-700 mb-2">
        {player?.name || "N/A"}
      </h3>
      <p className="text-gray-600">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {type || "N/A"}
        </span>
      </p>
    </div>
    <div className="mt-4 md:mt-0">
      <p className="text-gray-600">
        Game ID: <span className="font-semibold">{gameId || "N/A"}</span>
      </p>
      <p className="text-gray-600">
        Team ID: <span className="font-semibold">{teamId || "N/A"}</span>
      </p>
    </div>
  </div>
);

export default PlayerHeader;
