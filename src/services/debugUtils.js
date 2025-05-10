/**
 * Utility function to test multiple API endpoints to find the working one
 * @param {Function} axiosInstance - Axios instance to use for the requests
 * @param {Array} endpointOptions - Array of endpoint options to try
 * @param {Object} payload - The data to send in the request
 * @returns {Promise} - Promise that resolves to the successful response
 */
export async function testMultipleEndpoints(
  axiosInstance,
  endpointOptions,
  payload
) {
  // Try each endpoint option in sequence
  let lastError = null;

  for (const endpoint of endpointOptions) {
    try {
      console.log(`Attempting request to endpoint: ${endpoint}`);
      const response = await axiosInstance.post(endpoint, payload);
      console.log(`Success with endpoint: ${endpoint}`);
      return response; // Return the successful response
    } catch (error) {
      console.error(`Failed with endpoint ${endpoint}:`, error.message);
      if (error.response) {
        console.error(
          `Status: ${error.response.status}, Message: ${error.response.statusText}`
        );
      }
      lastError = error;
    }
  }

  // If we've tried all endpoints and none worked, throw the last error
  throw lastError;
}
