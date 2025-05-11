import { useState, useEffect } from "react";
import NavBar from "../components/Home/nav";
import Hero from "../components/Explore/Hero";
import AdvancedFilters from "../components/Explore/filter/Filter";
import TripList from "../components/Explore/TripsUpdated";
import { getAllTours } from "../services/tourApi";
import SearchBar from "../components/Explore/searchBar";
import { toast } from "react-hot-toast";

function Explore() {
  const [filters, setFilters] = useState({
    category: "all",
    searchQuery: "",
    priceRange: [0, 5000],
    duration: "",
    rating: null,
    date: null,
  });
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await getAllTours();

        console.log("API Response in explore.jsx:", response); // Debug log

        // Handle different response structures
        if (response && response.tours && response.tours.$values) {
          // ASP.NET serialization format
          console.log(
            "Tour count (ASP.NET format):",
            response.tours.$values.length
          );
          setTours(response.tours.$values);
        } else if (response && Array.isArray(response)) {
          // Direct array format
          console.log("Tour count (direct array):", response.length);
          setTours(response);
        } else if (
          response &&
          response.tours &&
          Array.isArray(response.tours)
        ) {
          // Nested array format
          console.log("Tour count (nested array):", response.tours.length);
          setTours(response.tours);
        } else {
          // Fallback for unexpected format
          console.warn("Unexpected API response structure:", response);
          setTours([]);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching tours:", err);
        setError("Failed to load tours. Please try again later.");
        toast.error("Failed to load tours. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);
  const filteredTrips = tours.filter((tour) => {
    if (!tour) return false;

    // Category filter
    const matchesCategory =
      filters.category === "all" ||
      (tour.category &&
        tour.category.toLowerCase() === filters.category.toLowerCase());

    // Search query
    const matchesSearch =
      filters.searchQuery === "" ||
      (tour.title &&
        tour.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) ||
      (tour.travelAgencyName &&
        tour.travelAgencyName
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())) ||
      (tour.location &&
        tour.location
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()));

    // Price range
    const matchesPrice =
      (tour.price &&
        tour.price >= filters.priceRange[0] &&
        tour.price <= filters.priceRange[1]) ||
      (!tour.price && filters.priceRange[0] === 0); // Include tours with no price if min price is 0

    return matchesCategory && matchesSearch && matchesPrice;
  });
  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />

      <div className="container mx-auto px-4 lg:px-8 py-8" id="trips">
        {/* Advanced Search at Top */}
        <div className="mb-8 mt-5">
          <SearchBar filters={filters} setFilters={setFilters} />
          <AdvancedFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* Results Section */}
        <div className="mb-6">
          {loading ? (
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Loading trips...
            </h2>
          ) : error ? (
            <h2 className="text-2xl font-bold text-red-600 mb-1">{error}</h2>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {filteredTrips.length} Trips Found
              </h2>
              <p className="text-gray-600 text-sm">
                {filters.category !== "all" && `Category: ${filters.category}`}
                {filters.searchQuery && ` • Search: "${filters.searchQuery}"`}
              </p>
            </>
          )}
        </div>

        {/* Trip Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading placeholders
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md p-4 h-64 animate-pulse"
              >
                <div className="bg-gray-300 h-40 rounded-lg mb-4"></div>
                <div className="bg-gray-300 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-gray-300 h-4 rounded w-1/2"></div>
              </div>
            ))
          ) : (
            <TripList trips={filteredTrips} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Explore;
