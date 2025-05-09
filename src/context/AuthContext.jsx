import { useMutation } from "@tanstack/react-query";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginUser, signUpUser } from "../services/AuthApi"; // import signUpUser too

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);

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
        if (user.role === "Tourist") navigate("/home");
        if (user.role === "Admin") navigate("/admin");
        if (user.role === "TravelAgency") navigate("/travelAgencyDashboard");
      }
    },
    onError: (error) => {
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

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
