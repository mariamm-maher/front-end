import { FiMapPin, FiEdit } from "react-icons/fi";

function ProfileHeader({ userData }) {
  return (
    <div className="bg-gradient-to-r from-[#1784ad] to-[#324252] py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
              <FiEdit className="text-[#1784ad]" />
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {userData.firstname} {userData.lastname}
            </h1>
            <p className="flex items-center gap-2 mt-2">
              <FiMapPin /> {userData.location || "Location not specified"}
            </p>
            <p className="mt-2 opacity-90">
              Member since {userData.joinedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
