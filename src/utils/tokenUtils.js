import { jwtDecode } from "jwt-decode";

/**
 * Debug function to validate a token and check for specific fields
 * @param {string} token - JWT token string
 * @returns {object} - Result object with validation information
 */
const validateToken = (token) => {
  if (!token) {
    return { valid: false, error: "No token provided" };
  }

  try {
    // Try to decode the token
    const decoded = jwtDecode(token);

    // Check for required fields
    const requiredFields = ["id", "role", "exp"];
    const missingFields = requiredFields.filter((field) => !(field in decoded));

    if (missingFields.length > 0) {
      return {
        valid: false,
        error: `Token missing required fields: ${missingFields.join(", ")}`,
        decoded,
      };
    }

    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp <= currentTime) {
      return {
        valid: false,
        error: "Token is expired",
        expired: true,
        decoded,
      };
    }

    // All checks passed
    return {
      valid: true,
      decoded,
      expiresIn: Math.floor(decoded.exp - currentTime),
      role: decoded.role,
      id: decoded.id,
    };
  } catch (error) {
    return {
      valid: false,
      error: `Failed to decode token: ${error.message}`,
      originalError: error,
    };
  }
};

/**
 * Get a user's role from the JWT token in localStorage
 * @returns {string|null} - User role or null if not found
 */
const getUserRoleFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);
    return decoded.role || null;
  } catch (error) {
    console.error("Error getting user role from token:", error);
    return null;
  }
};

export { validateToken, getUserRoleFromToken };
