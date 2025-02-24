import { FaExclamationTriangle } from "react-icons/fa";

const renderError = ({ error }) => (
  <div className="p-8 flex justify-center items-center min-h-[300px] bg-gray-50">
    <div className="max-w-lg w-full bg-white border border-red-100 rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.02]">
      <div className="flex items-start gap-4">
        <div className="bg-red-50 p-3 rounded-full">
          <FaExclamationTriangle className="w-8 h-8 text-red-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Hata Oluştu</h3>
          <p className="text-gray-600 leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Yeniden Dene
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default renderError;
