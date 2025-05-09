import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiCalendar,
  FiClock,
  FiUsers,
  FiHeart,
  FiShare2,
  FiArrowLeft,
  FiStar,
} from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Trip from "../components/destinationSinglePage/Trip";
import Hero from "../components/destinationSinglePage/Hero";
// Destination data
const destination = {
  id: 1,
  name: "Bali, Indonesia",
  image:
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  location: "Indonesia",
  rating: 4.8,
  description:
    "Bali is a living postcard, an Indonesian paradise that feels like a fantasy. This magical destination has something for everyone, from pristine beaches and volcanic hillsides to lush rice terraces and spiritual retreats.",
  shortDescription:
    "An Indonesian paradise with pristine beaches, volcanic hillsides, and lush rice terraces.",
  bestTime: "April to October",
  popularWith: "Couples, Solo travelers, Families",
  highlights: [
    "Stunning beaches with world-class surfing",
    "Ancient temples and rich cultural heritage",
    "Vibrant nightlife in Seminyak and Canggu",
    "Beautiful rice terraces in Ubud",
    "Delicious Balinese cuisine",
  ],
  travelTips:
    "Bali is generally safe, but be cautious of monkeys in Ubud's Sacred Monkey Forest. Always carry small change for temple donations, and dress modestly when visiting religious sites.",
  activities: [
    "Surfing",
    "Yoga retreats",
    "Temple visits",
    "Rice terrace trekking",
    "Waterfalls",
    "Diving",
    "Balinese cooking classes",
  ],
};

// Enhanced trips data with agency information
const enhancedTrips = [
  {
    id: 1,
    name: "Bali Cultural Experience",
    price: 899,
    duration: "7 days",
    description:
      "Explore Bali's rich culture through temple visits, traditional dances, and local crafts.",
    image:
      "https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    agencyName: "Bali Adventure Tours",
    agencyLogo: "https://randomuser.me/api/portraits/lego/1.jpg",
    agencyRating: 4.7,
    tags: ["Cultural", "Guided Tours", "Local Experiences"],
    groupSize: "8-12 people",
  },
  {
    id: 2,
    name: "Bali Surf Adventure",
    price: 749,
    duration: "5 days",
    description:
      "Catch the best waves in Bali with professional surf instructors.",
    image:
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    agencyName: "Wave Riders Bali",
    agencyLogo: "https://randomuser.me/api/portraits/lego/2.jpg",
    agencyRating: 4.9,
    tags: ["Surfing", "Adventure", "Beginners Welcome"],
    groupSize: "4-8 people",
  },
  {
    id: 3,
    name: "Luxury Bali Retreat",
    price: 1499,
    duration: "10 days",
    description:
      "Experience Bali in ultimate luxury with private villas and personalized service.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    agencyName: "Elite Bali Vacations",
    agencyLogo: "https://randomuser.me/api/portraits/lego/3.jpg",
    agencyRating: 4.8,
    tags: ["Luxury", "Private Villas", "Spa"],
    groupSize: "Private",
  },
  {
    id: 4,
    name: "Bali Honeymoon Package",
    price: 1299,
    duration: "8 days",
    description:
      "Romantic getaway with private dinners, couple spa treatments, and sunset cruises.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    agencyName: "Romantic Bali Getaways",
    agencyLogo: "https://randomuser.me/api/portraits/lego/4.jpg",
    agencyRating: 4.9,
    tags: ["Honeymoon", "Romantic", "Couples Only"],
    groupSize: "2 people",
  },
];

// Enhanced Trip component with more details

const DestinationPage = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("trips");

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <Hero destination={destination} />
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="">
            {/* Destination Actions */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
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

            {/* Tab Content */}
            <div className="mb-12 ">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      All the trips in {destination.name}
                    </h2>

                    {enhancedTrips.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enhancedTrips.map((trip) => (
                          <Trip key={trip.id} trip={trip} />
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                        <p className="text-gray-500">
                          No trips available for this destination yet.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationPage;
