import axiosIns from "./axiosConfig";

/**
 * Get tourist profile
 * @returns {Promise} Promise resolving to tourist profile data
 */
export async function getTouristProfile() {
  try {
    const response = await axiosIns.get("/tourist/profile");
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
 * Update tourist profile
 * @param {Object} profileData - Updated profile data
 * @returns {Promise} Promise resolving to the updated profile
 */
export async function updateTouristProfile(profileData) {
  try {
    const response = await axiosIns.patch(
      "/tourist/updateProfile",
      profileData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Invalid profile data provided.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to update this profile."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Book a tour
 * @param {string} tourId - ID of the tour to book
 * @param {Object} bookingData - Booking data
 * @returns {Promise} Promise resolving to booking confirmation
 */
export async function bookTour(tourId, bookingData) {
  try {
    const response = await axiosIns.post(
      `/tourist/BookTour/${tourId}`,
      bookingData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Invalid booking data provided.");
      if (error.response.status === 404) throw new Error("Tour not found.");
      if (error.response.status === 403)
        throw new Error("Access denied. You are not authorized to book tours.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Get all bookings for the tourist
 * @returns {Promise} Promise resolving to array of bookings
 */
export async function getBookings() {
  try {
    const response = await axiosIns.get("/tourist/getBookings");
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to view these bookings."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Get details for a specific booking
 * @param {string} bookingId - ID of the booking to retrieve
 * @returns {Promise} Promise resolving to booking details
 */
export async function getBookingDetails(bookingId) {
  try {
    const response = await axiosIns.get(
      `/tourist/getBookingDetails/${bookingId}`
    );
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
 * Cancel a booking
 * @param {string} bookingId - ID of the booking to cancel
 * @returns {Promise} Promise resolving to cancellation confirmation
 */
export async function cancelBooking(bookingId) {
  try {
    const response = await axiosIns.get(`/tourist/CancelBooking/${bookingId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) throw new Error("Booking not found.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to cancel this booking."
        );
      if (error.response.status === 400)
        throw new Error(
          "Cannot cancel this booking. It may be too late to cancel."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Submit a complaint for a tour
 * @param {string} tourId - ID of the tour to complain about
 * @param {Object} complaintData - Complaint data
 * @returns {Promise} Promise resolving to complaint submission confirmation
 */
export async function submitComplaint(tourId, complaintData) {
  try {
    const response = await axiosIns.post(
      `/tourist/submtComplaint/${tourId}`,
      complaintData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Invalid complaint data provided.");
      if (error.response.status === 404) throw new Error("Tour not found.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to submit complaints."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Get all complaints submitted by the tourist
 * @returns {Promise} Promise resolving to array of complaints
 */
export async function getComplaints() {
  try {
    const response = await axiosIns.get("/tourist/getComplaints");
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to view these complaints."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Add a review for a tour
 * @param {string} tourId - ID of the tour to review
 * @param {Object} reviewData - Review data
 * @returns {Promise} Promise resolving to review submission confirmation
 */
export async function addReview(tourId, reviewData) {
  try {
    const response = await axiosIns.post(
      `/tourist/addReview/${tourId}`,
      reviewData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Invalid review data provided.");
      if (error.response.status === 404) throw new Error("Tour not found.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to add reviews."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Get reviews for a specific tour
 * @param {string} tourId - ID of the tour to get reviews for
 * @returns {Promise} Promise resolving to array of reviews
 */
export async function getReviews(tourId) {
  try {
    const response = await axiosIns.get(`/tourist/getReviews/${tourId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) throw new Error("Tour not found.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to view these reviews."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}
