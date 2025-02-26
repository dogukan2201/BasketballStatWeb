import React from "react";

const calculatePercentage = (total, attempts) => {
  if (!attempts) return 0;
  return (total / attempts) * 100;
};

const ProgressBar = ({ value = 0, total = 0, color }) => {
  const percentage = calculatePercentage(value, total);
  return (
    <div className="flex items-center">
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="ml-2 text-sm font-medium">
        {value}/{total}
      </span>
    </div>
  );
};

export default ProgressBar;
