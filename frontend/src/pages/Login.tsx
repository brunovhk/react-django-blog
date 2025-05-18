import { useState } from "react";
import {
  TextField,
  Button,
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
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("users/token/", form);
      login(res.data.access);
      showMessage("Login successful!", "success");
      navigate("/dashboard");
    } catch {
      showMessage("Invalid credentials", "error");
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
              value={form.username}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Sign In
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
