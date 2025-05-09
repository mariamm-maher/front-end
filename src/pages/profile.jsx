import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import SideBar from "../components/Profile/SideBar";
import MyBookings from "../components/Profile/Mybooking";
import MyFavorites from "../components/Profile/Myfavouirtes";
import MyInfo from "../components/Profile/MyInfo";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Avid traveler and adventure seeker. Love exploring new cultures and cuisines.",
    joinedDate: "January 2022",
  });

  // Sample bookings data
  const bookings = [
    {
      id: 1,
      tripName: "Bali Cultural Experience",
      image:
        "https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "2023-06-15",
      status: "completed",
      price: 899,
      duration: "7 days",
      bookingId: "TRP-789456",
    },
    {
      id: 2,
      tripName: "Luxury Bali Retreat",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "2023-08-20",
      status: "upcoming",
      price: 1499,
      duration: "10 days",
      bookingId: "TRP-123789",
    },
    {
      id: 3,
      tripName: "Japanese Cherry Blossom Tour",
      image:
        "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "2023-04-05",
      status: "cancelled",
      price: 1299,
      duration: "8 days",
      bookingId: "TRP-456123",
    },
  ];

  // Sample favorites data
  const favorites = [
    {
      id: 1,
      name: "Greek Island Hopping",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      location: "Greece",
      price: 1099,
      rating: 4.9,
    },
    {
      id: 2,
      name: "Patagonia Hiking Adventure",
      image:
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      location: "Chile",
      price: 1599,
      rating: 4.8,
    },
    {
      id: 3,
      name: "Safari in Serengeti",
      image:
        "https://images.unsplash.com/photo-1518544866330-95b331ed7cd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      location: "Tanzania",
      price: 1999,
      rating: 5.0,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <ProfileHeader userData={userData} />
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Navigation */}
          <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Right Column - Content */}
          <div className="lg:w-3/4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                {activeTab === "bookings" && <MyBookings bookings={bookings} />}
                {activeTab === "favorites" && (
                  <MyFavorites favorites={favorites} />
                )}
                {activeTab === "profile" && (
                  <MyInfo
                    userData={userData}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    handleInputChange={handleInputChange}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
