import React from "react";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full mx-4">
        <div className="text-center">
          <div className="mb-6">
            <h1 className="text-8xl font-extrabold text-slate-800 mb-2">404</h1>
            <div className="h-2 w-24 bg-slate-800 mx-auto rounded-full mb-8"></div>
          </div>
          <h2 className="text-3xl font-bold text-slate-700 mb-4">Sorry!</h2>
          <p className="text-xl text-gray-600 mb-8">
            The page you are looking for cannot be found.
          </p>
          <Link
            to="/hub"
            className="inline-flex items-center px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transform hover:scale-105 transition-all duration-200 shadow-md"
          >
            <HiHome className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
