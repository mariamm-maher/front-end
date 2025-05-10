import axiosIns from "./axiosConfig";
import { uploadProfilePhoto } from "./cloudinaryService";

export async function loginUser({ email, password }) {
  try {
    console.log("Attempting login with:", email);
    const response = await axiosIns.post("/auth/login", {
      UsernameOrEmail: email,
      Password: password,
    });
    console.log("Login API response:", response.data);
    return response.data; // { token, user, etc... }
  } catch (error) {
    console.error("Login error:", error);
    if (error.response) {
      // Server responded with a status (like 400, 401, etc.)
      if (error.response.status === 404)
        throw new Error("Email Or Password is not correct !");
      if (error.response.status === 403)
        throw new Error("Access denied. Your account may be suspended.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error(
      "Connection failed. Please check your internet connection."
    );
  }
}

/**
 * Sign up a tourist user with profile photo
 * @param {Object} userData - User registration data
 * @returns {Promise} Promise resolving to the created user
 */
export async function signUpUser({
  firstName,
  lastName,
  email,
  password,
  nationality,
  gender,
  profilePicture,
}) {
  try {
    // If there's a profile picture, upload it to Cloudinary first
    let profilePhotoUrl = "";
    if (profilePicture && profilePicture instanceof File) {
      profilePhotoUrl = await uploadProfilePhoto(profilePicture);
      console.log(
        `[Auth API] Tourist signup - Profile image uploaded to Cloudinary. URL: ${profilePhotoUrl}`
      );
    }

    // Send registration data to the backend, including the photo URL
    const response = await axiosIns.post("/auth/register/tourist", {
      firstName,
      lastName,
      email,
      password,
      role: "Tourist",
      nationality,
      gender,
      profilePicture: profilePhotoUrl, // Use the Cloudinary URL instead of the file
    });

    console.log(
      `[Auth API] Tourist signup completed. Profile picture URL sent to backend: ${profilePhotoUrl}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Email Already Exits ");
      if (error.response.status === 409)
        throw new Error("This email is already registered.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Sign up a travel agency with profile photo
 * @param {Object} agencyData - Agency registration data
 * @returns {Promise} Promise resolving to the created agency
 */
export async function travelAgencySignUp({
  email,
  password,
  agencyName,
  city,
  country,
  address,
  contact,
  profilePicture,
  website,
}) {
  try {
    // If there's a profile picture, upload it to Cloudinary first
    let profilePhotoUrl = "";
    if (profilePicture && profilePicture instanceof File) {
      profilePhotoUrl = await uploadProfilePhoto(profilePicture, email);
      console.log(
        `[Auth API] Agency signup - Profile image uploaded to Cloudinary. URL: ${profilePhotoUrl}`
      );
    } // Send registration data to the backend, including the photo URL
    const response = await axiosIns.post("/gloubeOut/auth/register/agency", {
      email,
      password,
      role: "TravelAgency",
      agencyName,
      city,
      country,
      address,
      contact,
      profilePicture: profilePhotoUrl, // Use the Cloudinary URL instead of the file
      website,
    });

    console.log(
      `[Auth API] Agency signup completed. Profile picture URL sent to backend: ${profilePhotoUrl}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Email Already Exists");
      if (error.response.status === 409)
        throw new Error("This email is already registered.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Request a password reset email
 * @param {string} email - User's email address
 * @returns {Promise} Promise resolving to success message
 */
export async function requestPasswordReset(email) {
  try {
    const response = await axiosIns.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404)
        throw new Error("No account found with this email address.");
      if (error.response.status === 429)
        throw new Error("Too many reset attempts. Please try again later.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Reset password with token
 * @param {string} token - Password reset token from email
 * @param {string} newPassword - New password
 * @returns {Promise} Promise resolving to success message
 */
export async function resetPassword(token, newPassword) {
  try {
    const response = await axiosIns.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Invalid or expired reset token. Please try again.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Verify user email with token
 * @param {string} token - Email verification token
 * @returns {Promise} Promise resolving to success message
 */
export async function verifyEmail(token) {
  try {
    const response = await axiosIns.get(`/auth/verify-email/${token}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Invalid or expired verification token.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Resend verification email
 * @param {string} email - User's email address
 * @returns {Promise} Promise resolving to success message
 */
export async function resendVerificationEmail(email) {
  try {
    const response = await axiosIns.post("/auth/resend-verification", {
      email,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404)
        throw new Error("No account found with this email address.");
      if (error.response.status === 429)
        throw new Error("Too many requests. Please try again later.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Change user password (when logged in)
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise} Promise resolving to success message
 */
export async function changePassword(currentPassword, newPassword) {
  try {
    const response = await axiosIns.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Current password is incorrect.");
      if (error.response.status === 401)
        throw new Error("You must be logged in to change your password.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}
