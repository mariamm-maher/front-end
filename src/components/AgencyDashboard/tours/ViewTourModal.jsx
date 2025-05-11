import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiCalendar,
  FiMapPin,
  FiDollarSign,
  FiUsers,
  FiTruck,
  FiHome,
} from "react-icons/fi";

const ViewTourModal = ({ isOpen, onClose, tour }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Format date to a readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate tour duration in days
  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return "N/A";

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays} days`;
  };

  // Handle changing main image
  const handleThumbnailClick = (index) => {
    setActiveImageIndex(index);
  };

  // Get the image source for main display
  const getMainImageSource = () => {
    // If we have photos array and it's not empty
    if (tour.photos && tour.photos.$values && tour.photos.$values.length > 0) {
      return tour.photos.$values[activeImageIndex];
    }
    // Otherwise use the main image if available
    if (tour.mainimage) {
      return tour.mainimage;
    }
    // Default placeholder image
    return "https://via.placeholder.com/600x400?text=No+Image+Available";
  };

  // Get all available images for thumbnails
  const getAllImages = () => {
    let images = [];
    if (tour.photos && tour.photos.$values) {
      images = [...tour.photos.$values];
    }
    if (tour.mainimage && !images.includes(tour.mainimage)) {
      images.unshift(tour.mainimage);
    }
    return images;
  };

  if (!isOpen || !tour) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Header with close button */}
                <div className="flex justify-between items-center px-6 py-4 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Tour Details
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row">
                  {/* Left side - Images */}
                  <div className="w-full md:w-1/2 p-6">
                    {/* Main image */}
                    <div className="mb-4 relative h-64 rounded-lg overflow-hidden">
                      <img
                        src={getMainImageSource()}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Thumbnails */}
                    {getAllImages().length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {getAllImages().map((img, index) => (
                          <div
                            key={index}
                            className={`h-16 rounded overflow-hidden cursor-pointer ${
                              index === activeImageIndex
                                ? "ring-2 ring-blue-500"
                                : ""
                            }`}
                            onClick={() => handleThumbnailClick(index)}
                          >
                            <img
                              src={img}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right side - Details */}
                  <div className="w-full md:w-1/2 p-6">
                    {/* Title and category */}
                    <div className="mb-4">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {tour.title}
                      </h1>
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {tour.category}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center mb-4 text-lg">
                      <FiDollarSign className="text-gray-500 mr-2" />
                      <span className="font-bold text-gray-900">
                        ${tour.price?.toFixed(2)}
                      </span>
                      <span className="text-gray-500 ml-1">per person</span>
                    </div>

                    {/* Key details in grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {/* Location */}
                      <div className="flex items-start">
                        <FiMapPin className="text-gray-500 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Location
                          </p>
                          <p className="text-gray-900">
                            {tour.location || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="flex items-start">
                        <FiCalendar className="text-gray-500 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Duration
                          </p>
                          <p className="text-gray-900">
                            {calculateDuration(tour.startDate, tour.endDate)}
                          </p>
                        </div>
                      </div>

                      {/* Available Seats */}
                      <div className="flex items-start">
                        <FiUsers className="text-gray-500 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Available Seats
                          </p>
                          <p className="text-gray-900">
                            {tour.availableSeats || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Travel Agency */}
                      <div className="flex items-start">
                        <FiHome className="text-gray-500 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Travel Agency
                          </p>
                          <p className="text-gray-900">
                            {tour.travelAgencyName || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Transportation */}
                      <div className="flex items-start">
                        <FiTruck className="text-gray-500 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Transportation
                          </p>
                          <p className="text-gray-900">
                            {tour.transportation || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Accommodation */}
                      <div className="flex items-start">
                        <FiHome className="text-gray-500 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Accommodation
                          </p>
                          <p className="text-gray-900">
                            {tour.accomodation || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="mb-6 border-t border-b py-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Start Date
                          </p>
                          <p className="text-gray-900">
                            {formatDate(tour.startDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            End Date
                          </p>
                          <p className="text-gray-900">
                            {formatDate(tour.endDate)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Description
                      </h3>
                      <p className="text-gray-700">
                        {tour.description || "No description available."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer with action buttons */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ViewTourModal;
