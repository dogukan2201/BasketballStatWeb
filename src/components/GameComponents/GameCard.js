import React, { useState, useEffect } from "react";
import { getGameDetails } from "../../services/api";
import renderLoading from "../RenderLoading";
import renderError from "../RenderError";

function GameCard({ gameId, selectedGame }) {
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getGameDetails(gameId);
        console.log("API Response:", response);

        if (
          !response?.response ||
          !Array.isArray(response.response) ||
          response.response.length !== 2
        ) {
          console.error("Invalid API response format:", response);
          setError(
            "There was an error in the data format. Please try again later."
          );
          return;
        }

        const isValidTeamData = response.response.every(
          (team) =>
            team.team?.id &&
            team.field_goals?.total !== undefined &&
            team.threepoint_goals?.total !== undefined &&
            team.freethrows_goals?.total !== undefined &&
            team.rebounds?.total !== undefined
        );

        if (!isValidTeamData) {
          console.error("Missing team statistics in response:", response);
          setError("Missing team statistics. Please try again later.");
          return;
        }

        setGameData(response.response);
      } catch (error) {
        console.error("An error occurred while loading game details:", error);
        setError(
          "An error occurred while loading game details. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (gameId) {
      fetchGameDetails();
    }
  }, [gameId]);

  if (loading) {
    return renderLoading();
  }

  if (error) {
    return renderError({ error });
  }

  if (!gameData) {
    return null;
  }

  const StatBar = ({ value, total, label }) => {
    const percentage = (value / total) * 100;
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-medium text-gray-700">
            {value}/{total} ({((value / total) * 100).toFixed(1)}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const StatComparison = ({ label, home, away }) => (
    <div className="grid grid-cols-11 gap-2 items-center mb-4">
      <div className="col-span-5 text-right">
        <span className="font-medium text-lg">{home}</span>
      </div>
      <div className="col-span-1 text-center">
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <div className="col-span-5 text-left">
        <span className="font-medium text-lg">{away}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-xl shadow-xl max-w-3xl mx-auto mt-14">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Match Details</h2>
        <div className="flex justify-center items-center space-x-4 mb-3">
          <div className="flex flex-col items-center space-y-1">
            <div className="w-24 h-24 rounded-full bg-white p-2 shadow-lg">
              <img
                src={selectedGame.teams.home.logo}
                alt={selectedGame.teams.home.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-sm text-gray-800">
              {selectedGame.teams.home.name}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-gray-400 mb-1">VS</span>
            <div className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs">
              {new Date(selectedGame.date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <div className="w-24 h-24 rounded-full bg-white p-2 shadow-lg">
              <img
                src={selectedGame.teams.away.logo}
                alt={selectedGame.teams.away.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-sm text-gray-800">
              {selectedGame.teams.away.name}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-3 shadow-inner">
        <div className="space-y-3">
          <div className="mb-3">
            <h3 className="text-base font-semibold text-gray-800 mb-2 text-center">
              Basic Statistics
            </h3>
            {gameData.map((team, index) => (
              <div
                key={team.team.id}
                className={`mb-4 ${index === 0 ? "border-b pb-4" : ""}`}
              >
                <h4 className="text-base font-medium text-gray-700 mb-2">
                  {team.team.name}
                </h4>
                <StatBar
                  value={team.field_goals.total}
                  total={team.field_goals.attempts}
                  label="Field Goals"
                />
                <StatBar
                  value={team.threepoint_goals.total}
                  total={team.threepoint_goals.attempts}
                  label="3-Point Goals"
                />
                <StatBar
                  value={team.freethrows_goals.total}
                  total={team.freethrows_goals.attempts}
                  label="Free Throws"
                />
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
              Comparative Statistics
            </h3>
            <StatComparison
              label="Rebound"
              home={gameData[0].rebounds.total}
              away={gameData[1].rebounds.total}
            />
            <StatComparison
              label="Assist"
              home={gameData[0].assists}
              away={gameData[1].assists}
            />
            <StatComparison
              label="Steal"
              home={gameData[0].steals}
              away={gameData[1].steals}
            />
            <StatComparison
              label="Block"
              home={gameData[0].blocks}
              away={gameData[1].blocks}
            />
            <StatComparison
              label="Turnover"
              home={gameData[0].turnovers}
              away={gameData[1].turnovers}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            {gameData.map((team) => (
              <div key={team.team.id} className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-base font-medium text-gray-800 mb-2">
                  {team.team.name} - Rebound
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Offensive</span>
                    <span className="font-medium">{team.rebounds.offence}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Defensive</span>
                    <span className="font-medium">{team.rebounds.defense}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t">
                    <span className="text-gray-600">Total</span>
                    <span className="font-medium">{team.rebounds.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
