import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    date: "",
    league: "",
    team: "",
    status: "all",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed md:hidden z-30 top-20 left-4 p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <Sidebar
          isOpen={isSidebarOpen}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={() =>
            setFilters({
              date: "",
              league: "",
              team: "",
              status: "all",
            })
          }
        />

        {/* Ana içerik alanı */}
        <main className="flex-1 p-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Dashboard İçeriği</h2>
            {/* Veri içeriği buraya gelecek */}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
