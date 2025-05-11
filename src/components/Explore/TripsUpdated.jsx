import { motion, AnimatePresence } from "framer-motion";
import Trip from "./trip";

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
