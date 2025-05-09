import { motion } from "framer-motion";
import { FiMapPin, FiStar } from "react-icons/fi";

function Hero({ trip }) {
  return (
    <div className="relative h-96 w-full">
      <img
        src={trip.image}
        alt={trip.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-8">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-2"
        >
          {trip.title}
        </motion.h1>
        <div className="flex items-center gap-4 text-white">
          <div className="flex items-center">
            <FiStar className="text-yellow-400 mr-1" />
            <span>{trip.rating}</span>
          </div>
          <div className="flex items-center">
            <FiMapPin className="mr-1" />
            <span>{trip.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
