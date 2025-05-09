import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

export default function SearchBar({ filters, setFilters }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch className="text-[#1784ad]" size={18} />
        </div>
        <input
          type="text"
          placeholder="Search destinations, trips, or experiences..."
          className="block w-full pl-12 pr-10 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1784ad] focus:border-transparent shadow-md transition-all duration-200 bg-white text-sm placeholder-gray-400"
          value={filters.searchQuery}
          onChange={(e) =>
            setFilters({ ...filters, searchQuery: e.target.value })
          }
        />
        {filters.searchQuery && (
          <button
            onClick={() => setFilters({ ...filters, searchQuery: "" })}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        )}
      </div>
    </motion.div>
  );
}
