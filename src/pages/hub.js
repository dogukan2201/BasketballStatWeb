import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaRunning, FaFutbol, FaTrophy } from "react-icons/fa";

const HubCard = ({ title, to, Icon }) => {
  return (
    <Link
      to={to}
      className="p-8 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <Icon className="text-4xl mb-4 text-slate-800 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
    </Link>
  );
};

export default function Hub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="text-center py-12 px-4">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Welcome!</h2>
        <p className="text-gray-600 mb-8">
          Access basketball information and statistics
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <HubCard title="Teams" to="/dashboard/teams" Icon={FaUsers} />
          <HubCard title="Players" to="/dashboard/players" Icon={FaRunning} />
          <HubCard title="Games" to="/dashboard/games" Icon={FaFutbol} />
          <HubCard title="Leagues" to="/dashboard/leagues" Icon={FaTrophy} />
        </div>
      </div>
    </div>
  );
}
