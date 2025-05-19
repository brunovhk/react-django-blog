import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  CircularProgress,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import api from "@/api/api";
import { parseAPIErrorByField } from "@/utils/parseError";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { useSnackbar } from "@/components/SnackbarProvider";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const { showMessage } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await api.post("users/register/", form);

      const res = await api.post("users/token/", {
        username: form.username,
        password: form.password,
      });

      login(res.data.access);
      showMessage("Account created successfully. Welcome!", "success");
      setForm({ username: "", email: "", password: "" });
      navigate("/dashboard");
    } catch (e: any) {
      const errors = parseAPIErrorByField(e.response?.data);
      setFieldErrors(errors);
      showMessage("Registration failed.", "error");
    } finally {
      setLoading(false);
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
                autoComplete="username"
                name="username"
                required
                value={form.username}
                onChange={handleChange}
                error={!!fieldErrors.username}
                helperText={fieldErrors.username}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                autoComplete="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                error={!!fieldErrors.email}
                helperText={fieldErrors.email}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                autoComplete="new-password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                error={!!fieldErrors.password}
                helperText={fieldErrors.password}
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
                    <CircularProgress
                      size={20}
                      color="inherit"
                      sx={{ mr: 1 }}
                    />
                    Creating account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
