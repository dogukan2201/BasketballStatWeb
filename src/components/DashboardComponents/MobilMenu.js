import React from "react";
import { useLocation } from "react-router-dom";

const MobilMenu = ({ isOpen }) => {
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
  const renderMobileMenuItem = (item) => {
    const baseClasses = "block px-3 py-2 rounded-md text-base font-medium";
    const activeClasses = "text-white bg-slate-900 hover:bg-slate-700";
    const inactiveClasses = "text-gray-300 hover:bg-slate-700 hover:text-white";

    return (
      <a
        key={item.name}
        href={item.href}
        className={`${baseClasses} ${
          item.current ? activeClasses : inactiveClasses
        }`}
      >
        {item.name}
      </a>
    );
  };
  return (
    <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {menuItems.map(renderMobileMenuItem)}
      </div>
    </div>
  );
};

export default MobilMenu;
