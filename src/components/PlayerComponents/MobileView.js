import React from "react";

const MobileView = ({ players, onPlayerSelect }) => (
  <div className="grid grid-cols-1 gap-4">
    {players.map((player) => (
      <div
        key={player.id}
        className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => onPlayerSelect(player)}
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{player.name}</h3>
            <p className="text-sm text-gray-600">{player.country}</p>
          </div>
          <span className="text-sm text-gray-500">ID: {player.id}</span>
        </div>
      </div>
    ))}
  </div>
);

export default MobileView;
