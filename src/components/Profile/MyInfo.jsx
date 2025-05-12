import { FiEdit } from "react-icons/fi";

const MyInfo = ({
  userData,
  editMode,
  setEditMode,
  handleInputChange,
  handleSaveProfile,
  isSaving,
  saveError,
  saveSuccess,
}) => {
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
            <p className="px-4 py-2 bg-gray-50 rounded-lg">{userData.email}</p>
          )}
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
                {userData.nationality}
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
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg">
                {userData.gender
                  ? userData.gender.charAt(0).toUpperCase() +
                    userData.gender.slice(1)
                  : ""}
              </p>
            )}
          </div>
        </div>{" "}
        {editMode && (
          <div className="flex flex-col space-y-3">
            {saveError && <p className="text-red-500 text-sm">{saveError}</p>}
            {saveSuccess && (
              <p className="text-green-500 text-sm">
                Profile updated successfully!
              </p>
            )}
            <div className="flex justify-end gap-4 pt-2">
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2 bg-[#1784ad] hover:bg-[#147399] text-white rounded-lg flex items-center"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInfo;
