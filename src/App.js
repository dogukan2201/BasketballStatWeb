import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Hub from "./pages/hub";
import { authService } from "./services/auth";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/authContext";
import { LeagueProvider } from "./context/LeagueContext";

function App() {
  useEffect(() => {
    authService.storeApiKey();
  }, []);

  return (
    <AuthProvider>
      <LeagueProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/hub"
                element={
                  <PrivateRoute>
                    <Hub />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/*"
                element={
                  <PrivateRoute>
                    <Routes>
                      <Route index element={<Dashboard />} />
                      <Route path="teams" element={<Dashboard />} />
                      <Route path="games" element={<Dashboard />} />
                      <Route path="players" element={<Dashboard />} />
                      <Route path="leagues" element={<Dashboard />} />
                    </Routes>
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </LeagueProvider>
    </AuthProvider>
  );
}

export default App;
