import React, { useState, useEffect } from "react";
import LeaguesTitle from "./LeaguesTitle";
import { getStandings } from "../../services/api";
import renderLoading from "../RenderLoading";
import renderError from "../RenderError";
import RenderNotFound from "../RenderNotFound";
import LeagueStanding from "./LeagueStanding";
function LeaguesMain({ season, league, stage, group }) {
  const [standings, setStandings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      if (!league || !season) {
        setLoading(false);
        setError("League and season parameters are mandatory");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await getStandings(league, season, stage, group);

        if (!response?.response) {
          throw new Error("Standings data could not be retrieved");
        }

        setStandings(response.response[0]);
      } catch (error) {
        console.error("Error loading standings data:", error);
        setError(
          "An error occurred while loading standings data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [league, season, stage, group]);

  if (loading) return renderLoading();
  if (error) return renderError({ error });
  if (!standings) return <RenderNotFound />;

  return (
    <div className="h-screen bg-gray-100 flex">
      <div className="flex-1 flex flex-col overflow-hidden">
        <LeaguesTitle />
        <LeagueStanding standings={standings} />
      </div>
    </div>
  );
}

export default LeaguesMain;
