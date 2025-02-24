import { FaSpinner } from "react-icons/fa";

const renderLoading = () => {
  return (
    <div className="p-8 flex justify-center items-center min-h-[300px] bg-gray-50">
      <div className="max-w-lg w-full bg-white border border-blue-100 rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.02]">
        <div className="flex items-center gap-6">
          <div className="bg-blue-50 p-4 rounded-full">
            <FaSpinner className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Yükleniyor</h3>
            <p className="text-gray-600">Lütfen bekleyiniz...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default renderLoading;
