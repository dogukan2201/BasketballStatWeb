import React from "react";
import { FaBell } from "react-icons/fa";

const MobilMenu = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <div className="hidden md:flex items-center">
        <button className="p-2 rounded-full text-gray-300 hover:bg-slate-700 hover:text-white focus:outline-none">
          <FaBell className="h-6 w-6" />
        </button>
        <div className="ml-3 relative">
          <button className="flex items-center max-w-xs rounded-full text-sm focus:outline-none hover:bg-slate-700 p-2">
            <span className="sr-only">Kullanıcı menüsü</span>
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-slate-900 hover:bg-slate-700"
          >
            Anasayfa
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-slate-700 hover:text-white"
          >
            Hakkımızda
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-slate-700 hover:text-white"
          >
            İletişim
          </a>
        </div>
        <div className="pt-4 pb-3 border-t border-slate-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">Kullanıcı</div>
            </div>
            <button className="ml-auto p-2 rounded-full text-gray-300 hover:bg-slate-700 hover:text-white focus:outline-none">
              <FaBell className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobilMenu;
