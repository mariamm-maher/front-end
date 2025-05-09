// Step2.jsx - Second step component (gender, nationality, photo)
import { useRef } from "react";
import { FiFlag, FiUsers, FiUpload, FiImage } from "react-icons/fi";
import { motion } from "framer-motion";

const Step2 = ({
  formData,
  handleChange,
  photoPreview,
  handlePhotoChange,
  onSubmit,
  onBack,
}) => {
  const fileInputRef = useRef(null);

  // Common nationalities list
  const nationalities = [
    "American",
    "British",
    "Canadian",
    "Chinese",
    "Egyptian",
    "French",
    "German",
    "Indian",
    "Italian",
    "Japanese",
    "Mexican",
    "Nigerian",
    "Russian",
    "Saudi Arabian",
    "South African",
    "Spanish",
    "Other",
  ];

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="px-8 pb-8" onSubmit={handleSubmit}>
      {/* Profile Photo Upload */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex justify-center"
      >
        <div className="text-center">
          <label className="block text-sm font-medium text-white/80 mb-2">
            Profile Photo
          </label>
          <div
            className="relative cursor-pointer mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-white/30 hover:border-[#1784ad] transition-all"
            onClick={triggerFileInput}
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-white/10">
                <FiImage className="text-white/60 text-3xl" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <FiUpload className="text-white text-xl" />
            </div>
          </div>
          <input
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            accept="image/*"
            className="hidden"
          />
          <p className="text-xs text-white/60 mt-2">Click to upload a photo</p>
        </div>
      </motion.div>

      {/* Gender and Nationality - Side by Side */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6 flex gap-4"
      >
        {/* Gender Selection */}
        <div className="w-1/2">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-white/80 mb-2"
          >
            Gender
          </label>
          <div className="relative">
            <FiUsers className="absolute left-3 top-3 text-white/60" />
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent transition-all"
              required
            >
              <option value="" className="bg-gray-800">
                Select Gender
              </option>
              <option value="male" className="bg-gray-800">
                Male
              </option>
              <option value="female" className="bg-gray-800">
                Female
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Nationality */}
        <div className="w-1/2">
          <label
            htmlFor="nationality"
            className="block text-sm font-medium text-white/80 mb-2"
          >
            Nationality
          </label>
          <div className="relative">
            <FiFlag className="absolute left-3 top-3 text-white/60" />
            <select
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent transition-all"
              required
            >
              <option value="" className="bg-gray-800">
                Select Nationality
              </option>
              {nationalities.map((nationality, index) => (
                <option
                  key={index}
                  value={nationality.toLowerCase()}
                  className="bg-gray-800"
                >
                  {nationality}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="w-1/3 py-4 px-6 rounded-xl font-medium text-white bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          Back
        </motion.button>
        <motion.button
          type="submit"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-2/3 py-4 px-6 rounded-xl font-medium text-white bg-gradient-to-r from-[#1784ad] to-teal-500 hover:from-[#1784ad] hover:to-teal-400 shadow-lg hover:shadow-[#1784ad]/30 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          Sign Up
        </motion.button>
      </div>
    </form>
  );
};

export default Step2;
