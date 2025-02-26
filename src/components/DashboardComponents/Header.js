import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MobilMenu from "./MobilMenu";
import MobilMenuButton from "./MobilMenuButton";
import NavbarMenuItems from "./NavbarMenuItems";
import { useLocation } from "react-router-dom";

export default function Header({ isSidebarOpen, setIsSidebarOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuItems = [
    {
      name: "Teams",
      href: "/dashboard/teams",
      current: location.pathname === "/dashboard/teams",
    },
    {
      name: "Players",
      href: "/dashboard/players",
      current: location.pathname === "/dashboard/players",
    },
    {
      name: "Games",
      href: "/dashboard/games",
      current: location.pathname === "/dashboard/games",
    },
    {
      name: "Leagues",
      href: "/dashboard/leagues",
      current: location.pathname === "/dashboard/leagues",
    },
  ];
  return (
    <nav className="bg-slate-800 text-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none transition-all duration-300 ease-in-out"
            >
              {isSidebarOpen ? (
                <FaChevronLeft className="h-5 w-5" />
              ) : (
                <FaChevronRight className="h-5 w-5" />
              )}
            </button>
            <img
              src="/assets/logo.svg"
              alt="Arfitect Logo"
              className="h-10 w-auto max-w-[140px] object-contain"
            />
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                {menuItems.map((item, index) => (
                  <NavbarMenuItems key={index} item={item} />
                ))}
              </div>
            </div>
          </div>
          <MobilMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <MobilMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </nav>
  );
}
