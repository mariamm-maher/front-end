import axiosIns from "./axiosConfig";

/**
 * Get all available tours with retry logic
 * @param {number} retries - Number of retries (default: 2)
 * @param {boolean} useFallback - Whether to use fallback data if API fails
 * @returns {Promise} Promise resolving to array of tours
 */
export async function getAllTours(retries = 2, useFallback = true) {
  try {
    // Try endpoints in order: first the public tours API, then the travel agency endpoint
    try {
      const response = await axiosIns.get("/api/tours");
      console.log("Raw API response from getAllTours (/api/tours):", response);
      return response.data;
    } catch (firstEndpointError) {
      console.log(
        "First endpoint failed, trying fallback endpoint:",
        firstEndpointError.message
      );
      const response = await axiosIns.get("/Tours");
      console.log("Raw API response from getAllTours (/Tours):", response);
      return response.data;
    }
  } catch (error) {
    console.error("Error in getAllTours:", error);

    // Implement retry logic
    if (retries > 0) {
      console.log(`Retrying getAllTours... (${retries} attempts left)`);
      // Wait for 1 second before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return getAllTours(retries - 1, useFallback);
    }

    if (error.response) {
      console.error("Response error data:", error.response.data);
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
      if (error.response.status === 404)
        throw new Error(
          "Tours endpoint not found. Please check API configuration."
        );
      if (error.response.status === 400)
        throw new Error(
          "Bad request when fetching tours. Please check API parameters."
        );
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
    // Try endpoints in order
    try {
      console.log(`Fetching tour with ID ${id} from /api/tours/${id}`);
      const response = await axiosIns.get(`/api/tours/${id}`);
      console.log(`API response for tour ${id}:`, response.data);

      // Check if response has expected structure
      if (response.data && (response.data.tour || response.data.id)) {
        return response.data;
      } else {
        console.warn("Unexpected API response structure:", response.data);
        return response.data; // Return anyway, let the UI handle fallbacks
      }
    } catch (firstEndpointError) {
      console.log(
        "First endpoint failed, trying fallback endpoint:",
        firstEndpointError.message
      );
      console.log(`Fetching tour with ID ${id} from /Tours/${id}`);
      const response = await axiosIns.get(`/Tours/${id}`);
      console.log(`Fallback API response for tour ${id}:`, response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Error in getTour:", error);

    if (error.response) {
      console.error(`API returned status: ${error.response.status}`);
      console.error("Response data:", error.response.data);

      if (error.response.status === 404) throw new Error("Tour not found.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    } else if (error.request) {
      console.error("No response received from server:", error.request);
      throw new Error("No response from server. Please check your connection.");
    } else {
      console.error("Error setting up request:", error.message);
    }

    throw new Error("Something went wrong. Please try again.");
  }
}
