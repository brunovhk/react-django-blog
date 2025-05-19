import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  // Check if the request is for a public endpoint
  const isPublicEndpoint =
    config.url?.includes("users/register") ||
    config.url?.includes("users/token");

  if (token && !isPublicEndpoint) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
