import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import ProfileHeader from "../components/Profile/ProfileHeader";
import SideBar from "../components/Profile/SideBar";
import MyBookings from "../components/Profile/Mybooking";
import MyFavorites from "../components/Profile/Myfavouirtes";
import MyInfo from "../components/Profile/MyInfo_new";
import {
  getTouristProfile,
  updateTouristProfile,
} from "../services/touristApi";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    nationality: "",
    gender: "",
    email: "",
    phone: "",
    location: "",
    bio: "Avid traveler and adventure seeker.",
    joinedDate: "January 2022",
  });

  const [bookings, setBookings] = useState([]);
  const [favorites] = useState([
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
  ]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const profileData = await getTouristProfile();
        console.log("Profile API response:", profileData);

        if (profileData) {
          // Update user data from the profile response
          setUserData({
            firstname: profileData.firstname || "",
            lastname: profileData.lastname || "",
            nationality: profileData.nationality || "",
            gender: profileData.gender || "",
            email: profileData.email || "",
            phone: profileData.phone || "",
            location: profileData.location || "Not specified",
            bio: "Avid traveler and adventure seeker.",
            joinedDate: "January 2022",
          });

          // Process bookings if available
          if (
            profileData.bookings &&
            profileData.bookings.$values &&
            Array.isArray(profileData.bookings.$values)
          ) {
            // Transform booking data to match the expected format
            const formattedBookings = profileData.bookings.$values.map(
              (booking, index) => ({
                id: booking.id || index + 1,
                tripName: booking.tourName || "Trip " + (index + 1),
                image:
                  booking.tourImage ||
                  "https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                date:
                  booking.bookingDate || new Date().toISOString().split("T")[0],
                status: booking.status || "upcoming",
                price: booking.price || 899,
                duration: booking.duration || "7 days",
                bookingId:
                  booking.bookingId ||
                  `TRP-${Math.floor(Math.random() * 1000000)}`,
              })
            );

            setBookings(formattedBookings);
          } else {
            // Use empty bookings array if none available
            setBookings([]);
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data");
        toast.error("Failed to load profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      // Prepare data for update
      const updateData = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        nationality: userData.nationality,
        gender: userData.gender,
      };

      const response = await updateTouristProfile(updateData);
      console.log("Profile update response:", response);

      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-[#1784ad] border-opacity-50 rounded-full animate-spin mb-4"></div>
            <p>Loading your profile data...</p>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <ProfileHeader userData={userData} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Navigation */}
          <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Right Column - Content */}
          <div className="lg:w-3/4">
            {error ? (
              <div className="bg-red-100 p-4 rounded-xl text-red-800">
                <h3 className="font-bold mb-2">Error</h3>
                <p>{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800"
                >
                  Retry
                </button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  {activeTab === "bookings" && (
                    <MyBookings bookings={bookings} />
                  )}
                  {activeTab === "favorites" && (
                    <MyFavorites favorites={favorites} />
                  )}
                  {activeTab === "profile" && (
                    <MyInfo
                      userData={userData}
                      editMode={editMode}
                      setEditMode={setEditMode}
                      handleInputChange={handleInputChange}
                      handleProfileUpdate={handleProfileUpdate}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
