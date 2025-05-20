import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthContext";
import { PrivateRoute } from "@/routes/PrivateRoute";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import PostView from "@/pages/PostView";
import AuthorProfile from "@/pages/AuthorProfile";
import NotFound from "@/pages/NotFound";
// Components
import Navbar from "@/components/Navbar";
import { SnackbarProvider } from "@/components/SnackbarProvider";
// MUI
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/posts/:id" element={<PostView />} />
                <Route path="/authors/:username" element={<AuthorProfile />} />
                <Route path="*" element={<NotFound />} />
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
          </CssBaseline>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
