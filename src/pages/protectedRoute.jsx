import { Navigate, Outlet } from "react-router-dom";
import DownloadSpinner from "../components/shared/Downlaoding";
import { jwtDecode } from "jwt-decode";

/**
 * Protected routes for the application
 *
 * IMPORTANT: As per project requirements (see AUTH_README.md),
 * DO NOT check for token expiry in these components.
 * The backend is responsible for rejecting expired tokens.
 */

// General protected route - requires authentication but no specific role
const ProtectedRoute = () => {
  // Check for token directly
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// Role-specific protected route
export const RoleProtectedRoute = ({ allowedRoles }) => {
  // Check for token directly
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  try {
    // Verify token validity
    const decoded = jwtDecode(token);
    // Check if token has role information
    if (!decoded.role) {
      console.error("Token is missing role information:", decoded);
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

    console.log("Role check:", {
      userRole: decoded.role,
      allowedRoles,
      isAllowed: allowedRoles.includes(decoded.role),
    });

    // If authenticated but not authorized for this role
    if (!allowedRoles.includes(decoded.role)) {
      console.log(
        `User role ${decoded.role} not in allowed roles: [${allowedRoles.join(
          ", "
        )}]`
      );

      // Redirect to appropriate dashboard based on role
      if (decoded.role === "Tourist") {
        console.log("Redirecting Tourist to /home");
        return <Navigate to="/home" replace />;
      } else if (decoded.role === "TravelAgency") {
        console.log("Redirecting TravelAgency to /travelAgencyDashboard");
        return <Navigate to="/travelAgencyDashboard" replace />;
      } else if (decoded.role === "Admin") {
        console.log("Redirecting Admin to /admin");
        return <Navigate to="/admin" replace />;
      } else {
        // Fallback for unknown roles
        console.warn("Unknown role, redirecting to homepage:", decoded.role);
        return <Navigate to="/" replace />;
      }
    }

    // If authenticated and authorized, render the child routes
    return <Outlet />;
  } catch (error) {
    console.error("Error decoding token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
