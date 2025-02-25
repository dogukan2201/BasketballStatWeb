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

  const [gameFilters, setGameFilters] = useState(() => {
    const savedGameFilters = localStorage.getItem("gameFilters");
    return savedGameFilters
      ? JSON.parse(savedGameFilters)
      : INITIAL_GAME_FILTERS;
  });

  const [leagueFilters, setLeagueFilters] = useState(() => {
    const savedLeagueFilters = localStorage.getItem("leagueFilters");
    return savedLeagueFilters
      ? JSON.parse(savedLeagueFilters)
      : INITIAL_LEAGUE_FILTERS;
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

  const handleGameFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...gameFilters, [name]: value };
    setGameFilters(newFilters);
    localStorage.setItem("gameFilters", JSON.stringify(newFilters));
  };

  const handleLeagueFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...leagueFilters, [name]: value };
    setLeagueFilters(newFilters);
    localStorage.setItem("leagueFilters", JSON.stringify(newFilters));
  };

  const clearTeamFilters = () => {
    setTeamFilters(INITIAL_TEAM_FILTERS);
    localStorage.removeItem("TeamFilters");
  };

  const clearPlayerFilters = () => {
    setPlayerFilters(INITIAL_PLAYER_FILTERS);
    localStorage.removeItem("playerFilters");
  };

  const clearGameFilters = () => {
    setGameFilters(INITIAL_GAME_FILTERS);
    localStorage.removeItem("gameFilters");
  };

  const clearLeagueFilters = () => {
    setLeagueFilters(INITIAL_LEAGUE_FILTERS);
    localStorage.removeItem("leagueFilters");
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
    if (location.pathname === "/dashboard/games") {
      return (
        <GamesSidebar
          isOpen={isSidebarOpen}
          filters={gameFilters}
          onFilterChange={handleGameFilterChange}
          onClearFilters={clearGameFilters}
        />
      );
    }
    if (location.pathname === "/dashboard/leagues") {
      return (
        <LeaguesSidebar
          isOpen={isSidebarOpen}
          filters={leagueFilters}
          onFilterChange={handleLeagueFilterChange}
          onClearFilters={clearLeagueFilters}
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
    if (location.pathname === "/dashboard/games") {
      return <Games {...gameFilters} />;
    }
    if (location.pathname === "/dashboard/leagues") {
      return <Leagues {...leagueFilters} />;
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
