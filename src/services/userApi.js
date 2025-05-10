import axiosIns from "./axiosConfig";

/**
 * Get the current user's profile information
 * @returns {Promise} Promise resolving to the user profile data
 */
export async function getUserProfile() {
  try {
    const response = await axiosIns.get("/user/profile");
    console.log("[User API] User profile data retrieved:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    if (error.response) {
      if (error.response.status === 401)
        throw new Error("Unauthorized. Please login again.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You don't have permission to view this profile."
        );
      if (error.response.status === 404)
        throw new Error("User profile not found.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Failed to fetch user profile. Please try again.");
  }
}

/**
 * Update the current user's profile information
 * @param {Object} profileData - The profile data to update
 * @returns {Promise} Promise resolving to the updated user profile
 */
export async function updateUserProfile(profileData) {
  try {
    const response = await axiosIns.put("/user/profile", profileData);
    console.log("[User API] User profile updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    if (error.response) {
      if (error.response.status === 401)
        throw new Error("Unauthorized. Please login again.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You don't have permission to update this profile."
        );
      if (error.response.status === 400)
        throw new Error("Invalid profile data. Please check your inputs.");
      if (error.response.status === 404)
        throw new Error("User profile not found.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Failed to update user profile. Please try again.");
  }
}
