import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { useSnackbar } from "@/components/SnackbarProvider";
import Logo from "@/assets/logo.png";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();

  const handleLogout = () => {
    logout();
    navigate("/");
    showMessage("Logout successful!", "success");
  };

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ bgcolor: "white", color: "primary.main", boxShadow: 1 }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{ height: 40, width: "auto", mr: 1 }}
            />
          </Link>
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
