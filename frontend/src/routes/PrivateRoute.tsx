import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { CircularProgress, Box } from "@mui/material";

export const PrivateRoute = ({ children }: { children: React.JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};
