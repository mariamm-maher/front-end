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

  // Define logout function - just removes token from localStorage
  const logout = useCallback(() => {
    setToken("");
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

        try {
          // Decode token to get user data
          const decoded = jwtDecode(data.token);
          console.log("Full decoded login token:", decoded);

          // Verify the token contains the required fields
          if (!decoded.role) {
            console.error("Token is missing role property:", decoded);
            toast.error("Authentication error: Invalid token format");
            return;
          }

          console.log("Login successful with role:", decoded.role);

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

          // Navigate directly to the appropriate dashboard based on role
          if (decoded.role === "Tourist") {
            console.log("Navigating Tourist to home page");
            navigate("/home");
          } else if (decoded.role === "Admin") {
            console.log("Navigating Admin to admin dashboard");
            navigate("/admin");
          } else if (decoded.role === "TravelAgency") {
            console.log("Navigating Travel Agency to dashboard");
            navigate("/travelAgencyDashboard");
          } else {
            console.warn("Unknown role:", decoded.role);
            navigate("/");
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          toast.error("Authentication error: Invalid token format");
          localStorage.removeItem("token");
          setToken("");
        }
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

  // Create a login function that returns a Promise
  const login = useCallback(
    async (credentials) => {
      try {
        return await loginMutation.mutateAsync(credentials);
      } catch (error) {
        console.error("Login error in Promise:", error);
        // Allow the caller to handle the error
        throw error;
      }
    },
    [loginMutation]
  );

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoggingIn: loginMutation.isPending,
        token,
        getToken: () => localStorage.getItem("token"),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
