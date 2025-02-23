import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Teams from "../components/Teams";
import Players from "../components/Players";
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    localStorage.setItem("filters", JSON.stringify(newFilters));
  };

  const clearFilters = () => {
    const emptyFilters = {
      season: "",
      league: "",
    };
    setFilters(emptyFilters);
    localStorage.removeItem("filters");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
        <main className="flex-1 p-4 mt-16">
          <div className="max-w-7xl mx-auto">
            {useLocation().pathname === "/dashboard/teams" && (
              <Teams season={filters.season} league={filters.league} />
            )}
            {useLocation().pathname === "/dashboard/players" && <Players />}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
