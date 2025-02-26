import React, { useEffect, useState } from "react";
import { getPlayerStatistics } from "../../../services/api";

const PlayerAvatar = ({ name }) => (
  <div className="relative mb-6 md:mb-0">
    <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
      <span className="text-5xl font-bold text-white">{name.charAt(0)}</span>
    </div>
  </div>
);

const PlayerInfo = ({ name, country, position }) => (
  <div className="text-center md:text-left">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">{name}</h2>
    <p className="text-gray-600 font-medium text-lg mb-2">{country}</p>
    <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-semibold">
      {position}
    </div>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-xl p-6 shadow-md max-w-xs mx-auto w-full">
    <div className="flex items-center justify-between">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="text-2xl font-bold text-gray-800">{value || "-"}</span>
    </div>
  </div>
);

const PlayerCard = ({ player }) => {
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await getPlayerStatistics(Number(player.id));
        setPlayerStats(response.response[0]);
        setLoading(false);
      } catch (error) {
        console.error("İstatistikler yüklenirken hata:", error);
        setLoading(false);
      }
    };

    if (player.id) {
      fetchPlayerStats();
    }
  }, [player.id]);

  const stats = [
    { label: "Maç Sayısı", value: playerStats?.games?.appearences },
    { label: "Toplam Sayı", value: playerStats?.points?.total },
    { label: "Ortalama Sayı", value: playerStats?.points?.average },
    { label: "Ribaund", value: playerStats?.rebounds?.total },
    { label: "Asist", value: playerStats?.assists?.total },
    { label: "Blok", value: playerStats?.blocks?.total },
  ];

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 w-full">
      <div className="flex flex-col md:flex-row items-center md:space-x-8 mb-8">
        <PlayerAvatar name={player.name} />
        <PlayerInfo
          name={player.name}
          country={player.country}
          position={player.position}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </div>
  );
};

export default PlayerCard;
