import React from "react";
import { IoMdClose } from "react-icons/io";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full mx-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <IoMdClose size={24} className="text-gray-600 hover:text-gray-800" />
        </button>
        <div className="max-h-[90vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
