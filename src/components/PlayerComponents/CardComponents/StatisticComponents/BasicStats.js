import React from "react";
import StatCard from "./StatCard";
import StatItem from "./StatItem";

const DEFAULT_VALUES = {
  points: 0,
  assists: 0,
  minutes: "0:00",
};

const BasicStats = ({ stats }) => (
  <StatCard
    title={{ text: "Basic Statistics", color: "text-blue-800" }}
    gradient="from-blue-50 to-white"
  >
    <div className="space-y-3">
      <StatItem label="Points" value={stats?.points || DEFAULT_VALUES.points} />
      <StatItem
        label="Assists"
        value={stats?.assists || DEFAULT_VALUES.assists}
      />
      <StatItem
        label="Rebounds"
        value={stats?.rebounds?.total || DEFAULT_VALUES.points}
      />
      <StatItem
        label="Minutes"
        value={stats?.minutes || DEFAULT_VALUES.minutes}
      />
    </div>
  </StatCard>
);

export default BasicStats;
