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
        setError("An error occurred while loading statistics");
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
        <span className="text-gray-600">Total Games</span>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <span className="block text-3xl font-semibold text-green-600">
          {teamStats.games.wins.all.total}
        </span>
        <span className="text-gray-600">Wins</span>
        <span className="text-sm text-green-600">
          ({(teamStats.games.wins.all.percentage * 100).toFixed(1)}%)
        </span>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <span className="block text-3xl font-semibold text-red-600">
          {teamStats.games.loses.all.total}
        </span>
        <span className="text-gray-600">Losses</span>
        <span className="text-sm text-red-600">
          ({(teamStats.games.loses.all.percentage * 100).toFixed(1)}%)
        </span>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <span className="block text-2xl font-semibold text-purple-600">
          {teamStats.points.for.average.all}
        </span>
        <span className="text-gray-600">Points Per Game</span>
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
    const title = isHome ? "Home Statistics" : "Away Statistics";

    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-4 text-lg">{title}</h3>
        <div className="space-y-3">
          {renderStatRow("Games", teamStats.games.played[location])}
          {renderStatRow(
            "Wins",
            `${teamStats.games.wins[location].total} (${(
              teamStats.games.wins[location].percentage * 100
            ).toFixed(1)}%)`,
            true
          )}
          {renderStatRow(
            "Average Points",
            teamStats.points.for.average[location]
          )}
          {renderStatRow(
            "Points Against",
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
