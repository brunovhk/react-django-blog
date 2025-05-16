import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthContext";
import { PrivateRoute } from "@/routes/PrivateRoute";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import theme from "@/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
