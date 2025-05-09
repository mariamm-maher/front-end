import axios from "axios";

const axiosIns = axios.create({
  baseURL: "http://localhost:5252",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Include the token in requests
axiosIns.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosIns;
