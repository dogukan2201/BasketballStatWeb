import React from "react";

const StatCard = ({ title, children, gradient }) => (
  <div className={`bg-gradient-to-br ${gradient} p-4 rounded-lg`}>
    <h4 className={`text-lg font-semibold ${title.color} mb-4`}>
      {title.text}
    </h4>
    {children}
  </div>
);

export default StatCard;
