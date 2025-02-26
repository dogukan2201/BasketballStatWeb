const TableHeader = () => {
  const headerItems = [
    { id: "rank", label: "#", className: "" },
    { id: "team", label: "Team", className: "min-w-[120px] sm:min-w-[150px]" },
    { id: "played", label: "P", className: "" },
    { id: "won", label: "W", className: "" },
    { id: "lost", label: "L", className: "" },
    { id: "percentage", label: "%", className: "" },
    { id: "gf", label: "GF", className: "hidden sm:table-cell" },
    { id: "ga", label: "GA", className: "hidden sm:table-cell" },
  ];

  return (
    <thead>
      <tr className="border-b border-gray-200">
        {headerItems.map((item) => (
          <th
            key={item.id}
            className={`p-2 sm:p-3 text-left bg-gray-50 font-semibold text-gray-600 text-xs sm:text-sm" ${item.className}`}
          >
            {item.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
