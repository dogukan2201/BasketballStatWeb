import React, { useState } from "react";
import Header from "../components/DashboardComponents/Header";
import Footer from "../components/DashboardComponents/Footer";
import TeamsSidebar from "../components/TeamComponents/TeamsSidebar";
import Teams from "../components/TeamComponents/main";
import Players from "../components/PlayerComponents/main";
import PlayerSidebar from "../components/PlayerComponents/PlayerSidebar";
import { INITIAL_TEAM_FILTERS, INITIAL_PLAYER_FILTERS } from "../constants";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [teamFilters, setTeamFilters] = useState(() => {
    const savedFilters = localStorage.getItem("TeamFilters");
    return savedFilters ? JSON.parse(savedFilters) : INITIAL_TEAM_FILTERS;
  });

  const [playerFilters, setPlayerFilters] = useState(() => {
    const savedPlayerFilters = localStorage.getItem("playerFilters");
    return savedPlayerFilters
      ? JSON.parse(savedPlayerFilters)
      : INITIAL_PLAYER_FILTERS;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...teamFilters, [name]: value };
    setTeamFilters(newFilters);
    localStorage.setItem("TeamFilters", JSON.stringify(newFilters));
  };

  const handlePlayerFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...playerFilters, [name]: value };
    setPlayerFilters(newFilters);
    localStorage.setItem("playerFilters", JSON.stringify(newFilters));
  };

  const clearTeamFilters = () => {
    setTeamFilters(INITIAL_TEAM_FILTERS);
    localStorage.removeItem("TeamFilters");
  };

  const clearPlayerFilters = () => {
    setPlayerFilters(INITIAL_PLAYER_FILTERS);
    localStorage.removeItem("playerFilters");
  };

  const renderSidebar = () => {
    if (location.pathname === "/dashboard/teams") {
      return (
        <TeamsSidebar
          isOpen={isSidebarOpen}
          filters={teamFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearTeamFilters}
        />
      );
    }
    if (location.pathname === "/dashboard/players") {
      return (
        <PlayerSidebar
          isOpen={isSidebarOpen}
          filters={playerFilters}
          onFilterChange={handlePlayerFilterChange}
          onClearFilters={clearPlayerFilters}
        />
      );
    }
    return null;
  };

  const renderContent = () => {
    if (location.pathname === "/dashboard/teams") {
      return <Teams {...teamFilters} />;
    }
    if (location.pathname === "/dashboard/players") {
      return <Players {...playerFilters} />;
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex flex-1">
        {renderSidebar()}
        <main className="flex-1 p-4 mt-16">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
