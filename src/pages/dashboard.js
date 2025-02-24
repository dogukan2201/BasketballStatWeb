import React, { useState } from "react";
import Header from "../components/DashboardComponents/Header";
import Footer from "../components/DashboardComponents/Footer";
import Sidebar from "../components/DashboardComponents/Sidebar";
import Teams from "../components/TeamComponents/main";
import Players from "../components/PlayerComponents/main";
import PlayerSidebar from "../components/PlayerComponents/PlayerSidebar";
import { useLocation } from "react-router-dom";
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("filters");
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          season: "",
          league: "",
        };
  });

  const [playerFilters, setPlayerFilters] = useState(() => {
    const savedPlayerFilters = localStorage.getItem("playerFilters");
    return savedPlayerFilters
      ? JSON.parse(savedPlayerFilters)
      : {
          search: "",
          team: "",
          season: "",
        };
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    localStorage.setItem("filters", JSON.stringify(newFilters));
  };

  const handlePlayerFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...playerFilters,
      [name]: value,
    };
    setPlayerFilters(newFilters);
    localStorage.setItem("playerFilters", JSON.stringify(newFilters));
  };

  const clearFilters = () => {
    const emptyFilters = {
      season: "",
      league: "",
    };
    setFilters(emptyFilters);
    localStorage.removeItem("filters");
  };

  const clearPlayerFilters = () => {
    const emptyFilters = {
      search: "",
      team: "",
      season: "",
    };
    setPlayerFilters(emptyFilters);
    localStorage.removeItem("playerFilters");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex flex-1">
        {useLocation().pathname === "/dashboard/teams" && (
          <Sidebar
            isOpen={isSidebarOpen}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
        )}
        {useLocation().pathname === "/dashboard/players" && (
          <PlayerSidebar
            isOpen={isSidebarOpen}
            filters={playerFilters}
            onFilterChange={handlePlayerFilterChange}
            onClearFilters={clearPlayerFilters}
          />
        )}
        <main className="flex-1 p-4 mt-16">
          <div className="max-w-7xl mx-auto">
            {useLocation().pathname === "/dashboard/teams" && (
              <Teams season={filters.season} league={filters.league} />
            )}
            {useLocation().pathname === "/dashboard/players" && (
              <Players
                search={playerFilters.search}
                team={playerFilters.team}
                season={playerFilters.season}
              />
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
