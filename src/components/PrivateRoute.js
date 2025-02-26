import { Navigate } from "react-router-dom";
import { authService } from "../services/auth";

function PrivateRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
