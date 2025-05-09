import { motion } from "framer-motion";
import { FiStar, FiMapPin, FiHeart } from "react-icons/fi";

const MyFavorites = ({ favorites }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <motion.div
            whileHover={{ y: -5 }}
            key={item.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold">{item.name}</h3>
                <div className="flex items-center">
                  <FiStar className="text-yellow-400" />
                  <span className="ml-1">{item.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-1 flex items-center">
                <FiMapPin className="mr-1" /> {item.location}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-[#1784ad]">${item.price}</span>
                <div className="flex gap-2">
                  <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
                    <FiHeart className="text-red-500 fill-current" />
                  </button>
                  <button className="px-3 py-2 bg-[#1784ad] hover:bg-[#147399] text-white rounded-lg text-sm">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyFavorites;
