import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>; // o uno spinner

  if (!user) return <Navigate to="/signin" replace />;

  return children;
};
