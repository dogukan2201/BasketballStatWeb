import React from "react";
import {
  FaCalendarAlt,
  FaBasketballBall,
  FaUsers,
  FaTrash,
  FaFilter,
  FaSlidersH,
} from "react-icons/fa";

const Sidebar = ({ isOpen, filters, onFilterChange, onClearFilters }) => {
  return (
    <aside
      className={`bg-slate-800 text-white w-64 min-h-screen transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed z-20`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FaSlidersH className="mr-2" />
          Filtreler
        </h2>

        <div className="space-y-4">
          <div>
            <label className=" text-sm mb-2 flex items-center">
              <FaCalendarAlt className="mr-2" />
              Tarih
            </label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={onFilterChange}
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className=" text-sm mb-2 flex items-center">
              <FaBasketballBall className="mr-2" />
              Lig
            </label>
            <select
              name="league"
              value={filters.league}
              onChange={onFilterChange}
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tüm Ligler</option>
              <option value="superlig">Süper Lig</option>
              <option value="premierleague">Premier Lig</option>
              <option value="laliga">La Liga</option>
              <option value="bundesliga">Bundesliga</option>
            </select>
          </div>

          <div>
            <label className=" text-sm mb-2 flex items-center">
              <FaUsers className="mr-2" />
              Takım
            </label>
            <input
              type="text"
              name="team"
              value={filters.team}
              onChange={onFilterChange}
              placeholder="Takım ara..."
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className=" text-sm mb-2 flex items-center">
              <FaFilter className="mr-2" />
              Durum
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={onFilterChange}
              className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tümü</option>
              <option value="active">Aktif</option>
              <option value="completed">Tamamlandı</option>
              <option value="upcoming">Yaklaşan</option>
            </select>
          </div>

          <button
            onClick={onClearFilters}
            className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors flex items-center justify-center"
          >
            <FaTrash className="mr-2" />
            Filtreleri Temizle
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
