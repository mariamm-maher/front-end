import axiosIns from "./axiosConfig";

// Fallback dummy data in case the API is not available
function getDummyTours() {
  return [
    {
      id: "1",
      title: "Amazing Safari Adventure",
      description:
        "Experience the thrill of a lifetime with our safari tour through the heart of Africa.",
      location: "Kenya, Africa",
      mainimage:
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop",
      price: 2499,
      duration: "7 days",
      rating: 4.8,
      startDate: new Date(2025, 6, 15),
      numberOfDays: 7,
      category: "adventure",
    },
    {
      id: "2",
      title: "Historic Rome Explorer",
      description:
        "Walk in the footsteps of ancient Romans and discover the rich history of the Eternal City.",
      location: "Rome, Italy",
      mainimage:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop",
      price: 1899,
      duration: "5 days",
      rating: 4.7,
      startDate: new Date(2025, 7, 10),
      numberOfDays: 5,
      category: "historical",
    },
    {
      id: "3",
      title: "Luxury Bali Retreat",
      description:
        "Indulge in the ultimate luxury experience in the tropical paradise of Bali.",
      location: "Bali, Indonesia",
      mainimage:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop",
      price: 3299,
      duration: "10 days",
      rating: 4.9,
      startDate: new Date(2025, 8, 5),
      numberOfDays: 10,
      category: "luxury",
    },
    {
      id: "4",
      title: "Northern Lights Expedition",
      description:
        "Witness the breathtaking Aurora Borealis in the pristine wilderness of Iceland.",
      location: "Reykjavik, Iceland",
      mainimage:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop",
      price: 2799,
      duration: "6 days",
      rating: 4.6,
      startDate: new Date(2025, 9, 20),
      numberOfDays: 6,
      category: "nature",
    },
  ];
}

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

    // If all endpoints fail and retries are exhausted, use fallback data if enabled
    if (useFallback) {
      console.log("All API attempts failed. Using fallback dummy data.");
      // Return in a format similar to what the API would return
      return {
        tours: {
          $values: getDummyTours(),
        },
      };
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
 * @param {boolean} useFallback - Whether to use fallback data if API fails
 * @returns {Promise} Promise resolving to tour data
 */
export async function getTour(id, useFallback = true) {
  try {
    // Try endpoints in order
    try {
      const response = await axiosIns.get(`/api/tours/${id}`);
      return response.data;
    } catch (firstEndpointError) {
      console.log(
        "First endpoint failed, trying fallback endpoint:",
        firstEndpointError.message
      );
      const response = await axiosIns.get(`/Tours/${id}`);
      return response.data;
    }
  } catch (error) {
    if (useFallback) {
      console.log(`API call failed. Using fallback data for tour ${id}`);
      const dummyTours = getDummyTours();
      const tour = dummyTours.find((t) => t.id === id);

      if (tour) {
        return tour;
      }
    }

    if (error.response) {
      if (error.response.status === 404) throw new Error("Tour not found.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}
