import axios from "axios";

const axiosIns = axios.create({
  // If your app is already configured to use http://localhost:5252, make sure it's running
  // If not, you might need to update this URL to match your backend
  baseURL: "http://localhost:5252", // verify this is correct
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
