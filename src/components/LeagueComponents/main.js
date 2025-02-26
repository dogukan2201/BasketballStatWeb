import React, { useState, useEffect } from "react";
import LeaguesTitle from "./LeaguesTitle";
import { getStandings } from "../../services/api";
import renderLoading from "../RenderLoading";
import renderError from "../RenderError";
import NoLeaguesFound from "./NoLeaguesFound";
import LeagueStanding from "./LeagueStanding";
function LeaguesMain({ season, league, stage, group }) {
  const [standings, setStandings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      if (!league || !season) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await getStandings(league, season, stage, group);

        if (!response?.response) {
          throw new Error("Sıralama verileri alınamadı");
        }

        setStandings(response.response[0]);
      } catch (error) {
        console.error("Sıralama verileri yüklenirken hata:", error);
        setError(
          "Sıralama verileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [league, season, stage, group]);

  if (loading) return renderLoading();
  if (error) return renderError({ error });
  if (!standings) return <NoLeaguesFound />;

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
