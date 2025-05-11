import { AnimatePresence } from "framer-motion";
import { FiCalendar, FiUsers, FiHeart, FiShare2, FiStar } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTour } from "../services/tourApi";
import Hero from "../components/Trip/Hero";
import TripOverview from "../components/Trip/TripOverView";
import TripReviews from "../components/Trip/tripReview";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
const TripPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false); // {

  console.log(trip);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        setLoading(true);
        const tourData = await getTour(id);
        console.log("Fetched tour data:", tourData);

        // Extract tour object if response is in the expected format
        const tourObject = tourData.tour || tourData;

        // Enhance the tour data with only the fields needed by the UI
        // and that exist in the actual API response
        const enhancedTourData = {
          ...tourObject,
          id: tourObject.id,
          title: tourObject.title || "Unnamed Tour",
          description:
            tourObject.description || "No description available for this tour.",
          price: tourObject.price || 0,
          location: tourObject.location || "Location not specified",
          duration: tourObject.duration
            ? `${tourObject.duration} days`
            : "Duration not specified",
          startDate:
            tourObject.startDate || new Date().toISOString().split("T")[0],
          endDate: tourObject.endDate || new Date().toISOString().split("T")[0],
          // Using rate from API if available, otherwise fallback to a default
          rating: tourObject.rate || 4.5, // Only include review count if we have reviews in the API response
          reviewCount: tourObject.reviews?.$values?.length || 0,
          // Use mainimage from API as primary image source
          image:
            tourObject.mainimage ||
            "https://images.unsplash.com/photo-1518544866330-95b331ed9cd1",
          // Use availableSeats data directly from API
          groupSize: tourObject.availableSeats
            ? `${tourObject.availableSeats} people max`
            : "Group size not specified",
          // Only include these properties if they are actually present in the API
          ...(tourObject.accomodation && {
            accommodation: tourObject.accomodation,
          }),
          ...(tourObject.transportation && {
            transportation: tourObject.transportation,
          }), // Generate minimal fallbacks for data not provided by API
          highlights: [
            `${tourObject.category || "Tour"} experience in ${
              tourObject.location || "amazing locations"
            }`,
            tourObject.accomodation
              ? `${tourObject.accomodation} included`
              : "Accommodation included",
            tourObject.transportation
              ? `${tourObject.transportation} provided`
              : "Transportation provided",
          ], // Pass the actual reviews object from the API, ensuring it's not null
          reviews: tourObject.reviews || { $values: [] },

          // Generate itinerary from startDate and endDate if not provided
          itinerary: tourObject.itinerary || [
            {
              day: 1,
              title: "Tour Start",
              description: `Begin your journey in ${
                tourObject.location || "your destination"
              }.`,
            },
          ],

          // Generate inclusions based on actual API data
          inclusions: [
            tourObject.accomodation
              ? `Accommodation: ${tourObject.accomodation}`
              : "Accommodation included",
            tourObject.transportation
              ? `Transportation: ${tourObject.transportation}`
              : "Transportation included",
            "Guide services",
          ],

          // Standard exclusions - these are common and don't need API data
          exclusions: [
            "International flights",
            "Personal expenses",
            "Travel insurance",
          ],
        };

        setTrip(enhancedTourData);
        setError(null);
      } catch (err) {
        console.error("Error fetching tour:", err);
        setError("Failed to load tour details");
        toast.error("Failed to load tour details. Please try again later.");
        // Navigate back to explore page after a delay if tour can't be found
        setTimeout(() => {
          navigate("/explore");
        }, 3000);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchTourData();
    }
  }, [id, navigate]);

  // Handle adding/removing from favorites
  const toggleFavorite = () => {
    // Implementation will be added when favorites API is available
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast.success("Added to favorites!");
    } else {
      toast.success("Removed from favorites!");
    }
  }; // Handle booking the trip
  const handleBookNow = () => {
    if (trip) {
      // Check if there are available seats
      if (trip.availableSeats === 0) {
        toast.error("This trip is fully booked. No available seats.");
        return;
      }

      console.log("Booking trip with data:", trip);

      // Make sure we're passing a properly structured trip object
      const bookingTrip = {
        id: trip.id,
        title: trip.title,
        name: trip.title, // Include both formats for compatibility
        mainimage: trip.image,
        image: trip.image,
        price: trip.price,
        duration: trip.duration,
        startDate: trip.startDate,
        endDate: trip.endDate,
        location: trip.location,
        travelAgencyName: trip.travelAgencyName || trip.agency,
        agency: trip.travelAgencyName || trip.agency,
        description: trip.description,
        availableSeats: trip.availableSeats,
      };

      console.log(
        "Navigating to booking with prepared trip data:",
        bookingTrip
      );

      // Navigate to booking page with tour ID as parameter and trip data
      navigate(`/booking/${trip.id}`, {
        state: { trip: bookingTrip }, // Pass the trip object in state
      });
    }
  };

  const displayTrip = trip || {
    id: 0,
    title: "Loading Trip...",
    description: "Trip details are being loaded",
    location: "Unknown location",
    price: 0,
    duration: "Not available",
    rating: 0,
    reviewCount: 0,
    image: "https://images.unsplash.com/photo-1518544866330-95b331ed9cd1",
    groupSize: "Not specified",

    itinerary: [],
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-[#1784ad] border-opacity-50 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading trip details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-red-100 p-6 rounded-lg text-center max-w-md">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
          <p className="text-gray-600 mt-2">Redirecting to explore page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Image - Full width */}
      <Hero trip={displayTrip} />

      {/* Main Content - Full width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content (2/3 width) */}
          <div className="lg:w-2/3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {displayTrip.title}
                </h1>
                <div className="flex items-center mt-2">
                  <FiStar className="text-yellow-400 mr-1" />
                  <span className="text-gray-800">
                    {displayTrip.rating} ({displayTrip.reviewCount || 0}{" "}
                    reviews)
                  </span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-600">{displayTrip.location}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={toggleFavorite}
                  className={`p-3 rounded-full ${
                    isFavorite
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  } hover:bg-gray-200`}
                >
                  <FiHeart
                    className={isFavorite ? "fill-current" : ""}
                    size={20}
                  />
                </button>
                <button className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                  <FiShare2 size={20} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${
                    activeTab === "overview"
                      ? "border-b-2 border-[#1784ad] text-[#1784ad]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Overview
                </button>

                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${
                    activeTab === "reviews"
                      ? "border-b-2 border-[#1784ad] text-[#1784ad]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Reviews
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {" "}
                {activeTab === "overview" && (
                  <TripOverview trip={displayTrip} />
                )}
                {activeTab === "itinerary" && (
                  <TripItinerary itinerary={displayTrip.itinerary} />
                )}{" "}
                {activeTab === "reviews" && (
                  <TripReviews
                    reviews={displayTrip.reviews || []}
                    rating={displayTrip.rating}
                    tourId={id}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Sidebar (1/3 width) */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  ${displayTrip.price}
                </h3>
                <span className="text-sm text-gray-500">per person</span>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-[#1784ad]" />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium">{displayTrip.duration}</p>
                  </div>
                </div>
              </div>{" "}
              <button
                onClick={handleBookNow}
                disabled={displayTrip.availableSeats === 0}
                className={`w-full py-3 font-medium rounded-lg transition-colors ${
                  displayTrip.availableSeats === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#1784ad] hover:bg-[#146d8d] text-white"
                }`}
              >
                {displayTrip.availableSeats === 0 ? "Fully Booked" : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPage;
