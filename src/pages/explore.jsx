import { useState } from "react";
import NavBar from "../components/Home/nav";
import Hero from "../components/Explore/Hero";
import AdvancedFilters from "../components/Explore/filter/Filter";
import TripList from "../components/Explore/Trips";
import { trips } from "../../Data";
import SearchBar from "../components/Explore/searchBar";

function Explore() {
  const [filters, setFilters] = useState({
    category: "all",
    searchQuery: "",
    priceRange: [0, 5000],
    duration: "",
    rating: null,
    date: null,
  });

  const filteredTrips = trips.filter((trip) => {
    // Category filter
    const matchesCategory =
      filters.category === "all" ||
      (filters.category === "historical" && trip.title.includes("Rome")) ||
      (filters.category === "adventure" &&
        (trip.title.includes("Amazon") || trip.title.includes("Safari"))) ||
      (filters.category === "luxury" && trip.title.includes("Luxury")) ||
      (filters.category === "nature" &&
        (trip.title.includes("Northern") || trip.title.includes("Japanese")));

    // Search query
    const matchesSearch =
      filters.searchQuery === "" ||
      trip.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      trip.agency.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      trip.location.toLowerCase().includes(filters.searchQuery.toLowerCase());

    // Price range
    const matchesPrice =
      trip.price >= filters.priceRange[0] &&
      trip.price <= filters.priceRange[1];

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
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {filteredTrips.length} Trips Found
          </h2>
          <p className="text-gray-600 text-sm">
            {filters.category !== "all" && `Category: ${filters.category}`}
            {filters.searchQuery && ` • Search: "${filters.searchQuery}"`}
          </p>
        </div>

        {/* Trip Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TripList trips={filteredTrips} />
        </div>
      </div>
    </div>
  );
}

export default Explore;
