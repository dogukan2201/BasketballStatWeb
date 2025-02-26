import React from "react";
import { FaTrophy } from "react-icons/fa";

const LeaguesTitle = ({ standings }) => {
  if (!standings?.length) return null;

  const { league, country } = standings[0];
  const { logo, name, season } = league;
  const { flag, country: countryName } = country;

  const renderLeagueInfo = () => {
    if (!logo) return null;

    return (
      <div className="flex flex-col items-center w-full px-2">
        <img src={logo} alt={name} className="w-16 h-16 object-contain mt-2" />
        <h2 className="text-lg font-semibold text-gray-800 mt-1 text-center">
          {name}
        </h2>
        <div className="flex items-center gap-1 text-gray-600 mt-1">
          <img
            src={flag}
            alt={countryName}
            className="w-4 h-4 object-contain"
          />
          <span className="text-sm">{countryName}</span>
        </div>
        <span className="text-xs text-gray-500">Season: {season}</span>
      </div>
    );
  };

  return (
    <div className="mb-4 flex flex-col items-center justify-center w-full px-3">
      <h1 className="text-xl font-bold text-gray-900 flex items-center">
        <span className="bg-blue-50 p-1 rounded-lg mr-2">
          <FaTrophy className="text-slate-800 w-5 h-5" />
        </span>
        Leagues
      </h1>
      {renderLeagueInfo()}
      <p className="mt-2 text-gray-600 text-sm text-center">
        All standings of leagues in the selected season
      </p>
    </div>
  );
};

export default LeaguesTitle;
