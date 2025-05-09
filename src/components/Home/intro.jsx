import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// Import images
import historical1 from "../../assets/historical.jpg";
import historical2 from "../../assets/historical2.jpg";
import adventure1 from "../../assets/adventure.jpg";
import adventure2 from "../../assets/adventure2.jpg";
import luxury1 from "../../assets/luxury.jpg";
import luxury2 from "../../assets/luxury2.jpg";
import nature1 from "../../assets/p2.jpg";
import nature2 from "../../assets/nature2.jpeg";
import NavBar from "./nav";

// Category data with descriptions and stats
const categories = {
  Historical: {
    images: [historical1, historical2],
    description:
      "Step back in time with our immersive historical journeys through ancient civilizations and lost worlds.",
    stats: [9500, 1800, 1200],
  },
  Adventure: {
    images: [adventure1, adventure2],
    description:
      "Push your limits with adrenaline-pumping expeditions to the world's most extreme locations.",
    stats: [8700, 2100, 1500],
  },
  Luxury: {
    images: [luxury1, luxury2],
    description:
      "Experience unparalleled comfort with our exclusive high-end travel experiences.",
    stats: [6500, 1200, 800],
  },
  Nature: {
    images: [nature1, nature2],
    description:
      "Reconnect with the planet through breathtaking natural wonders and eco-conscious travel.",
    stats: [11000, 2500, 1800],
  },
};

const statTitles = ["Successful trips", "Regular clients", "Tries yearly"];

const AdventureHero = () => {
  const [activeCategory, setActiveCategory] = useState("Historical");
  const [imageIndex, setImageIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [stats, setStats] = useState(categories.Historical.stats);
  const categoryKeys = Object.keys(categories);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  // Auto-rotate categories - CHANGED FROM 8000 to 30000 (30 seconds)
  useEffect(() => {
    if (!autoRotate) return;

    const categoryInterval = setInterval(() => {
      setActiveCategory((prev) => {
        const currentIndex = categoryKeys.indexOf(prev);
        return categoryKeys[(currentIndex + 1) % categoryKeys.length];
      });
    }, 30000); // Change category every 30 seconds

    return () => clearInterval(categoryInterval);
  }, [autoRotate, categoryKeys]);

  // Auto-rotate images within category
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setImageIndex(
        (prev) => (prev + 1) % categories[activeCategory].images.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(imageInterval);
  }, [activeCategory]);

  // Animate stats when category changes
  useEffect(() => {
    const targetStats = categories[activeCategory].stats;
    const duration = 1.5;
    const steps = 30;
    const increment = targetStats.map(
      (target, i) => (target - stats[i]) / steps
    );

    let step = 0;
    const counter = setInterval(() => {
      step++;
      if (step >= steps) {
        setStats(targetStats);
        clearInterval(counter);
      } else {
        setStats((prev) =>
          prev.map((val, i) => Math.floor(val + increment[i]))
        );
      }
    }, (duration * 1000) / steps);

    return () => clearInterval(counter);
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setAutoRotate(false);
    setTimeout(() => setAutoRotate(true), 45000); // Resume auto-rotate after 45s (1.5x the rotation time)
  };

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Dynamic Image Slider */}

      <div className="">
        <div className=" inset-0 w-full h-full">
          {categoryKeys.map((category) =>
            categories[category].images.map((img, i) => (
              <motion.div
                key={`${category}-${i}`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity:
                    activeCategory === category && i === imageIndex ? 1 : 0,
                  scale:
                    activeCategory === category && i === imageIndex ? 1 : 1.1,
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.22, 1, 0.36, 1],
                  opacity: { duration: 1.2 },
                }}
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              />
            ))
          )}
        </div>
      </div>

      {/* Gradient overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"
      />

      {/* Content */}
      <div className="relative z-10 min-h-full text-white p-8 md:p-16 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          {/* Animated Title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6 md:mb-8"
            >
              {activeCategory} Tours
            </motion.h1>
          </AnimatePresence>

          {/* Slider indicators */}
          <div className="flex gap-2 mb-8">
            {categoryKeys.map((category, index) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-white w-8"
                    : "bg-gray-500 w-4 hover:bg-gray-300"
                }`}
                aria-label={`Show ${category} tours`}
              />
            ))}
          </div>

          {/* Animated Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${activeCategory}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 md:mb-12 max-w-3xl"
            >
              {categories[activeCategory].description}
            </motion.p>
          </AnimatePresence>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 border-t border-gray-600 pt-8 md:pt-12"
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <motion.h2 className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.toLocaleString()}
                </motion.h2>
                <p className="text-gray-300">{statTitles[i]}!</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdventureHero;
