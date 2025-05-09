import { motion } from "framer-motion";
import { FiMapPin, FiStar, FiChevronRight } from "react-icons/fi";

function Destination({ destination }) {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 0.98 }}
      className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-96 grid grid-cols-3"
    >
      {/* Left Side - Destination Info */}
      <div className="col-span-2 relative">
        <motion.img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Destination Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white font-light">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-serif font-semibold drop-shadow-md">
              {destination.name}
            </h3>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center text-sm bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm"
            >
              <FiMapPin className="mr-1" />
              {destination.location}
            </motion.div>
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center p-6 text-white text-center"
        >
          <motion.h3
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-serif font-bold mb-2"
          >
            {destination.name}
          </motion.h3>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-sm"
          >
            {destination.description}
          </motion.p>
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center text-sm bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Explore more <FiChevronRight className="ml-1" />
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Trip Images */}
      <div className="h-full p-2 grid grid-rows-2 grid-cols-2 gap-2">
        {destination.trips.slice(0, 4).map((trip, index) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, zIndex: 1 }}
            className="w-full h-full bg-white/30 rounded-lg shadow-inner flex items-center justify-center text-[8px] text-white text-center px-1 relative overflow-hidden"
          >
            <img
              src={trip.image}
              alt={trip.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <span className="relative z-10 leading-tight font-medium text-xs drop-shadow-md">
              {trip.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Destination;
