import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// General protected route - requires authentication but no specific role
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    // You could return a loading spinner here
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Role-specific protected route
export const RoleProtectedRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // Check if user object exists and has a role property
  if (!user || !user.role) {
    console.error("User object is missing or has no role:", user);
    // Clear potentially corrupted authentication state
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  console.log("Role check:", {
    userRole: user.role,
    allowedRoles,
    isAllowed: allowedRoles.includes(user.role),
  });

  // If authenticated but not authorized for this role
  if (!allowedRoles.includes(user.role)) {
    console.log(
      `User role ${user.role} not in allowed roles: [${allowedRoles.join(
        ", "
      )}]`
    );

    // Redirect to appropriate dashboard based on role
    if (user.role === "Tourist") {
      console.log("Redirecting Tourist to /home");
      return <Navigate to="/home" replace />;
    } else if (user.role === "TravelAgency") {
      console.log("Redirecting TravelAgency to /travelAgencyDashboard");
      return <Navigate to="/travelAgencyDashboard" replace />;
    } else if (user.role === "Admin") {
      console.log("Redirecting Admin to /admin");
      return <Navigate to="/admin" replace />;
    } else {
      // Fallback for unknown roles
      console.warn("Unknown role, redirecting to homepage:", user.role);
      return <Navigate to="/" replace />;
    }
  }

  // If authenticated and authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
