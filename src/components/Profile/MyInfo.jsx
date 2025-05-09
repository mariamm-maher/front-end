import { FiEdit } from "react-icons/fi";

const MyInfo = ({ userData, editMode, setEditMode, handleInputChange }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
        <button
          onClick={() => setEditMode(!editMode)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          <FiEdit />
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg">{userData.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg">
                {userData.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            {editMode ? (
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg">
                {userData.phone}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            {editMode ? (
              <input
                type="text"
                name="location"
                value={userData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg">
                {userData.location}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          {editMode ? (
            <textarea
              name="bio"
              value={userData.bio}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
            />
          ) : (
            <p className="px-4 py-2 bg-gray-50 rounded-lg">{userData.bio}</p>
          )}
        </div>

        {editMode && (
          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={() => setEditMode(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-[#1784ad] hover:bg-[#147399] text-white rounded-lg">
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInfo;
