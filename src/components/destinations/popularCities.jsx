import { FiMapPin, FiStar, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
function PopularCities() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Popular City Breaks
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {["Paris", "London", "Tokyo", "Dubai", "Sydney", "Barcelona"].map(
          (city, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="group relative h-32 rounded-lg overflow-hidden shadow-md cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
              <div className="absolute bottom-0 left-0 p-3 z-20">
                <h3 className="text-white font-medium">{city}</h3>
              </div>
              <div className="absolute top-0 right-0 p-2 z-20">
                <FiMapPin className="text-white/80" />
              </div>
              <img
                src={`https://source.unsplash.com/random/300x200/?${city.toLowerCase()},city`}
                alt={city}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}

export default PopularCities;
