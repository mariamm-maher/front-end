// Cloudinary service for handling image uploads
import { cloudinaryConfig } from "./cloudinaryConfig";

/**
 * Uploads an image to Cloudinary
 * @param {File} imageFile - The image file to upload
 * @param {string} folder - The folder path (e.g., 'users/profile_photos')
 * @param {Object} options - Additional upload options
 * @returns {Promise<string>} - A Promise resolving to the secure URL of the uploaded image
 */
export const uploadImage = async (imageFile, folder, options = {}) => {
  try {
    console.log(
      `[Cloudinary Upload] Starting upload for file: ${imageFile.name} to folder: ${folder}`
    );

    // Create the form data for upload
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", cloudinaryConfig.uploadPreset);
    formData.append("folder", folder);

    // Add optional parameters
    if (options.publicId) {
      formData.append("public_id", options.publicId);
    }

    if (options.tags && Array.isArray(options.tags)) {
      formData.append("tags", options.tags.join(","));
    }

    // Execute the upload
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Cloudinary Error]", errorData);
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data = await response.json();
    console.log(
      `[Cloudinary Upload] File uploaded successfully. URL: ${data.secure_url}`
    );

    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);

    // Provide helpful error messages
    if (error.message?.includes("NetworkError")) {
      throw new Error(
        "Network error. Please check your internet connection and try again."
      );
    }

    if (error.message?.includes("upload_preset")) {
      throw new Error(
        "Configuration error: Invalid upload preset. Please contact support."
      );
    }

    throw new Error("Failed to upload image. Please try again.");
  }
};

/**
 * Upload a profile photo for a user
 * @param {File} photoFile - Profile photo file
 * @param {string} userId - User ID or unique identifier (optional)
 * @returns {Promise<string>} Secure URL of the uploaded profile photo
 */
export const uploadProfilePhoto = async (photoFile, userId = null) => {
  console.log(
    `[Cloudinary Profile] Uploading profile photo for user: ${
      userId || "new user"
    }`
  );
  console.log(
    `[Cloudinary Profile] File details: ${photoFile.name}, Size: ${(
      photoFile.size / 1024
    ).toFixed(2)} KB, Type: ${photoFile.type}`
  );

  const folder = "users/profile_photos";
  const options = {};

  if (userId) {
    options.publicId = `user_${userId}_profile`;
    options.tags = ["profile", `user_${userId}`];
  }

  return uploadImage(photoFile, folder, options);
};

/**
 * Upload a tour image
 * @param {File} imageFile - Tour image file
 * @param {string} tourId - Tour ID (optional)
 * @returns {Promise<string>} Secure URL of the uploaded tour image
 */
export const uploadTourImage = async (imageFile, tourId = null) => {
  console.log(
    `[Cloudinary Tour] Uploading tour image${
      tourId ? ` for tour: ${tourId}` : ""
    }`
  );
  console.log(
    `[Cloudinary Tour] File details: ${imageFile.name}, Size: ${(
      imageFile.size / 1024
    ).toFixed(2)} KB, Type: ${imageFile.type}`
  );

  const folder = "tours/images";
  const options = {
    tags: ["tour"],
  };

  if (tourId) {
    options.publicId = `tour_${tourId}_${Date.now()}`;
    options.tags.push(`tour_${tourId}`);
  }

  return uploadImage(imageFile, folder, options);
};
