import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import SideBar from "../components/Profile/SideBar";
import MyBookings from "../components/Profile/Mybooking";
import MyFavorites from "../components/Profile/Myfavouirtes";
import MyInfo from "../components/Profile/MyInfo";
import {
  getTouristProfile,
  updateTouristProfile,
  getBookings,
} from "../services/touristApi";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    profilePic: "",
    nationality: "",
    gender: "",
    name: "",
  });
  const [bookingsData, setBookingsData] = useState([]);
  const [isBookingsLoading, setIsBookingsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      setSaveError("");
      setSaveSuccess(false);

      // Extract relevant profile data
      const profileData = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        nationality: userData.nationality,
        gender: userData.gender,
      };

      await updateTouristProfile(profileData);
      setSaveSuccess(true);
      setEditMode(false);

      // Refresh the profile data
      const response = await getTouristProfile();
      if (response && response.result) {
        const refreshedData = response.result;
        setUserData({
          firstname: refreshedData.firstname || "",
          lastname: refreshedData.lastname || "",
          email: refreshedData.email || "",
          profilePic: refreshedData.profilePic || "",
          nationality: refreshedData.nationality || "",
          gender: refreshedData.gender || "",
          name: `${refreshedData.firstname || ""} ${
            refreshedData.lastname || ""
          }`.trim(),
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveError(
        error.message || "Failed to update profile. Please try again."
      );
    } finally {
      setIsSaving(false);

      // Clear success message after 3 seconds
      if (saveSuccess) {
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      }
    }
  };

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await getTouristProfile();
        if (response && response.result) {
          const profileData = response.result;
          setUserData({
            firstname: profileData.firstname || "",
            lastname: profileData.lastname || "",
            email: profileData.email || "",
            profilePic: profileData.profilePic || "",
            nationality: profileData.nationality || "",
            gender: profileData.gender || "",
            name: `${profileData.firstname || ""} ${
              profileData.lastname || ""
            }`.trim(),
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch bookings data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsBookingsLoading(true);
        const response = await getBookings();
        if (response && response.bookings && response.bookings.$values) {
          setBookingsData(response.bookings.$values);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsBookingsLoading(false);
      }
    };

    fetchBookings();
  }, []);
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

    // Update the name field when firstname or lastname changes
    if (name === "firstname" || name === "lastname") {
      setUserData((prev) => ({
        ...prev,
        name:
          name === "firstname"
            ? `${value} ${prev.lastname}`.trim()
            : `${prev.firstname} ${value}`.trim(),
      }));
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Profile Header */}
      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ProfileHeader userData={userData} />
      )}
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
                {isLoading ? (
                  <div className="flex justify-center items-center p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <>
                    {" "}
                    {activeTab === "bookings" && (
                      <MyBookings
                        bookings={bookingsData}
                        isLoading={isBookingsLoading}
                      />
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
                        handleSaveProfile={handleSaveProfile}
                        isSaving={isSaving}
                        saveError={saveError}
                        saveSuccess={saveSuccess}
                      />
                    )}
                  </>
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
