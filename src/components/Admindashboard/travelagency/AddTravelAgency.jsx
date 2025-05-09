import { useState } from "react";
import {
  FiX,
  FiGlobe,
  FiUpload,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { addTravelAgency } from "../../../services/AdminApi"; // Update path as needed

function AddAgencyModal({ onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "TravelAgency",
    agencyName: "",
    city: "",
    country: "",
    contact: "",
    profilePicture: null,
    website: "",
    facebook: "",
    instagram: "",
    twitter: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTravelAgency,
    onMutate: () => {
      // Show loading toast
      toast.loading("Adding travel agency...", {
        id: "add-travel-agency", // Unique ID to update the same toast later
      });
    },
    onSuccess: () => {
      // Invalidate queries and show success toast
      queryClient.invalidateQueries({ queryKey: ["travelAgencies"] });
      toast.success("Travel agency added successfully!", {
        id: "add-travel-agency", // Same ID to replace the loading toast
      });
      onClose();
    },
    onError: (error) => {
      // Show error toast
      toast.error(`Error adding travel agency: ${error.message}`, {
        id: "add-travel-agency", // Same ID to replace the loading toast
      });
      console.error("Error adding travel agency:", error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, profilePicture: file }));

      // Create preview URL for the selected image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log form data for debugging
    console.log("Form submission data:", formData);

    const submitData = {
      email: formData.email,
      password: formData.password,
      role: "TravelAgency",
      agencyName: formData.agencyName,
      city: formData.city,
      country: formData.country,
      contact: formData.contact,
      profilePicture: formData.profilePicture || "", // keep as is for now
      address: "",
      // website: formData.website,
      // facebook: formData.facebook,
      // instagram: formData.instagram,
      // twitter: formData.twitter,
    };

    console.log("Data being sent to API:", submitData);
    mutation.mutate(submitData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-[#1e2939] to-[#0f3a4d] rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-xl font-semibold text-white"
          >
            Add New Travel Agency
          </motion.h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium text-white mb-3">
                Account Details
              </h3>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-3 pr-10 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
                    placeholder="Enter a secure password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-white/60 hover:text-white/90 transition-colors" />
                    ) : (
                      <FiEye className="text-white/60 hover:text-white/90 transition-colors" />
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium text-white mb-3">
                Profile Picture
              </h3>

              <div className="flex flex-col items-center">
                <div className="w-32 h-32 mb-4 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUpload className="w-8 h-8 text-white/50" />
                  )}
                </div>

                <label className="px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white hover:bg-white/20 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  Choose Profile Picture
                </label>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium text-white mb-3">
                Agency Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Agency Name *
                </label>
                <input
                  type="text"
                  name="agencyName"
                  value={formData.agencyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
                  placeholder="Enter agency name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
                  placeholder="City name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
                  placeholder="Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Contact *
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
                  placeholder="Phone or contact name"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium text-white mb-3">
                Social Media Links (Optional)
              </h3>

              <div className="relative">
                <FiGlobe className="absolute left-3 top-3 text-white/60" />
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
                  placeholder="Website URL"
                />
              </div>

              <div className="relative">
                <FiFacebook className="absolute left-3 top-3 text-white/60" />
                <input
                  type="url"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
                  placeholder="Facebook Page"
                />
              </div>

              <div className="relative">
                <FiInstagram className="absolute left-3 top-3 text-white/60" />
                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
                  placeholder="Instagram Profile"
                />
              </div>

              <div className="relative">
                <FiTwitter className="absolute left-3 top-3 text-white/60" />
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
                  placeholder="Twitter Profile"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex justify-end space-x-3"
          >
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="px-5 py-2.5 bg-[#1784ad] text-white rounded-lg hover:bg-[#14739c] disabled:opacity-50 shadow-lg shadow-[#1784ad]/30 transition-all"
            >
              {mutation.isLoading ? "Saving..." : "Save Agency"}
            </button>
          </motion.div>
          {mutation.isError && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
              {mutation.error?.message ||
                "An error occurred while adding the agency. Please try again."}
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
}

export default AddAgencyModal;
