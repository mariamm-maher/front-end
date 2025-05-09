import { useState } from "react";
import {
  FiX,
  FiGlobe,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiPackage,
  FiLoader,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getTravelAgency } from "../../../services/AdminApi"; // Update path as needed

function ViewAgencyModal({ agencyId, onClose }) {
  // Fetch agency data using react-query
  const {
    data: agencyData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["travelAgency", agencyId],
    queryFn: () => getTravelAgency(agencyId),
  });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };
  console.log(agencyId);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-[#0f3a4d] to-[#1a4f69] rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-xl font-semibold text-white"
          >
            Travel Agency Details
          </motion.h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin text-[#1784ad] mb-4">
                <svg
                  className="w-12 h-12"
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
              </div>
              <p className="text-white/70">Loading agency information...</p>
            </div>
          )}

          {isError && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-white text-center my-8">
              <p className="text-lg font-medium mb-2">Error Loading Data</p>
              <p className="text-white/80">
                {error?.message ||
                  "Failed to load agency information. Please try again."}
              </p>
            </div>
          )}

          {!isLoading && !isError && agencyData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Agency Profile Section */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-40 h-40 mb-4 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                    {agencyData.profilePicture ? (
                      <img
                        src={agencyData.profilePicture}
                        alt="Agency profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiUser className="w-16 h-16 text-white/50" />
                    )}
                  </div>

                  <h3 className="text-2xl font-semibold text-white text-center mb-2">
                    {agencyData.name || agencyData.agencyName}
                  </h3>

                  <div className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium mb-4">
                    {agencyData.status || "Active"}
                  </div>

                  <div className="w-full space-y-3 mt-4">
                    <div className="flex items-center text-white/80">
                      <FiCalendar className="w-5 h-5 mr-3 text-[#1784ad]" />
                      <span className="text-sm">
                        Joined:{" "}
                        {formatDate(
                          agencyData.joinDate || agencyData.createdAt
                        )}
                      </span>
                    </div>

                    <div className="flex items-center text-white/80">
                      <FiPackage className="w-5 h-5 mr-3 text-[#1784ad]" />
                      <span className="text-sm">
                        Tours: {agencyData.toursCount || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center text-white/80">
                      <FiMapPin className="w-5 h-5 mr-3 text-[#1784ad]" />
                      <span className="text-sm">
                        {agencyData.city}, {agencyData.country}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Information Section */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4 border-b border-white/20 pb-2">
                      Contact Information
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center text-white/80">
                        <FiMail className="w-5 h-5 mr-3 text-[#1784ad]" />
                        <span>{agencyData.email}</span>
                      </div>

                      <div className="flex items-center text-white/80">
                        <FiPhone className="w-5 h-5 mr-3 text-[#1784ad]" />
                        <span>
                          {agencyData.contact || agencyData.phone || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4 border-b border-white/20 pb-2">
                      Social Media
                    </h3>

                    <div className="space-y-4">
                      {agencyData.website && (
                        <div className="flex items-center text-white/80">
                          <FiGlobe className="w-5 h-5 mr-3 text-[#1784ad]" />
                          <a
                            href={agencyData.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#1784ad] transition-colors"
                          >
                            {agencyData.website.replace(/(^\w+:|^)\/\//, "")}
                          </a>
                        </div>
                      )}

                      {agencyData.facebook && (
                        <div className="flex items-center text-white/80">
                          <FiFacebook className="w-5 h-5 mr-3 text-[#1784ad]" />
                          <a
                            href={agencyData.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#1784ad] transition-colors"
                          >
                            Facebook
                          </a>
                        </div>
                      )}

                      {agencyData.instagram && (
                        <div className="flex items-center text-white/80">
                          <FiInstagram className="w-5 h-5 mr-3 text-[#1784ad]" />
                          <a
                            href={agencyData.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#1784ad] transition-colors"
                          >
                            Instagram
                          </a>
                        </div>
                      )}

                      {agencyData.twitter && (
                        <div className="flex items-center text-white/80">
                          <FiTwitter className="w-5 h-5 mr-3 text-[#1784ad]" />
                          <a
                            href={agencyData.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#1784ad] transition-colors"
                          >
                            Twitter
                          </a>
                        </div>
                      )}

                      {!agencyData.website &&
                        !agencyData.facebook &&
                        !agencyData.instagram &&
                        !agencyData.twitter && (
                          <p className="text-white/50 text-sm italic">
                            No social media links available
                          </p>
                        )}
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex justify-end space-x-3"
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ViewAgencyModal;
