import React from "react";
import { FaUserSlash } from "react-icons/fa";

const NotFoundStatistic = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="text-center bg-white rounded-lg shadow-md p-8 max-w-md">
        <FaUserSlash className="mx-auto h-20 w-20 text-blue-500 mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          İstatistik Bulunamadı
        </h2>
        <p className="text-gray-600 text-lg">
          Seçilen kriterlere uygun istatistik kaydı bulunmamaktadır.
        </p>
      </div>
    </div>
  );
};

export default NotFoundStatistic;
