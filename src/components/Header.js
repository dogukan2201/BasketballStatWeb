import React, { useState } from "react";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Anasayfa", href: "#", current: true },
    { name: "Hakkımızda", href: "#", current: false },
    { name: "İletişim", href: "#", current: false },
  ];

  const renderMenuItem = (item) => {
    const baseClasses = "px-3 py-2 rounded-md text-sm font-medium";
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
    <nav className="bg-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">Arfitect</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map(renderMenuItem)}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <button
              className="p-2 rounded-full text-gray-300 hover:bg-slate-700 hover:text-white focus:outline-none"
              aria-label="Bildirimler"
            >
              <FaBell className="h-6 w-6" />
            </button>
            <div className="ml-3 relative">
              <button
                className="flex items-center max-w-xs rounded-full text-sm focus:outline-none hover:bg-slate-700 p-2"
                aria-label="Kullanıcı menüsü"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Kullanıcı profil fotoğrafı"
                />
              </button>
            </div>
          </div>

          {/* Mobil menü butonu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Ana menüyü aç</span>
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map(renderMobileMenuItem)}
          </div>
          <div className="pt-4 pb-3 border-t border-slate-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Kullanıcı profil fotoğrafı"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">
                  Kullanıcı
                </div>
              </div>
              <button
                className="ml-auto p-2 rounded-full text-gray-300 hover:bg-slate-700 hover:text-white focus:outline-none"
                aria-label="Bildirimler"
              >
                <FaBell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
