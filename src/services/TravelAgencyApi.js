import axiosIns from "./axiosConfig";
import { uploadTourImage } from "./cloudinaryService";

/**
 * Get travel agency profile
 * @returns {Promise} Promise resolving to travel agency profile data
 */
export async function getTravelAgencyProfile() {
  try {
    const response = await axiosIns.get("/travelAgency/profile");
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to view this profile."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Add a new tour with images
 * @param {Object} tourData - Tour data
 * @returns {Promise} Promise resolving to the created tour
 */
export async function addTour(tourData) {
  try {
    let processedTourData = { ...tourData }; // If there are tour images, upload them to Cloudinary
    if (tourData.photos && Array.isArray(tourData.photos)) {
      console.log(
        `[Agency API] Uploading ${tourData.photos.length} tour photos to Cloudinary`
      );

      const imageUploadPromises = tourData.photos.map((image, index) => {
        if (image instanceof File) {
          console.log(
            `[Agency API] Tour photo ${index + 1}: ${image.name}, Size: ${(
              image.size / 1024
            ).toFixed(2)} KB`
          );
          return uploadTourImage(image);
        }
        console.log(
          `[Agency API] Tour photo ${
            index + 1
          } is already a URL: ${image.substring(0, 50)}...`
        );
        return Promise.resolve(image); // If it's already a URL, keep it as is
      });

      // Wait for all images to be uploaded
      const imageUrls = await Promise.all(imageUploadPromises);
      console.log(`[Agency API] All tour photos uploaded. URLs:`, imageUrls);
      processedTourData.photos = imageUrls;
    }

    // If there's a main image/thumbnail
    if (tourData.mainpphoto && tourData.mainpphoto instanceof File) {
      console.log(
        `[Agency API] Uploading main tour photo: ${tourData.mainpphoto.name}`
      );
      processedTourData.mainpphoto = await uploadTourImage(tourData.mainpphoto);
      console.log(
        `[Agency API] Main tour photo uploaded. URL: ${processedTourData.mainpphoto}`
      );
    }
    const response = await axiosIns.post(
      "/travelAgency/addTour",
      processedTourData
    );
    console.log(
      `[Agency API] Tour added successfully with ${
        processedTourData.photos?.length || 0
      } photos`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Invalid tour data provided.");
      if (error.response.status === 403)
        throw new Error("Access denied. You are not authorized to add tours.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Get all tours for the travel agency
 * @returns {Promise} Promise resolving to array of tours
 */
export async function getAllTours() {
  try {
    const response = await axiosIns.get("/travelAgency/getAllTours");
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403)
        throw new Error("Access denied. You are not authorized to view tours.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Get a specific tour by ID
 * @param {string} id - Tour ID to retrieve
 * @returns {Promise} Promise resolving to tour data
 */
export async function getTour(id) {
  try {
    const response = await axiosIns.get(`/travelAgency/getTour/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) throw new Error("Tour not found.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to view this tour."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Update a tour by ID
 * @param {string} id - Tour ID to update
 * @param {Object} tourData - Updated tour data
 * @returns {Promise} Promise resolving to the updated tour
 */
export async function updateTour(id, tourData) {
  try {
    let processedTourData = { ...tourData }; // If there are new tour images, upload them to Cloudinary
    if (tourData.newImages && Array.isArray(tourData.newImages)) {
      console.log(
        `[Agency API] Updating tour ${id} - Uploading ${tourData.newImages.length} new tour images`
      );

      const imageUploadPromises = tourData.newImages.map((image, index) => {
        if (image instanceof File) {
          console.log(
            `[Agency API] New tour image ${index + 1}: ${image.name}, Size: ${(
              image.size / 1024
            ).toFixed(2)} KB`
          );
          return uploadTourImage(image, id);
        }
        console.log(
          `[Agency API] Tour image ${
            index + 1
          } is already a URL: ${image.substring(0, 50)}...`
        );
        return Promise.resolve(image); // If it's already a URL, keep it as is
      }); // Wait for all new images to be uploaded
      const newImageUrls = await Promise.all(imageUploadPromises);
      console.log(
        `[Agency API] All new tour images uploaded. URLs:`,
        newImageUrls
      );

      // Combine existing photos with new ones
      const existingCount = tourData.photos?.length || 0;
      console.log(
        `[Agency API] Combining ${existingCount} existing photos with ${newImageUrls.length} new images`
      );

      processedTourData.photos = [...(tourData.photos || []), ...newImageUrls];

      // Remove temporary properties
      delete processedTourData.newImages;
    } // If there's a new main image/thumbnail
    if (tourData.newMainImage && tourData.newMainImage instanceof File) {
      console.log(
        `[Agency API] Uploading new main tour image for tour ${id}: ${tourData.newMainImage.name}`
      );
      processedTourData.mainimage = await uploadTourImage(
        tourData.newMainImage,
        id
      );
      console.log(
        `[Agency API] New main tour image uploaded. URL: ${processedTourData.mainimage}`
      );
      delete processedTourData.newMainImage;
    }
    const response = await axiosIns.put(
      `/travelAgency/updateTour/${id}`,
      processedTourData
    );
    console.log(
      `[Agency API] Tour ${id} updated successfully with ${
        processedTourData.images?.length || 0
      } total images`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Invalid tour data provided.");
      if (error.response.status === 404) throw new Error("Tour not found.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to update tours."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Delete a tour by ID
 * @param {string} id - Tour ID to delete
 * @returns {Promise} Promise resolving to delete operation result
 */
export async function deleteTour(id) {
  try {
    const response = await axiosIns.delete(`/travelAgency/deleteTour/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) throw new Error("Tour not found.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to delete tours."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Get all bookings for the travel agency
 * @returns {Promise} Promise resolving to array of bookings
 */
export async function getAllBookings() {
  try {
    const response = await axiosIns.get("/travelAgency/getAllBookings");
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to view bookings."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Get booking details by ID
 * @param {number} id - Booking ID to retrieve
 * @returns {Promise} Promise resolving to booking details
 */
export async function getBookingDetails(id) {
  try {
    const response = await axiosIns.get(`/travelAgency/bookings/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) throw new Error("Booking not found.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to view this booking."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Get all available tour categories
 * @returns {Promise} Promise resolving to array of categories
 */
export async function getAllCategories() {
  try {
    const response = await axiosIns.get("/travelAgency/getAllCategories");
    return response.data.$values;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to view categories."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Update the status of a booking (approve or reject)
 * @param {number} bookingId - ID of the booking to update
 * @param {string} status - Action to perform ('approve' or 'reject')
 * @returns {Promise} Promise resolving to the updated booking
 */
export async function updateBookingStatus(bookingId, status) {
  try {
    // Handle the case where the status might already be "approve" or "reject"
    // No conversion needed if already in correct format
    const action =
      status === "approve" || status === "reject"
        ? status
        : status === "approved"
        ? "approve"
        : "reject";

    // Send the action string directly as the request body
    const response = await axiosIns.patch(
      `/travelAgency/bookings/${bookingId}/handle`,
      JSON.stringify(action),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) throw new Error("Booking not found.");
      if (error.response.status === 400)
        throw new Error("Invalid booking action.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to manage bookings."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}
