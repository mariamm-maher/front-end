/**
 * Utilities for debugging and handling authentication messages
 */

/**
 * Display a properly formatted error toast for auth errors
 * @param {Error} error - The error object
 * @param {import('react-hot-toast').Toast} toast - The toast library
 */
export const displayAuthError = (error, toast) => {
  // Determine error message and settings
  let message = error?.message || "Authentication failed. Please try again.";
  let duration = 5000;
  let icon = "❌";

  // Special handling for specific error types
  if (message.includes("suspended") || message.includes("pending")) {
    message =
      "Your account is currently suspended or pending approval. Please contact support.";
    duration = 10000;
    icon = "⚠️";
  } else if (message.includes("incorrect") || message.includes("invalid")) {
    message =
      "Invalid email or password. Please check your credentials and try again.";
    duration = 7000;
  } else if (message.includes("server error")) {
    message =
      "Server error. Please try again later or contact support if the problem persists.";
    duration = 7000;
  }

  // Display the toast
  toast.error(message, {
    duration,
    position: "top-center",
    style: {
      background: "#EF4444",
      color: "white",
      padding: "16px",
      borderRadius: "10px",
      maxWidth: "400px",
    },
    icon,
  });
};

/**
 * Debug function to log auth-related issues
 */
export const logAuthDebug = (message, data) => {
  console.log(`[Auth Debug] ${message}`, data);
};
