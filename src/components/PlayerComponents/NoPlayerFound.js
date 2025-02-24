import React from "react";
import { FaUserSlash } from "react-icons/fa";

const NoPlayerFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <div className="text-center">
        <FaUserSlash className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Oyuncu Bulunamadı
        </h2>
        <p className="text-gray-500">
          Arama kriterlerinize uygun oyuncu bulunamamıştır.
        </p>
      </div>
    </div>
  );
};

export default NoPlayerFound;
