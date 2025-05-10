import { useMutation } from "@tanstack/react-query";
import { createContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../services/AuthApi";

// Create context in a separate declaration
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Define logout first so it can be used in dependencies
  const logout = useCallback(() => {
    setToken("");
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  }, [navigate]);

  // Check if token is valid and not expired
  const isTokenValid = useCallback((token) => {
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // Check if token is expired
      return decoded.exp > currentTime;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  }, []);

  // Handle token refresh
  const refreshToken = useCallback(async () => {
    try {
      // Implement token refresh logic
      const response = await fetch("http://localhost:5252/auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      setToken(data.token);
      localStorage.setItem("token", data.token);

      return data.token;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
      return null;
    }
  }, [token, logout]);
  // Set up automatic token refresh
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      console.log("Full decoded token:", decoded); // Log the entire decoded token
      const currentTime = Date.now() / 1000;

      // If token is valid
      if (decoded.exp > currentTime) {
        // Ensure we have all the necessary properties from the token
        if (!decoded.role) {
          console.error("Token is missing role property:", decoded);
          toast.error("Authentication error: Token missing role information");
          logout();
          return;
        }

        // Set user with complete token payload
        setUser({
          id: decoded.id,
          role: decoded.role,
          exp: decoded.exp,
          // Include any other properties you need from the token
        });

        console.log("Setting user state with role:", decoded.role);
        setIsAuthenticated(true);

        // Set up refresh timer - refresh 5 minutes before expiry
        const timeToRefresh = (decoded.exp - currentTime - 300) * 1000;
        if (timeToRefresh > 0) {
          const refreshTimer = setTimeout(refreshToken, timeToRefresh);
          return () => clearTimeout(refreshTimer);
        } else {
          // Token is about to expire, refresh now
          refreshToken();
        }
      } else {
        // Token is expired, clear it
        logout();
      }
    } catch (error) {
      console.error("Invalid token:", error);
      logout();
    } finally {
      setLoading(false);
    }
  }, [token, refreshToken, isTokenValid, logout]);

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data && data.token) {
        console.log("Login successful, setting token");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        // Decode token to get user data
        const decoded = jwtDecode(data.token);
        console.log("Full decoded login token:", decoded);

        // Verify the token contains the required fields
        if (!decoded.role) {
          console.error("Token is missing role property:", decoded);
          toast.error("Authentication error: Invalid token format");
          return;
        }

        // Set user with complete token payload
        setUser({
          id: decoded.id,
          role: decoded.role,
          exp: decoded.exp,
          // Include any other properties you need from the token
        });

        console.log("Setting user after login with role:", decoded.role);
        setIsAuthenticated(true);

        toast.success("Login successful!", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#10B981",
            color: "white",
            padding: "16px",
            borderRadius: "10px",
          },
          icon: "🎉",
        });

        // Navigate with a slight delay to ensure state is updated
        setTimeout(() => {
          if (decoded.role === "Tourist") {
            console.log("Navigating to Tourist dashboard");
            navigate("/home");
          } else if (decoded.role === "Admin") {
            console.log("Navigating to Admin dashboard");
            navigate("/admin");
          } else if (decoded.role === "TravelAgency") {
            console.log("Navigating to Travel Agency dashboard");
            navigate("/travelAgencyDashboard");
          } else {
            // Fallback for unknown roles
            console.warn("Unknown role:", decoded.role);
            navigate("/");
          }
        }, 500);
      } else {
        console.error("Login response did not contain a token:", data);
        toast.error("Invalid login response from server");
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed.", {
        duration: 7000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
        },
        icon: "❌",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        logout,
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        token,
        user,
        isAuthenticated,
        loading,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
