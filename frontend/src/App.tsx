import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthContext";
import { PrivateRoute } from "@/routes/PrivateRoute";
import Navbar from "@/components/Navbar";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import PostView from "@/pages/PostView";
// MUI
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AuthProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/posts/:id" element={<PostView />} />
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
