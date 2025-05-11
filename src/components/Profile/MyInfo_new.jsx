import { FiEdit } from "react-icons/fi";

const MyInfo = ({
  userData,
  editMode,
  setEditMode,
  handleInputChange,
  handleProfileUpdate,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
        <button
          onClick={() => (editMode ? handleProfileUpdate() : setEditMode(true))}
          className={`flex items-center gap-2 px-4 py-2 ${
            editMode
              ? "bg-[#1784ad] text-white hover:bg-[#146d8d]"
              : "bg-gray-100 hover:bg-gray-200"
          } rounded-lg`}
        >
          <FiEdit />
          {editMode ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            {editMode ? (
              <input
                type="text"
                name="firstname"
                value={userData.firstname}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg">
                {userData.firstname}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            {editMode ? (
              <input
                type="text"
                name="lastname"
                value={userData.lastname}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg">
                {userData.lastname}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                disabled={true}
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg">
                {userData.email}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
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
                {userData.phone || "Not specified"}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nationality
            </label>
            {editMode ? (
              <input
                type="text"
                name="nationality"
                value={userData.nationality}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg">
                {userData.nationality || "Not specified"}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            {editMode ? (
              <select
                name="gender"
                value={userData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg">
                {userData.gender || "Not specified"}
              </p>
            )}
          </div>
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
            ></textarea>
          ) : (
            <p className="px-4 py-2 bg-gray-50 rounded-lg min-h-[75px]">
              {userData.bio}
            </p>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Member since: {userData.joinedDate}
          </p>
        </div>

        {editMode && (
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 mr-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInfo;
