import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiStar,
  FiArrowRight,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Trip = ({ trip }) => {
  const navigate = useNavigate();

  const handleTripClick = () => {
    navigate(`/trip/${trip.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleTripClick}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-40">
        <img
          src={
            trip.mainimage ||
            "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <FiStar className="text-yellow-400 mr-1" size={12} />
          {trip.rating || "4.5"}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">
          {trip.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {trip.description}
        </p>
        <div className="space-y-2 text-sm mb-4">
          <div className="flex items-center text-gray-700">
            <FiMapPin className="mr-2 text-[#1784ad]" size={14} />
            <span>{trip.location || "Unknown location"}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FiCalendar className="mr-2 text-[#1784ad]" size={14} />
            <span>
              {trip.startDate
                ? new Date(trip.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "Flexible dates"}
            </span>
          </div>
          <div className="flex items-center text-gray-700">
            <FiClock className="mr-2 text-[#1784ad]" size={14} />
            <span>{trip.duration || `${trip.numberOfDays || 3} days`}</span>
          </div>
        </div>{" "}
        <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="font-bold text-[#1784ad]">
            ${trip.price ? trip.price.toLocaleString() : "TBD"}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/trip/${trip.id}`);
            }}
            className="bg-[#1784ad] hover:bg-[#147399] text-white px-3 py-1.5 rounded-lg text-sm flex items-center transition-colors"
          >
            <span>View Details</span>
            <FiArrowRight className="ml-1" size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const TripList = ({ trips }) => {
  return (
    <AnimatePresence>
      {trips.length > 0 ? (
        trips.map((trip) => <Trip key={trip.id} trip={trip} />)
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="col-span-full text-center py-12"
        >
          <h3 className="text-lg font-medium text-gray-700">
            No trips match your search
          </h3>
          <p className="text-gray-500 mt-2 text-sm">
            Try adjusting your filters
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TripList;
