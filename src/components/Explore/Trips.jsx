// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiCalendar,
//   FiMapPin,
//   FiClock,
//   FiStar,
//   FiArrowRight,
//   FiHeart,
// } from "react-icons/fi";

// const Trip = ({ trip, index }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.05, duration: 0.3 }}
//       className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 mb-6"
//     >
//       <div className="flex flex-col md:flex-row">
//         {/* Image Section */}
//         <motion.div
//           className="md:w-2/5 h-48 md:h-auto relative"
//           whileHover={{ scale: 1.01 }}
//         >
//           <img
//             src={trip.image}
//             alt={trip.title}
//             className="w-full h-full object-cover absolute inset-0"
//           />

//           <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent"></div>

//           {/* Rating Badge */}
//           <motion.div
//             className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium flex items-center shadow-sm"
//             whileHover={{ scale: 1.05 }}
//           >
//             <FiStar className="text-yellow-400 mr-1" size={12} />
//             <span>{trip.rating}</span>
//           </motion.div>

//           {/* Favorite Button */}
//           <motion.button
//             className="absolute top-3 left-3 bg-white/90 p-1.5 rounded-full shadow-sm"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <FiHeart className="w-4 h-4 text-gray-700" />
//           </motion.button>

//           {/* Location Tag */}
//           <div className="absolute bottom-3 left-3">
//             <motion.div
//               className="bg-[#1784ad] text-white px-2 py-1 text-xs rounded-full flex items-center"
//               initial={{ x: -10, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               <FiMapPin className="mr-1" size={12} />
//               <span>{trip.location}</span>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Content Section */}
//         <div className="md:w-3/5 p-4 flex flex-col">
//           <div>
//             <motion.h3
//               className="text-xl font-bold text-gray-900 mb-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.1 }}
//             >
//               {trip.title}
//             </motion.h3>

//             <motion.p
//               className="text-gray-600 text-sm mb-4 line-clamp-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               {trip.description}
//             </motion.p>

//             <motion.div
//               className="space-y-2 mb-4 text-sm"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               <div className="flex items-center text-gray-700">
//                 <FiCalendar className="mr-2 text-[#1784ad]" size={14} />
//                 <span>
//                   {new Date(trip.date).toLocaleDateString("en-US", {
//                     month: "short",
//                     day: "numeric",
//                   })}
//                 </span>
//               </div>
//               <div className="flex items-center text-gray-700">
//                 <FiClock className="mr-2 text-[#1784ad]" size={14} />
//                 <span>{trip.duration}</span>
//               </div>
//               <div className="text-xs bg-gray-100 px-2 py-1 rounded inline-block">
//                 By {trip.agency}
//               </div>
//             </motion.div>
//           </div>

//           <motion.div
//             className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             <div className="text-xl font-bold text-[#1784ad]">
//               ${trip.price.toLocaleString()}
//             </div>
//             <motion.button
//               className="bg-[#1784ad] hover:bg-[#147399] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1"
//               whileHover={{ x: 3 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <span>Book</span>
//               <FiArrowRight size={14} />
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const TripList = ({ trips }) => {
//   return (
//     <div className="mx-auto px-4">
//       <AnimatePresence>
//         {trips.length > 0 ? (
//           trips.map((trip, index) => (
//             <Trip key={trip.id} trip={trip} index={index} />
//           ))
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="text-center py-12"
//           >
//             <h3 className="text-lg font-medium text-gray-700">
//               No trips found
//             </h3>
//             <p className="text-gray-500 mt-2 text-sm">
//               Adjust your filters or search term
//             </p>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default TripList;
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiStar,
  FiArrowRight,
} from "react-icons/fi";

const Trip = ({ trip }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col"
    >
      {/* Image Section */}
      <div className="relative h-40">
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <FiStar className="text-yellow-400 mr-1" size={12} />
          {trip.rating}
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
            <span>{trip.location}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FiCalendar className="mr-2 text-[#1784ad]" size={14} />
            <span>
              {new Date(trip.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center text-gray-700">
            <FiClock className="mr-2 text-[#1784ad]" size={14} />
            <span>{trip.duration}</span>
          </div>
        </div>

        <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="font-bold text-[#1784ad]">
            ${trip.price.toLocaleString()}
          </div>
          <button className="bg-[#1784ad] hover:bg-[#147399] text-white px-3 py-1.5 rounded-lg text-sm flex items-center transition-colors">
            <span>Book</span>
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
