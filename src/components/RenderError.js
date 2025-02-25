import { FaExclamationTriangle } from "react-icons/fa";

const renderError = ({ error }) => (
  <div className="p-4 flex justify-center items-center min-h-[300px] bg-gray-50">
    <div className="w-full max-w-lg bg-white border-2 border-red-200 rounded-2xl shadow-lg p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-red-100 p-3 rounded-full">
          <FaExclamationTriangle className="w-8 h-8 text-red-600" />
        </div>
        <div className="flex-1 w-full">
          <div className="flex flex-col items-center justify-center ">
            <p className="text-gray-600 text-center">{error}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default renderError;
