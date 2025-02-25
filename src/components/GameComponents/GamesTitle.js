import React from "react";
import { FaBasketballBall } from "react-icons/fa";

function GamesTitle() {
  return (
    <div className="mb-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center">
        <span className="bg-blue-50 p-2 rounded-lg mr-3">
          <FaBasketballBall className="text-slate-800 w-8 h-8" />
        </span>
        Matches
      </h1>
      <p className="mt-2 text-gray-600 text-lg text-center">
        All matches of the selected season and league
      </p>
    </div>
  );
}

export default GamesTitle;
