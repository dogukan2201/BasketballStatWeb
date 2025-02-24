import React from "react";
import { FaSearchMinus } from "react-icons/fa";

const NoTeamsFound = () => {
  return (
    <div className="p-8 flex justify-center items-center min-h-[300px] bg-gray-50">
      <div className="max-w-lg w-full bg-white border border-gray-100 rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.02]">
        <div className="flex items-center gap-6">
          <div className="bg-gray-50 p-4 rounded-full">
            <FaSearchMinus className="w-10 h-10 text-gray-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Sonuç Bulunamadı
            </h3>
            <p className="text-gray-600">
              Aradığınız kriterlere uygun takım bulunamadı. Lütfen farklı bir
              arama terimi deneyin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoTeamsFound;
