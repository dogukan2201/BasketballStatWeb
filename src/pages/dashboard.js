import React, { useState } from "react";
import Header from "../components/DashboardComponents/Header";
import Footer from "../components/DashboardComponents/Footer";
import TeamsSidebar from "../components/TeamComponents/TeamsSidebar";
import Teams from "../components/TeamComponents/main";
import Players from "../components/PlayerComponents/main";
import PlayerSidebar from "../components/PlayerComponents/PlayerSidebar";
import Games from "../components/GameComponents/main";
import GamesSidebar from "../components/GameComponents/GamesSidebar";
import Leagues from "../components/LeagueComponents/main";
import LeaguesSidebar from "../components/LeagueComponents/LeaguesSidebar";
import { useFilters } from "../hooks/useFilters";
import Hub from "./hub";
import {
  INITIAL_TEAM_FILTERS,
  INITIAL_PLAYER_FILTERS,
  INITIAL_GAME_FILTERS,
  INITIAL_LEAGUE_FILTERS,
} from "../constants";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const {
    filters: teamFilters,
    handleFilterChange: handleTeamFilterChange,
    clearFilters: clearTeamFilters,
  } = useFilters(INITIAL_TEAM_FILTERS, "TeamFilters");

  const {
    filters: playerFilters,
    handleFilterChange: handlePlayerFilterChange,
    clearFilters: clearPlayerFilters,
  } = useFilters(INITIAL_PLAYER_FILTERS, "playerFilters");

  const {
    filters: gameFilters,
    handleFilterChange: handleGameFilterChange,
    clearFilters: clearGameFilters,
  } = useFilters(INITIAL_GAME_FILTERS, "gameFilters");

  const {
    filters: leagueFilters,
    handleFilterChange: handleLeagueFilterChange,
    clearFilters: clearLeagueFilters,
  } = useFilters(INITIAL_LEAGUE_FILTERS, "leagueFilters");

  const COMPONENT_MAP = {
    "/dashboard/teams": {
      Sidebar: TeamsSidebar,
      Main: Teams,
      filters: teamFilters,
      handleFilterChange: handleTeamFilterChange,
      clearFilters: clearTeamFilters,
    },
    "/dashboard/players": {
      Sidebar: PlayerSidebar,
      Main: Players,
      filters: playerFilters,
      handleFilterChange: handlePlayerFilterChange,
      clearFilters: clearPlayerFilters,
    },
    "/dashboard/games": {
      Sidebar: GamesSidebar,
      Main: Games,
      filters: gameFilters,
      handleFilterChange: handleGameFilterChange,
      clearFilters: clearGameFilters,
    },
    "/dashboard/leagues": {
      Sidebar: LeaguesSidebar,
      Main: Leagues,
      filters: leagueFilters,
      handleFilterChange: handleLeagueFilterChange,
      clearFilters: clearLeagueFilters,
    },
  };

  const currentComponent = COMPONENT_MAP[location.pathname];

  const renderSidebar = () => {
    if (!currentComponent) {
      return null;
    }

    const { Sidebar } = currentComponent;
    return (
      <Sidebar
        isOpen={isSidebarOpen}
        filters={currentComponent.filters}
        onFilterChange={currentComponent.handleFilterChange}
        onClearFilters={currentComponent.clearFilters}
      />
    );
  };

  const renderContent = () => {
    if (!currentComponent) {
      return <Hub />;
    }
    const { Main } = currentComponent;
    return <Main {...currentComponent.filters} />;
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
