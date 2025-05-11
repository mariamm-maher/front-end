import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiUsers, FiHeart, FiShare2, FiStar } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTour } from "../services/tourApi";
import Hero from "../components/Trip/Hero";
import TripOverview from "../components/Trip/TripOverView";
import TripItinerary from "../components/Trip/TripItinerary";
import TripReviews from "../components/Trip/tripReview";
import { toast } from "react-hot-toast";

const TripPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample reviews data (will be replaced by API data when available)
  const [reviews] = useState([
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      date: "2023-05-15",
      comment:
        "This trip exceeded all expectations! The villas were stunning and the activities perfectly balanced relaxation and adventure.",
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        "https://images.unsplash.com/photo-1563911302283-d2bc129e7570",
      ],
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
      date: "2023-04-22",
      comment:
        "Wonderful experience overall. The guides were extremely knowledgeable. Only minor complaint was one hotel change that wasn't communicated earlier.",
      images: [],
    },
    {
      id: 3,
      user: "Emma Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      rating: 5,
      date: "2023-06-10",
      comment:
        "Absolutely magical experience! The sunrise hike was worth waking up early for. Would book again in a heartbeat.",
      images: ["https://images.unsplash.com/photo-1560049025-1a2857f42f1d"],
    },
    {
      id: 4,
      user: "David Kim",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      rating: 4.5,
      date: "2023-03-18",
      comment:
        "Great value for the price. The cooking class was a highlight - we've been making the recipes at home!",
      images: [
        "https://images.unsplash.com/photo-1566041510394-cf7c8fe21800",
        "https://images.unsplash.com/photo-1563911302283-d2bc129e7570",
        "https://images.unsplash.com/photo-1560049025-1a2857f42f1d",
      ],
    },
    {
      id: 5,
      user: "Olivia Martinez",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      date: "2023-07-05",
      comment:
        "Perfect honeymoon destination. The private beach access made us feel like royalty. Staff went above and beyond.",
      images: [],
    },
  ]);

  // Default values for missing fields
  const defaultTrip = {
    id: id,
    title: "Loading Trip...",
    image: "https://images.unsplash.com/photo-1518544866330-95b331ed9cd1",
    mainimage: "https://images.unsplash.com/photo-1518544866330-95b331ed9cd1",
    rating: 4.5,
    location: "Loading...",
    duration: "Loading...",
    groupSize: "Loading...",
    price: 0,
    description: "Loading trip details...",
    highlights: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
  };

  // Fetch tour data based on the ID from the URL
  useEffect(() => {
    const fetchTourData = async () => {
      try {
        setLoading(true);
        const tourData = await getTour(id);
        console.log("Fetched tour data:", tourData);

        // Enhance the tour data with defaults for missing fields needed by the UI
        const enhancedTourData = {
          ...tourData,
          image:
            tourData.mainimage ||
            tourData.image ||
            "https://images.unsplash.com/photo-1518544866330-95b331ed9cd1",
          groupSize:
            tourData.groupSize || tourData.maxGroupSize || "12 people max",
          highlights: tourData.highlights || [
            "Professional, English-speaking guide",
            "All accommodations included",
            "Explore unique local experiences",
          ],
          itinerary: tourData.itinerary || [
            {
              day: 1,
              title: "Day 1",
              description: "Start of your amazing journey...",
            },
          ],
          inclusions: tourData.inclusions || [
            "Accommodation",
            "Transportation",
            "Tour guide",
          ],
          exclusions: tourData.exclusions || [
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
  };

  // Handle booking the trip
  const handleBookNow = () => {
    // Will be implemented when booking API is available
    if (trip) {
      navigate(
        `/booking?tourId=${trip.id}&tourName=${encodeURIComponent(trip.title)}`
      );
    }
  };

  // Handle sharing the trip
  const handleShare = () => {
    // Basic share functionality
    if (navigator.share) {
      navigator
        .share({
          title: trip ? trip.title : "Check out this amazing trip!",
          text: trip
            ? `Check out ${trip.title} on TravelGo!`
            : "Check out this amazing trip on TravelGo!",
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch(() => {
          toast.error("Failed to copy link!");
        });
    }
  };

  // Display either the loaded trip or the default trip if loading
  const displayTrip = trip || defaultTrip;

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
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
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
                  onClick={() => setActiveTab("itinerary")}
                  className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${
                    activeTab === "itinerary"
                      ? "border-b-2 border-[#1784ad] text-[#1784ad]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Itinerary
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
                {activeTab === "overview" && (
                  <TripOverview trip={displayTrip} />
                )}
                {activeTab === "itinerary" && (
                  <TripItinerary itinerary={displayTrip.itinerary} />
                )}
                {activeTab === "reviews" && <TripReviews reviews={reviews} />}
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
                <div className="flex items-center gap-3">
                  <FiUsers className="text-[#1784ad]" />
                  <div>
                    <p className="text-sm text-gray-600">Group Size</p>
                    <p className="font-medium">{displayTrip.groupSize}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="font-medium">Available Tour Dates</h4>

                {/* Date selector - Placeholder for now */}
                <div className="grid grid-cols-3 gap-2">
                  <button className="px-2 py-3 border border-gray-300 rounded-lg text-sm hover:border-[#1784ad] hover:bg-blue-50">
                    Jun 15
                  </button>
                  <button className="px-2 py-3 border border-gray-300 rounded-lg text-sm hover:border-[#1784ad] hover:bg-blue-50">
                    Jul 10
                  </button>
                  <button className="px-2 py-3 border border-gray-300 rounded-lg text-sm hover:border-[#1784ad] hover:bg-blue-50">
                    Aug 5
                  </button>
                  <button className="px-2 py-3 border border-gray-300 rounded-lg text-sm hover:border-[#1784ad] hover:bg-blue-50">
                    Sep 20
                  </button>
                  <button className="px-2 py-3 border border-gray-300 rounded-lg text-sm hover:border-[#1784ad] hover:bg-blue-50">
                    Oct 12
                  </button>
                  <button className="px-2 py-3 border border-gray-300 rounded-lg text-sm hover:border-[#1784ad] hover:bg-blue-50">
                    Nov 8
                  </button>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full py-3 bg-[#1784ad] hover:bg-[#146d8d] text-white font-medium rounded-lg transition-colors"
              >
                Book Now
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">
                  No deposit required. Reserve now & pay later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPage;
