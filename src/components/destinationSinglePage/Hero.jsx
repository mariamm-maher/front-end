import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiArrowLeft, FiStar } from "react-icons/fi";
function Hero({ destination }) {
  const navigate = useNavigate();
  return (
    <div className="relative h-96 w-full">
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 transition-colors"
      >
        <FiArrowLeft className="mr-2" />
        Back
      </button>

      <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-8">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-2"
        >
          {destination.name}
        </motion.h1>
        <div className="flex items-center gap-4 text-white">
          <div className="flex items-center">
            <FiStar className="text-yellow-400 mr-1" />
            <span>{destination.rating}</span>
          </div>
          <div className="flex items-center">
            <FiMapPin className="mr-1" />
            <span>{destination.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
