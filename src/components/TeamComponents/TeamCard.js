import React, { useState, useEffect } from "react";
import { getTeamStatistics } from "../../services/api";
import HeaderTeamCard from "./HeaderTeamCard";
import renderLoading from "../RenderLoading";
import renderError from "../RenderError";

const TeamCard = ({ season, league, teamId }) => {
  const [teamStats, setTeamStats] = useState({
    team: null,
    games: null,
    points: null,
    leagueInfo: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamStats = async () => {
      try {
        const response = await getTeamStatistics(league, season, teamId);
        const stats = response.response;
        setTeamStats({
          team: stats.team,
          games: stats.games,
          points: stats.points,
          leagueInfo: stats.league,
        });
        setLoading(false);
      } catch (err) {
        setError("İstatistikler yüklenirken bir hata oluştu");
        setLoading(false);
      }
    };

    fetchTeamStats();
  }, [league, season, teamId]);

  if (loading) {
    return renderLoading();
  }

  if (error) {
    return renderError({ error });
  }

  const renderOverallStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <span className="block text-3xl font-semibold text-blue-600">
          {teamStats.games.played.all}
        </span>
        <span className="text-gray-600">Toplam Maç</span>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <span className="block text-3xl font-semibold text-green-600">
          {teamStats.games.wins.all.total}
        </span>
        <span className="text-gray-600">Galibiyet</span>
        <span className="text-sm text-green-600">
          ({(teamStats.games.wins.all.percentage * 100).toFixed(1)}%)
        </span>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <span className="block text-3xl font-semibold text-red-600">
          {teamStats.games.loses.all.total}
        </span>
        <span className="text-gray-600">Mağlubiyet</span>
        <span className="text-sm text-red-600">
          ({(teamStats.games.loses.all.percentage * 100).toFixed(1)}%)
        </span>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <span className="block text-2xl font-semibold text-purple-600">
          {teamStats.points.for.average.all}
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
          {renderStatRow("Maçlar", teamStats.games.played[location])}
          {renderStatRow(
            "Galibiyet",
            `${teamStats.games.wins[location].total} (${(
              teamStats.games.wins[location].percentage * 100
            ).toFixed(1)}%)`,
            true
          )}
          {renderStatRow(
            "Sayı Ortalaması",
            teamStats.points.for.average[location]
          )}
          {renderStatRow(
            "Yenilen Sayı",
            teamStats.points.against.average[location]
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 m-4 hover:shadow-lg transition-shadow max-w-4xl">
      <HeaderTeamCard team={teamStats.team} leagueInfo={teamStats.leagueInfo} />
      {renderOverallStats()}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderLocationStats(true)}
        {renderLocationStats(false)}
      </div>
    </div>
  );
};

export default TeamCard;
