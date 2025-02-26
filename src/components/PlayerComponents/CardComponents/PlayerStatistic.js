import React, { useState, useEffect } from "react";
import { getPlayerStatistics } from "../../../services/api";
import renderLoading from "../../RenderLoading";
import renderError from "../../RenderError";
import RenderNotFound from "../../RenderNotFound";
import { Pagination } from "./StatisticComponents/Pagination";
import PlayerHeader from "./StatisticComponents/PlayerHeader";
import BasicStats from "./StatisticComponents/BasicStats";
import ShotStats from "./StatisticComponents/ShotStats";
import FreeThrowStats from "./StatisticComponents/FreeThrowStats";
const ITEMS_PER_PAGE = 4;

const StatisticCard = ({ stat }) => (
  <div className="bg-white rounded-xl p-6 ">
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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getPlayerStatistics(id, player, season);

        if (!response) {
          setError("No response from server");
        }

        if (response?.errors) {
          setError(Object.values(response.errors).join(", "));
        }

        const statsData = response?.response || [];
        setStatistics(Array.isArray(statsData) ? statsData : [statsData]);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message || "An error occurred while loading statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerStats();
  }, [player, id, season]);

  if (loading) return renderLoading();
  if (error) return renderError(error);
  if (!statistics || statistics.length === 0) return <RenderNotFound />;

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = statistics.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(statistics.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">
        Player Statistics
      </h2>

      <div className="grid grid-cols-1 gap-8">
        {currentItems.map((stat, index) => (
          <StatisticCard key={index} stat={stat} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PlayerStatistic;
