import React from "react";

const PlayerCard = ({ player }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          {player.image ? (
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-2xl">{player.name.charAt(0)}</span>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold">{player.name}</h3>
          <p className="text-gray-600">{player.country}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="stat-box">
          <span className="text-gray-600 text-sm">Maç Sayısı</span>
          <span className="text-lg font-semibold">{player.matches || 0}</span>
        </div>
        <div className="stat-box">
          <span className="text-gray-600 text-sm">Gol</span>
          <span className="text-lg font-semibold">{player.goals || 0}</span>
        </div>
        <div className="stat-box">
          <span className="text-gray-600 text-sm">Asist</span>
          <span className="text-lg font-semibold">{player.assists || 0}</span>
        </div>
        <div className="stat-box">
          <span className="text-gray-600 text-sm">Sarı Kart</span>
          <span className="text-lg font-semibold">
            {player.yellowCards || 0}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <p className="text-sm text-gray-600">ID: {player.id}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
