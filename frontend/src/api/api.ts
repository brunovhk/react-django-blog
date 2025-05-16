import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
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
