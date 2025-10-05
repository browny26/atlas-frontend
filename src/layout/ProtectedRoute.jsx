import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { dotPulse } from "ldrs";
dotPulse.register();

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading)
    return (
      <div className="h-dvh w-full flex items-center justify-center">
        <l-dot-pulse size="43" speed="1.3" color="black"></l-dot-pulse>
      </div>
    ); // o uno spinner

  if (!user) return <Navigate to="/signin" replace />;

  return children;
};
