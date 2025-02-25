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
          setError("Lig detayları yüklenirken bir hata oluştu.");
          return;
        }

        setLeagueData(response.response);
      } catch (error) {
        console.error("Lig detayları yüklenirken hata:", error);
        setError(
          "Lig detayları yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."
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
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-xl max-w-3xl mx-auto mt-14">
      <div className="text-center mb-6">
        <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full p-4 shadow-lg">
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatisticBox label="Toplam Takım" value={leagueData.teams_count} />
        <StatisticBox label="Sezon" value={leagueData.season} />
        <StatisticBox label="Toplam Maç" value={leagueData.games_count} />
        <StatisticBox label="Tur" value={leagueData.current_round} />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-inner">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Lig Detayları
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Lig Tipi</span>
            <span className="font-medium">{leagueData.type}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Başlangıç Tarihi</span>
            <span className="font-medium">
              {new Date(leagueData.start_date).toLocaleDateString("tr-TR")}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Bitiş Tarihi</span>
            <span className="font-medium">
              {new Date(leagueData.end_date).toLocaleDateString("tr-TR")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeagueCard;
