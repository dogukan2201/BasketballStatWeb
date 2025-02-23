import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { authService } from "./services/auth";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/authContext";

function App() {
  useEffect(() => {
    authService.storeApiKey();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route path="/dashboard/*" element={<Dashboard />}>
              <Route path="teams" element={<Dashboard />} />
              <Route path="players" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
