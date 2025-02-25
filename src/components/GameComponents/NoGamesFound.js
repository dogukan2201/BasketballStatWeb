import React from "react";

function NoGamesFound() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="text-xl font-semibold text-gray-700 mb-2">
        Maç Bulunamadı
      </div>
      <p className="text-gray-500 text-center">
        Seçilen kriterlere uygun maç bulunamadı. Lütfen farklı bir sezon veya
        lig seçin.
      </p>
    </div>
  );
}

export default NoGamesFound;
