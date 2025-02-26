import React, { useState, useEffect } from "react";
import { getPlayerStatistics } from "../../../services/api";
import renderLoading from "../../RenderLoading";
import renderError from "../../RenderError";
import NotFoundStatistic from "./NotFoundStatistic";

const StatCard = ({ title, children, gradient }) => (
  <div className={`bg-gradient-to-br ${gradient} p-4 rounded-lg`}>
    <h4 className={`text-lg font-semibold ${title.color} mb-4`}>
      {title.text}
    </h4>
    {children}
  </div>
);

const ProgressBar = ({ value, total, color }) => {
  const percentage = total ? (value / total) * 100 : 0;
  return (
    <div className="flex items-center">
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="ml-2 text-sm font-medium">
        {value || 0}/{total || 0}
      </span>
    </div>
  );
};

const StatItem = ({ label, value, size = "text-xl" }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600">{label}</span>
    <span className={`${size} font-bold text-blue-700`}>{value}</span>
  </div>
);

const PlayerHeader = ({ player, type, gameId, teamId }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-200">
    <div>
      <h3 className="text-2xl font-bold text-blue-700 mb-2">
        {player?.name || "N/A"}
      </h3>
      <p className="text-gray-600">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {type || "N/A"}
        </span>
      </p>
    </div>
    <div className="mt-4 md:mt-0">
      <p className="text-gray-600">
        Maç ID: <span className="font-semibold">{gameId || "N/A"}</span>
      </p>
      <p className="text-gray-600">
        Takım ID: <span className="font-semibold">{teamId || "N/A"}</span>
      </p>
    </div>
  </div>
);

const BasicStats = ({ stats }) => (
  <StatCard
    title={{ text: "Temel İstatistikler", color: "text-blue-800" }}
    gradient="from-blue-50 to-white"
  >
    <div className="space-y-3">
      <StatItem label="Sayı" value={stats?.points || 0} />
      <StatItem label="Asist" value={stats?.assists || 0} />
      <StatItem label="Ribaund" value={stats?.rebounds?.total || 0} />
      <StatItem label="Süre" value={stats?.minutes || "0:00"} />
    </div>
  </StatCard>
);

const ShotStats = ({ stats }) => (
  <StatCard
    title={{ text: "2'lik ve 3'lük Atışlar", color: "text-green-800" }}
    gradient="from-green-50 to-white"
  >
    <div className="space-y-4">
      <div>
        <p className="text-gray-600 mb-1">2'lik Atışlar</p>
        <ProgressBar
          value={stats?.field_goals?.total}
          total={stats?.field_goals?.attempts}
          color="bg-green-500"
        />
      </div>
      <div>
        <p className="text-gray-600 mb-1">3'lük Atışlar</p>
        <ProgressBar
          value={stats?.threepoint_goals?.total}
          total={stats?.threepoint_goals?.attempts}
          color="bg-green-500"
        />
      </div>
    </div>
  </StatCard>
);

const FreeThrowStats = ({ stats }) => {
  const percentage = stats?.freethrows_goals?.percentage
    ? `%${stats.freethrows_goals.percentage}`
    : stats?.freethrows_goals?.attempts
    ? `%${(
        (stats.freethrows_goals.total / stats.freethrows_goals.attempts) *
        100
      ).toFixed(1)}`
    : "%0";

  return (
    <StatCard
      title={{ text: "Serbest Atışlar", color: "text-purple-800" }}
      gradient="from-purple-50 to-white"
    >
      <div className="space-y-3">
        <div>
          <p className="text-gray-600 mb-1">İsabetli/Deneme</p>
          <ProgressBar
            value={stats?.freethrows_goals?.total}
            total={stats?.freethrows_goals?.attempts}
            color="bg-purple-500"
          />
        </div>
        <div className="mt-4">
          <p className="text-gray-600">Yüzde</p>
          <p className="text-2xl font-bold text-purple-700">{percentage}</p>
        </div>
      </div>
    </StatCard>
  );
};

const StatisticCard = ({ stat }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <PlayerHeader
      player={stat?.player}
      type={stat?.type}
      gameId={stat?.game?.id}
      teamId={stat?.team?.id}
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BasicStats stats={stat} />
      <ShotStats stats={stat} />
      <FreeThrowStats stats={stat} />
    </div>
  </div>
);

const PlayerStatistic = ({ player, id, season }) => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getPlayerStatistics(id, player, season);

        if (!response) {
          setError("Sunucudan yanıt alınamadı");
        }
        if (response?.errors) {
          setError(Object.values(response.errors).join(", "));
        }

        const statsData = response?.response || [];
        setStatistics(Array.isArray(statsData) ? statsData : [statsData]);
      } catch (err) {
        console.error("API Hatası:", err);
        setError(err.message || "İstatistikler yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerStats();
  }, [player, id, season]);

  if (loading) return renderLoading();
  if (error) return renderError(error);
  if (!statistics || statistics.length === 0) return <NotFoundStatistic />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Oyuncu İstatistikleri
      </h2>
      <div className="grid grid-cols-1 gap-8">
        {statistics.map((stat, index) => (
          <StatisticCard key={index} stat={stat} />
        ))}
      </div>
    </div>
  );
};

export default PlayerStatistic;
