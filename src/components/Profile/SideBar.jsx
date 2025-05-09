import {
  FiUser,
  FiHeart,
  FiCalendar,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
function SideBar({ activeTab, setActiveTab }) {
  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg ${
              activeTab === "bookings"
                ? "bg-[#1784ad]/10 text-[#1784ad]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiCalendar />
            <span>My Bookings</span>
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg ${
              activeTab === "favorites"
                ? "bg-[#1784ad]/10 text-[#1784ad]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiHeart />
            <span>Favorites</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg ${
              activeTab === "profile"
                ? "bg-[#1784ad]/10 text-[#1784ad]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiUser />
            <span>Profile Settings</span>
          </button>
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-600 hover:bg-gray-100">
            <FiSettings />
            <span>Account Settings</span>
          </button>
          <button className="flex items-center gap-3 w-full p-3 rounded-lg text-red-500 hover:bg-red-50 mt-2">
            <FiLogOut />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
