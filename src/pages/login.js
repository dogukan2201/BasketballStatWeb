import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth";
import renderLoading from "../components/RenderLoading";
import {
  AiOutlineLock,
  AiOutlineKey,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const Login = () => {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const isLoggedIn = authService.login(apiKey);

      if (isLoggedIn) {
        navigate("/hub");
      } else {
        setError("Invalid API Key");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-indigo-100">
            <AiOutlineLock className="h-8 w-8 text-slate-800" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Login to the System
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter your API key to continue
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AiOutlineKey className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
              className="appearance-none rounded-lg pl-10 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none "
              placeholder="Enter your API key"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-4 border border-red-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AiOutlineCloseCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={
                "relative w-full flex justify-center py-3 px-4 bg-slate-800 border border-transparent text-sm font-medium rounded-lg text-white "
              }
            >
              {loading && (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {renderLoading()}
                </span>
              )}
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
