import axiosIns from "./axiosConfig";

/**
 * Get all users in the system
 * @returns {Promise} Promise resolving to array of users
 */
export async function getAllUsers() {
  try {
    const response = await axiosIns.get("/gloubeOut/admin/allUsers");
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403)
        throw new Error("Access denied. You are not authorized to view users.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Get all travel agency requests
 * @returns {Promise} Promise resolving to array of travel agency requests
 */
export async function getAllTravelAgencyRequests() {
  try {
    const response = await axiosIns.get(
      "/gloubeOut/admin/AllTravelAgenciesRequests"
    );

    return response.data.$values;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to view travel agency requests."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Get all travel agencies
 * @returns {Promise} Promise resolving to array of travel agencies
 */
export async function getAllTravelAgencies() {
  try {
    const response = await axiosIns.get("/gloubeOut/admin/AllTravelAgencies");
    return response.data.$values;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to view travel agencies."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Add a new travel agency
 * @param {Object} agencyData - Travel agency data
 * @returns {Promise} Promise resolving to the created travel agency
 */
export async function addTravelAgency(agencyData) {
  try {
    const response = await axiosIns.post(
      "/gloubeOut/admin/AddTravelAgency",
      agencyData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Invalid agency data provided.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to add travel agencies."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Delete a travel agency by ID
 * @param {string} id - Travel agency ID to delete
 * @returns {Promise} Promise resolving to delete operation result
 */
export async function deleteTravelAgency(id) {
  try {
    const response = await axiosIns.delete(
      `/gloubeOut/admin/deletetravelagency/${id}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404)
        throw new Error("Travel agency not found.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to delete travel agencies."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Update a travel agency by ID
 * @param {string} id - Travel agency ID to update
 * @param {Object} agencyData - Updated travel agency data
 * @returns {Promise} Promise resolving to the updated travel agency
 */
export async function updateTravelAgency(id, agencyData) {
  try {
    const response = await axiosIns.patch(
      `/gloubeOut/admin/updateTravelAgency/${id}`,
      agencyData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Invalid agency data provided.");
      if (error.response.status === 404)
        throw new Error("Travel agency not found.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to update travel agencies."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Get a specific travel agency by ID
 * @param {string} id - Travel agency ID to retrieve
 * @returns {Promise} Promise resolving to travel agency data
 */
export async function getTravelAgency(id) {
  try {
    const response = await axiosIns.get(
      `/gloubeOut/admin/getTravelAgency/${id}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404)
        throw new Error("Travel agency not found.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to view this travel agency."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Handle travel agency requests by ID
 * @param {string} id - Travel agency request ID to handle
 * @param {Object} requestData - Data for handling the request
 * @returns {Promise} Promise resolving to request handling result
 */
export async function handleTravelAgencyRequest(id, requestData) {
  try {
    const response = await axiosIns.patch(
      `/gloubeOut/admin/handleTArequests/${id}`,
      requestData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Invalid request data provided.");
      if (error.response.status === 404)
        throw new Error("Travel agency request not found.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to handle travel agency requests."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Get all categories
 * @returns {Promise} Promise resolving to array of categories
 */
export async function getAllCategories() {
  try {
    const response = await axiosIns.get("/gloubeOut/admin/getAllCategories");
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
 * Add a new category
 * @param {Object} categoryData - Category data
 * @returns {Promise} Promise resolving to the created category
 */
export async function addCategory(categoryData) {
  try {
    const response = await axiosIns.post(
      "/gloubeOut/admin/addCategory",
      categoryData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Invalid category data provided.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to add categories."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Delete a category by ID
 * @param {string} id - Category ID to delete
 * @returns {Promise} Promise resolving to delete operation result
 */
export async function deleteCategory(id) {
  try {
    const response = await axiosIns.delete(
      `/gloubeOut/admin/deleteCategory/${id}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) throw new Error("Category not found.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to delete categories."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

/**
 * Update a category by ID
 * @param {string} id - Category ID to update
 * @param {Object} categoryData - Updated category data
 * @returns {Promise} Promise resolving to the updated category
 */
export async function updateCategory(id, categoryData) {
  try {
    const response = await axiosIns.post(
      `/gloubeOut/admin/updateCategory/${id}`,
      categoryData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Invalid category data provided.");
      if (error.response.status === 404) throw new Error("Category not found.");
      if (error.response.status === 403)
        throw new Error(
          "Access denied. You are not authorized to update categories."
        );
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}
