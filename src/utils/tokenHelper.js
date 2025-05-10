// Utility function to test JWT token decoding

import { jwtDecode } from "jwt-decode";

/**
 * Test decoding a JWT token to ensure proper extraction of fields
 * @param {string} token - JWT token to decode
 * @returns {object} - The decoded token data or error information
 */
export function testTokenDecode(token) {
  try {
    // First, log the token format
    console.log("Token format check:", {
      length: token?.length || 0,
      isString: typeof token === "string",
      startsWithEyJ: token?.startsWith("eyJ") || false,
    });

    if (!token || typeof token !== "string") {
      return {
        success: false,
        error: "Invalid token format: token must be a non-empty string",
      };
    }

    // Attempt to decode the token
    const decoded = jwtDecode(token);

    // Check for required fields
    const requiredFields = ["id", "role", "exp"];
    const missingFields = requiredFields.filter((field) => !(field in decoded));

    if (missingFields.length > 0) {
      return {
        success: false,
        error: `Token is missing required fields: ${missingFields.join(", ")}`,
        partialDecode: decoded,
      };
    }

    // Verify expiration
    const currentTime = Date.now() / 1000;
    const isExpired = decoded.exp <= currentTime;

    return {
      success: true,
      decoded,
      isExpired,
      expiresIn: decoded.exp - currentTime,
      userRole: decoded.role,
    };
  } catch (error) {
    return {
      success: false,
      error: `Error decoding token: ${error.message}`,
      originalError: error,
    };
  }
}

// Example usage:
// const result = testTokenDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");
// console.log(result);
