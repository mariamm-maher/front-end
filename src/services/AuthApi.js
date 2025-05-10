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
      if (error.response.status === 401)
        throw new Error(
          "Your account is currently suspended or pending approval. Please contact support."
        );
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
  contact,
  profilePicture,
  // We're keeping these parameters but not using them directly
  // They're included here for API compatibility
  // eslint-disable-next-line no-unused-vars
  address = "",
  // eslint-disable-next-line no-unused-vars
  website = "",
}) {
  try {
    let profilePhotoUrl = "";
    if (profilePicture && profilePicture instanceof File) {
      try {
        console.log(
          `Uploading profile photo: ${profilePicture.name}, Size: ${(
            profilePicture.size / 1024
          ).toFixed(2)} KB`
        );
        profilePhotoUrl = await uploadProfilePhoto(profilePicture, email);
        console.log(
          `[Auth API] Agency signup - Profile image uploaded to Cloudinary. URL: ${profilePhotoUrl}`
        );
      } catch (uploadError) {
        console.error(
          "Error uploading profile photo to Cloudinary:",
          uploadError
        );
        throw new Error(
          `Failed to upload profile photo: ${uploadError.message}`
        );
      }
    } else {
      console.log(
        "No profile photo provided or invalid file object:",
        profilePicture
      );
    }

    // Prepare the registration data
    const registrationData = {
      email,
      password,
      role: "TravelAgency",
      agencyName,
      city,
      country,
      address: "", // Always send empty string
      contact,
      profilePicture: profilePhotoUrl, // Use the Cloudinary URL instead of the file
      website: "", // Always send empty string
    };
    console.log("Sending agency registration data:", registrationData);

    // Send registration data to the backend - using consistent endpoint name with camelCase
    const response = await axiosIns.post(
      "/auth/register/travelAgency",
      registrationData
    );

    console.log(
      `[Auth API] Agency signup completed. Response:`,
      response.data,
      `Profile picture URL sent to backend: ${profilePhotoUrl}`
    );
    return response.data;
  } catch (error) {
    console.error("Travel agency signup error:", error); // Detailed error logging
    if (error.response) {
      console.error(
        `Status: ${error.response.status}, Message: ${error.response.statusText}`
      );
      console.error("Response data:", error.response.data);

      if (error.response.status === 404) {
        console.error("API endpoint not found: /auth/register/travelAgency");
        throw new Error(
          "Registration endpoint not found. Please contact support or try again later."
        );
      }
      if (error.response.status === 400)
        throw new Error("Email Already Exists");
      if (error.response.status === 409)
        throw new Error("This email is already registered.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    } else if (error.request) {
      // Request was made but no response
      console.error("No response received:", error.request);
      throw new Error(
        "No response from server. Please check your connection and try again."
      );
    }
    throw new Error("Something went wrong. Please try again.");
  }
}
