import React from "react";

const StatItem = ({ label, value, size = "text-xl" }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600">{label}</span>
    <span className={`${size} font-bold text-blue-700`}>{value}</span>
  </div>
);

export default StatItem;
