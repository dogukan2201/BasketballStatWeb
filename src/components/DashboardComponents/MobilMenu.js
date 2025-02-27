import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { authService } from "../../services/auth";

const MobilMenu = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

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
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-slate-700 hover:text-white"
        >
          <FaSignOutAlt className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default MobilMenu;
