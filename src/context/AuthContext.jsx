import { useMutation } from "@tanstack/react-query";
import { createContext, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../services/AuthApi";
import { displayAuthError } from "../utils/authUtils";

// Create context in a separate declaration
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Define logout first so it can be used in dependencies
  const logout = useCallback(() => {
    setToken("");
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  }, [navigate]);

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
      // Use our utility function for displaying auth errors
      displayAuthError(error, toast);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
