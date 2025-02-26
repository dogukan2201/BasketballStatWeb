import React, { useState, useEffect } from "react";
import { getStandings } from "../../services/api";
import renderLoading from "../RenderLoading";
import renderError from "../RenderError";

function LeagueCard({ leagueId, selectedLeague, season }) {
  const [leagueData, setLeagueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagueDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getStandings(leagueId, season);

        if (!response?.response) {
          setError("An error occurred while loading league details.");
          return;
        }

        setLeagueData(response.response);
      } catch (error) {
        console.error("Error while loading league details:", error);
        setError(
          "An error occurred while loading league details. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (leagueId) {
      fetchLeagueDetails();
    }
  }, [leagueId, season]);

  if (loading) return renderLoading();
  if (error) return renderError({ error });
  if (!leagueData) return null;

  const StatisticBox = ({ label, value }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-sm text-gray-600 mb-1">{label}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl shadow-xl max-w-3xl mx-auto mt-8 sm:mt-14">
      <div className="text-center mb-4 sm:mb-6">
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4 bg-white rounded-full p-3 sm:p-4 shadow-lg">
          <img
            src={selectedLeague.logo}
            alt={selectedLeague.name}
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {selectedLeague.name}
        </h1>
        <p className="text-gray-600">{selectedLeague.country}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <StatisticBox label="Total Teams" value={leagueData.teams_count} />
        <StatisticBox label="Season" value={leagueData.season} />
        <StatisticBox label="Total Matches" value={leagueData.games_count} />
        <StatisticBox label="Round" value={leagueData.current_round} />
      </div>

      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-inner">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
          League Details
        </h2>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b">
            <span className="text-gray-600 text-sm sm:text-base mb-1 sm:mb-0">
              League Type
            </span>
            <span className="font-medium text-sm sm:text-base">
              {leagueData.type}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b">
            <span className="text-gray-600 text-sm sm:text-base mb-1 sm:mb-0">
              Start Date
            </span>
            <span className="font-medium text-sm sm:text-base">
              {new Date(leagueData.start_date).toLocaleDateString("en-US")}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b">
            <span className="text-gray-600 text-sm sm:text-base mb-1 sm:mb-0">
              End Date
            </span>
            <span className="font-medium text-sm sm:text-base">
              {new Date(leagueData.end_date).toLocaleDateString("en-US")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeagueCard;
