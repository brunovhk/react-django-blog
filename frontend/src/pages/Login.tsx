import { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Container,
  Typography,
  Box,
  Card,
} from "@mui/material";
import api from "@/api/api";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "@/components/SnackbarProvider";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) {
      showMessage("Please fill in all required fields.", "warning");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("users/token/", form);
      login(res.data.access);
      showMessage("Login successful!", "success");
      setForm({ username: "", password: "" });
      navigate("/dashboard");
    } catch {
      showMessage("Invalid credentials", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="xs">
        <Card elevation={3} sx={{ p: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              borderLeft: "4px solid",
              borderRight: "4px solid",
              borderColor: "primary.main",
            }}
          >
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              name="username"
              autoComplete="username"
              required
              value={form.username}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              autoComplete="current-password"
              label="Password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, height: 40 }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Link to="/register">Create account here</Link>
            </Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
