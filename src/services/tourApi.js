import axiosIns from "./axiosConfig";

/**
 * Get all available tours
 * @returns {Promise} Promise resolving to array of tours
 */
export async function getAllTours() {
  try {
    const response = await axiosIns.get("/Tours/getAllTours");
    return response.data;
  } catch (error) {
    if (error.response) {
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
    const response = await axiosIns.get(`/Tours/getTour/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) throw new Error("Tour not found.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}
