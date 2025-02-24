import React from "react";

const TableView = ({ players, sortConfig, onSort, onPlayerSelect }) => {
  const { field: sortField, direction: sortDirection } = sortConfig;

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["country", "name", "id"].map((field) => (
                <th
                  key={field}
                  className="text-left p-3 whitespace-nowrap cursor-pointer hover:bg-gray-200 transition-colors duration-200 text-sm"
                  onClick={() => onSort(field)}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {sortField === field &&
                    (sortDirection === "asc" ? " ↑" : " ↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {players.map((player) => (
              <tr
                key={player.id}
                className="hover:bg-blue-200 cursor-pointer"
                onClick={() => onPlayerSelect(player)}
              >
                <td className="p-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{player.country}</span>
                  </div>
                </td>
                <td className="p-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{player.name}</span>
                  </div>
                </td>
                <td className="p-3 whitespace-nowrap text-sm">{player.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableView;
