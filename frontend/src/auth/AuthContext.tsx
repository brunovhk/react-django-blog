import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: any;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Invalid token");

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        localStorage.removeItem("access_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = (token: string) => {
    localStorage.setItem("access_token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
