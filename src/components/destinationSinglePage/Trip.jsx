import { motion } from "framer-motion";
import { FiClock, FiUsers, FiStar } from "react-icons/fi";
const Trip = ({ trip }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
    >
      <img
        src={trip.image}
        alt={trip.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 text-lg">{trip.name}</h3>
          <span className="font-bold text-[#1784ad] text-xl">
            ${trip.price}
          </span>
        </div>

        {/* Travel Agency Info */}
        <div className="flex items-center mb-3">
          <img
            src={trip.agencyLogo}
            alt={trip.agencyName}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-sm text-gray-600">{trip.agencyName}</span>
          <div className="flex items-center ml-auto">
            <FiStar className="text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{trip.agencyRating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3">{trip.description}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          {trip.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <FiClock className="w-4 h-4" />
            <span>{trip.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiUsers className="w-4 h-4" />
            <span>Group size: {trip.groupSize || "Flexible"}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 bg-[#1784ad] hover:bg-[#147399] text-white font-medium py-2 rounded-lg text-sm"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Trip;
