import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiUsers, FiHeart, FiShare2 } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
import { useState } from "react";
import Hero from "../components/Trip/Hero";
// import ReviewCard from "../components/Trip/ReviewCard";
import TripOverview from "../components/Trip/TripOverView";
import TripItinerary from "../components/Trip/TripItinerary";
import TripReviews from "../components/Trip/tripReview";

const TripPage = () => {
  // Sample trip data
  const trip = {
    id: 1,
    title: "Luxury Bali Adventure",
    image: "https://images.unsplash.com/photo-1518544866330-95b331ed9cd1",
    rating: 4.9,
    location: "Bali, Indonesia",
    duration: "7 days",
    groupSize: "12 people max",
    price: 2499,
    description: "Experience the ultimate luxury adventure in Bali...",
    highlights: [
      "Private villa accommodation with ocean views",
      "Sunrise hike at Mount Batur",
      "Traditional Balinese cooking class",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Ubud",
        description: "Airport pickup and transfer to your luxury villa...",
      },
    ],
    inclusions: ["6 nights luxury accommodation", "All ground transportation"],
    exclusions: ["International flights", "Travel insurance"],
  };

  const reviews = [
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
  ];

  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Image - Full width */}
      <Hero trip={trip} />

      {/* Main Content - Full width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content (2/3 width) */}
          <div className="lg:w-2/3">
            {/* Trip Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {trip.title}
                </h1>
                <div className="flex items-center mt-2">
                  <FiStar className="text-yellow-400 mr-1" />
                  <span className="text-gray-700">{trip.rating}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600">{trip.location}</span>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-[#1784ad]">
                  ${trip.price.toLocaleString()}
                  <span className="text-lg font-normal text-gray-500 ml-2">
                    per person
                  </span>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-full ${
                      isFavorite ? "bg-red-100 text-red-500" : "bg-gray-100"
                    }`}
                  >
                    <FiHeart
                      className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                    />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-full bg-gray-100"
                  >
                    <FiShare2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Book Now Button - Sticky */}
            <div className="sticky top-4 z-10 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#1784ad] to-[#14a3b8] hover:from-[#147399] hover:to-[#118a9e] text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Book Now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "itinerary", label: "Itinerary" },
                  { id: "reviews", label: "Reviews" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-[#1784ad] text-[#1784ad]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mb-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "overview" && <TripOverview trip={trip} />}
                  {activeTab === "itinerary" && (
                    <TripItinerary itinerary={trip.itinerary} />
                  )}
                  {activeTab === "reviews" && (
                    <TripReviews reviews={reviews} rating={trip.rating} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column - Sidebar (1/3 width) */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Quick Facts
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiCalendar className="text-[#1784ad] mt-1 mr-3 w-5 h-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Duration</h4>
                    <p className="text-gray-600">{trip.duration}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiUsers className="text-[#1784ad] mt-1 mr-3 w-5 h-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Group Size</h4>
                    <p className="text-gray-600">{trip.groupSize}</p>
                  </div>
                </div>
                {/* Add more quick facts as needed */}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Have Questions?
                </h3>
                <button className="w-full bg-white border border-[#1784ad] text-[#1784ad] hover:bg-[#1784ad]/10 font-medium py-3 px-4 rounded-lg transition-colors">
                  Contact Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPage;
