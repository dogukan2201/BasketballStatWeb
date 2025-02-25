import React from "react";
import { FaFrown } from "react-icons/fa";

function NoLeaguesFound() {
  return (
    <div className="text-center py-12">
      <FaFrown className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">Lig Bulunamadı</h3>
      <p className="mt-1 text-sm text-gray-500">
        Aradığınız kriterlere uygun lig bulunamadı.
      </p>
    </div>
  );
}

export default NoLeaguesFound;
