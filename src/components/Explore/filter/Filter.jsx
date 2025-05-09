import { useState } from "react";
import { FiX, FiStar, FiFilter } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const categories = [
  { id: "all", label: "All" },
  { id: "historical", label: "History" },
  { id: "adventure", label: "Adventure" },
  { id: "luxury", label: "Luxury" },
  { id: "nature", label: "Nature" },
];

const durations = [
  { id: "", label: "Any" },
  { id: "weekend", label: "Weekend" },
  { id: "week", label: "1 Week" },
  { id: "2weeks", label: "2 Weeks" },
  { id: "month", label: "Month+" },
];

export default function AdvancedFilters({ filters, setFilters }) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceChange = (value) => {
    setFilters({ ...filters, priceRange: value });
  };

  const handleClearFilters = () => {
    setFilters({
      ...filters,
      category: "all",
      priceRange: [0, 5000],
      duration: "",
      rating: null,
      date: null,
    });
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-[#1784ad] text-white rounded-lg shadow-md hover:bg-[#147399] transition-all duration-200 hover:shadow-lg mb-4"
      >
        <FiFilter className="text-white" />
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Animated Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="filters"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-5 space-y-5 border border-gray-100 overflow-hidden"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 text-lg">
                Refine Your Search
              </h3>
              <button
                onClick={handleClearFilters}
                className="text-sm text-[#1784ad] hover:text-[#147399] flex items-center transition-colors"
              >
                <FiX className="mr-1" size={14} /> Clear all
              </button>
            </div>

            {/* Category Buttons */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Trip Categories
              </h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() =>
                      setFilters({ ...filters, category: category.id })
                    }
                    className={`px-4 py-2 text-sm rounded-full transition-all ${
                      filters.category === category.id
                        ? "bg-[#1784ad] text-white shadow-inner"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {category.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price Range */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </h4>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-600">
                    ${filters.priceRange[0]}
                  </span>
                  <span className="font-medium text-[#1784ad]">
                    ${filters.priceRange[1]}
                  </span>
                </div>
                <Slider
                  range
                  min={0}
                  max={5000}
                  step={100}
                  value={filters.priceRange}
                  onChange={handlePriceChange}
                  trackStyle={[{ backgroundColor: "#1784ad", height: 6 }]}
                  handleStyle={[
                    {
                      borderColor: "#1784ad",
                      backgroundColor: "#fff",
                      height: 20,
                      width: 20,
                      marginTop: -8,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    },
                    {
                      borderColor: "#1784ad",
                      backgroundColor: "#fff",
                      height: 20,
                      width: 20,
                      marginTop: -8,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    },
                  ]}
                  railStyle={{ backgroundColor: "#e5e7eb", height: 6 }}
                />
              </div>

              {/* Duration */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Trip Duration
                </h4>
                <select
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1784ad] bg-white transition-all hover:border-gray-400"
                  value={filters.duration}
                  onChange={(e) =>
                    setFilters({ ...filters, duration: e.target.value })
                  }
                >
                  {durations.map((duration) => (
                    <option key={duration.id} value={duration.id}>
                      {duration.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rating */}

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Min Rating</span>
                {filters.rating && (
                  <span className="flex items-center text-sm text-yellow-600">
                    <FiStar className="mr-1 fill-current" size={14} />
                    {filters.rating}+
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        rating: filters.rating === star ? null : star,
                      })
                    }
                    className={`p-2 rounded-full transition-colors ${
                      filters.rating && filters.rating >= star
                        ? "bg-yellow-100 text-yellow-500"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    <FiStar
                      size={16}
                      className={
                        filters.rating && filters.rating >= star
                          ? "fill-current"
                          : ""
                      }
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
