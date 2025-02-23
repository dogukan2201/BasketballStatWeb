import React from "react";

const MobilMenu = ({ isOpen }) => {
  const menuItems = [
    { name: "Teams", href: "/dashboard/teams", current: true },
    { name: "Players", href: "/dashboard/players", current: false },
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
