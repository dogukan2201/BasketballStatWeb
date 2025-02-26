import React from "react";
import StatCard from "./StatCard";
import ProgressBar from "./ProgressBar";

const calculateFreeThrowPercentage = (stats) => {
  if (!stats?.freethrows_goals) return "%0";

  const { percentage, total, attempts } = stats.freethrows_goals;
  if (percentage) return `%${percentage}`;
  if (attempts) return `%${((total / attempts) * 100).toFixed(1)}`;
  return "%0";
};

const FreeThrowStats = ({ stats }) => (
  <StatCard
    title={{ text: "Free Throws", color: "text-purple-800" }}
    gradient="from-purple-50 to-white"
  >
    <div className="space-y-3">
      <div>
        <p className="text-gray-600 mb-1">Made/Attempted</p>
        <ProgressBar
          value={stats?.freethrows_goals?.total}
          total={stats?.freethrows_goals?.attempts}
          color="bg-purple-500"
        />
      </div>
      <div className="mt-4">
        <p className="text-gray-600">Percentage</p>
        <p className="text-2xl font-bold text-purple-700">
          {calculateFreeThrowPercentage(stats)}
        </p>
      </div>
    </div>
  </StatCard>
);

export default FreeThrowStats;
