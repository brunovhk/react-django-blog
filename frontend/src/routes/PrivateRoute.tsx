import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

export const PrivateRoute = ({ children }: { children: React.JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};
