import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PrivateRoute;
