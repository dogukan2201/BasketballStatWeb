import React from "react";

function NoGamesFound() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="text-xl font-semibold text-gray-700 mb-2">
        No Games Found
      </div>
      <p className="text-gray-500 text-center">
        No games found matching the selected criteria. Please choose a different
        season or league.
      </p>
    </div>
  );
}

export default NoGamesFound;
