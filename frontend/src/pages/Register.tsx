import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import api from "@/api/api";
import { parseAPIError } from "@/utils/parseError";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { useSnackbar } from "@/components/SnackbarProvider";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showMessage } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("users/register/", form);

      const res = await api.post("users/token/", {
        username: form.username,
        password: form.password,
      });

      login(res.data.access);

      showMessage("Account created successfully. Welcome!", "success");
      navigate("/dashboard");
    } catch (e: any) {
      const msg = parseAPIError(e.response?.data);
      showMessage(`Registration failed. ${msg}`, "error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6, px: 2, bgcolor: "background.default" }}>
        <Card elevation={3} sx={{ p: 4 }}>
          <CardContent>
            {/* Title */}
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
              Create Account
            </Typography>
            {/* Subtitle */}
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
            >
              Join the platform and start sharing your thoughts.
            </Typography>
            {/* Form */}
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
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
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
                Create Account
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
