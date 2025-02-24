import React from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";

function MobilMenuButton({ isOpen, setIsOpen }) {
  return (
    <>
      <div className="hidden md:flex items-center">
        <div className="ml-3 relative">
          <FaUser className="h-10 w-10 p-1 rounded-full bg-gray-600" />
        </div>
      </div>
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400"
        >
          {isOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>
        <div className="ml-4 relative">
          <FaUser className="h-8 w-8 p-1 rounded-full bg-gray-600" />
        </div>
      </div>
    </>
  );
}

export default MobilMenuButton;
