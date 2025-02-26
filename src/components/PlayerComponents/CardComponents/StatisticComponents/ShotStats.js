import React from "react";
import StatCard from "./StatCard";
import ProgressBar from "./ProgressBar";

const ShotStats = ({ stats }) => (
  <StatCard
    title={{ text: "2-Point and 3-Point Shots", color: "text-green-800" }}
    gradient="from-green-50 to-white"
  >
    <div className="space-y-4">
      <div>
        <p className="text-gray-600 mb-1">2-Point Shots</p>
        <ProgressBar
          value={stats?.field_goals?.total}
          total={stats?.field_goals?.attempts}
          color="bg-green-500"
        />
      </div>
      <div>
        <p className="text-gray-600 mb-1">3-Point Shots</p>
        <ProgressBar
          value={stats?.threepoint_goals?.total}
          total={stats?.threepoint_goals?.attempts}
          color="bg-green-500"
        />
      </div>
    </div>
  </StatCard>
);

export default ShotStats;
