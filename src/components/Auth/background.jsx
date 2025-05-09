import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

import bg1 from "../../assets/fam.jpg"; //
import bg2 from "../../assets/nature2.jpeg"; //
import bg3 from "../../assets/hi2.jpg"; //
import bg4 from "../../assets/luxury2.jpg"; //1

const backgroundImages = [bg1, bg2, bg3, bg4];

const AnimatedBackground = ({
  children,
  overlayGradient = "from-black/70 via-black/50 to-black/70",
  floatingElements = true,
}) => {
  const [currentBg, setCurrentBg] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState([]);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const images = await Promise.all(
          backgroundImages.map((img) => {
            return new Promise((resolve) => {
              const image = new Image();
              image.src = img;
              image.onload = () => resolve(img);
            });
          })
        );
        setLoadedImages(images);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    preloadImages();
  }, []);

  // Rotate background images at an interval only when images are loaded
  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setCurrentBg((prev) => (prev + 1) % loadedImages.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isLoading, loadedImages.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {/* Background image transition */}
      <AnimatePresence mode="wait">
        {!isLoading && (
          <div className="absolute inset-0">
            {loadedImages.map((bg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentBg ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url("${bg}")`,
                  willChange: "opacity",
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${overlayGradient}`}
      />

      {/* Optimized floating elements with reduced animations */}
      {floatingElements && !isLoading && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, -15, 0],
            }}
            transition={{
              opacity: { duration: 0.5 },
              y: { duration: 8, repeat: Infinity, ease: "linear" },
            }}
            className="absolute top-1/4 left-1/6 w-8 h-8 rounded-full bg-emerald-400/30 blur-md"
            style={{ willChange: "transform" }}
          />
          {/* Reduce number of floating elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              scale: [1, 1.2, 1],
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 10, repeat: Infinity, ease: "linear" },
            }}
            className="absolute top-2/3 left-1/4 w-6 h-6 rounded-full bg-sky-400/40 blur-sm"
            style={{ willChange: "transform" }}
          />
        </>
      )}

      {children}
    </div>
  );
};

export default AnimatedBackground;
