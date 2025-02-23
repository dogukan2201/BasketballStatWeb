import React, { useState, useEffect } from "react";
import { getTeamStatistics } from "../services/api";

const TeamCard = ({ season, league, teamId }) => {
  const [team, setTeam] = useState(null);
  const [games, setGames] = useState(null);
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamStats = async () => {
      try {
        const response = await getTeamStatistics(league, season, teamId);
        const stats = response.response;
        setTeam(stats.team);
        setGames(stats.games);
        setPoints(stats.points);
        setLoading(false);
      } catch (err) {
        setError("İstatistikler yüklenirken bir hata oluştu");
        setLoading(false);
      }
    };

    fetchTeamStats();
  }, [league, season, teamId]);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-xl">Yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  const renderHeader = () => (
    <div className="flex items-center gap-6 mb-8 border-b pb-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{team.name}</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-gray-600">
            {league.name} - {league.season}
          </span>
        </div>
      </div>
    </div>
  );

  const renderOverallStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <span className="block text-3xl font-semibold text-blue-600">
          {games.played.all}
        </span>
        <span className="text-gray-600">Toplam Maç</span>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <span className="block text-3xl font-semibold text-green-600">
          {games.wins.all.total}
        </span>
        <span className="text-gray-600">Galibiyet</span>
        <span className="text-sm text-green-600">
          ({(games.wins.all.percentage * 100).toFixed(1)}%)
        </span>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <span className="block text-3xl font-semibold text-red-600">
          {games.loses.all.total}
        </span>
        <span className="text-gray-600">Mağlubiyet</span>
        <span className="text-sm text-red-600">
          ({(games.loses.all.percentage * 100).toFixed(1)}%)
        </span>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <span className="block text-2xl font-semibold text-purple-600">
          {points.for.average.all}
        </span>
        <span className="text-gray-600">Maç Başı Sayı</span>
      </div>
    </div>
  );

  const renderStatRow = (label, value, isWin = false) => (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}:</span>
      <span className={`font-medium ${isWin ? "text-green-600" : ""}`}>
        {value}
      </span>
    </div>
  );

  const renderLocationStats = (isHome) => {
    const location = isHome ? "home" : "away";
    const title = isHome
      ? "Ev Sahibi İstatistikleri"
      : "Deplasman İstatistikleri";

    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-4 text-lg">{title}</h3>
        <div className="space-y-3">
          {renderStatRow("Maçlar", games.played[location])}
          {renderStatRow(
            "Galibiyet",
            `${games.wins[location].total} (${(
              games.wins[location].percentage * 100
            ).toFixed(1)}%)`,
            true
          )}
          {renderStatRow("Sayı Ortalaması", points.for.average[location])}
          {renderStatRow("Yenilen Sayı", points.against.average[location])}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 m-4 hover:shadow-lg transition-shadow max-w-4xl">
      {renderHeader()}
      {renderOverallStats()}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderLocationStats(true)}
        {renderLocationStats(false)}
      </div>
    </div>
  );
};

export default TeamCard;
