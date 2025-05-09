import { motion } from "framer-motion";
import { FiCalendar, FiUsers, FiStar } from "react-icons/fi";
const TripCard = ({ trip }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="md:flex">
        <div className="md:w-1/3">
          <motion.img
            src={trip.image}
            alt={trip.name}
            className="w-full h-64 md:h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="p-8 md:w-2/3">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-800">{trip.name}</h3>
            <span className="text-xl font-semibold text-[#1784ad]">
              {trip.price}
            </span>
          </div>

          <p className="text-gray-600 mb-6">{trip.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <FiCalendar className="text-[#1784ad] mr-2" />
              <span className="text-gray-700">{trip.duration}</span>
            </div>
            <div className="flex items-center">
              <FiCalendar className="text-[#1784ad] mr-2" />
              <span className="text-gray-700">{trip.dates}</span>
            </div>
            <div className="flex items-center">
              <FiUsers className="text-[#1784ad] mr-2" />
              <span className="text-gray-700">{trip.groupSize}</span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">
              Trip Highlights:
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {trip.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <FiStar className="text-[#1784ad] mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center">
            <button className="px-6 py-3 bg-[#1784ad] hover:bg-[#147399] text-white rounded-lg font-medium">
              Book This Trip
            </button>
            <button className="px-6 py-3 border border-[#1784ad] text-[#1784ad] hover:bg-[#1784ad]/10 rounded-lg font-medium">
              View Full Itinerary
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TripCard;
