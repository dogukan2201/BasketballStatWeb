import React from "react";
import { FaBasketballBall } from "react-icons/fa";

function TeamsTitle() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center">
        <span className="bg-blue-50 p-2 rounded-lg mr-3">
          <FaBasketballBall className="text-slate-800 w-8 h-8" />
        </span>
        Basketball Teams
      </h1>
      <p className="mt-2 text-gray-600 text-lg ">
        View all basketball teams and statistics
      </p>
    </div>
  );
}

export default TeamsTitle;
