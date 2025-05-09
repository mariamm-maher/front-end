import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRightIcon, PlayIcon } from "@heroicons/react/24/solid";

const TYPING_TEXTS = [
  "Discover Your Next Adventure",
  "Explore Hidden Paradises",
  "Find Your Dream Destination",
  "Create Lasting Memories",
];

const ButtonGlow = ({ hovered }) => (
  <motion.span
    className="absolute inset-0 rounded-lg overflow-hidden"
    initial={false}
    animate={{
      opacity: hovered ? 1 : 0,
      transition: { duration: 0.3 },
    }}
  >
    <span className="absolute inset-0 bg-gradient-to-r from-[#1784ad] to-[#41b8e0] opacity-60"></span>
    <span className="absolute inset-0 bg-white mix-blend-overlay"></span>
  </motion.span>
);

function Hero() {
  const [typingText, setTypingText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [hoveredButton, setHoveredButton] = useState(null);
  const controls = useAnimation();

  // Typing effect logic (same as before)
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentText = TYPING_TEXTS[textIndex % TYPING_TEXTS.length];

    const timer = setTimeout(() => {
      if (!isDeleting && typingText.length === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && typingText.length === 0) {
        setIsDeleting(false);
        setTextIndex(textIndex + 1);
        setCurrentIndex(0);
      } else {
        setTypingText(
          isDeleting
            ? currentText.substring(0, typingText.length - 1)
            : currentText.substring(0, typingText.length + 1)
        );
        setCurrentIndex(currentIndex + 1);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [typingText, isDeleting, textIndex, currentIndex]);

  // Background animation on load
  useEffect(() => {
    controls.start({
      opacity: 0.3,
      transition: { duration: 2 },
    });
  }, [controls]);

  return (
    <div className="relative h-screen min-h-[600px] bg-gradient-to-r from-[#1784ad] to-[#324252] text-white overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        className="absolute inset-0 bg-black"
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: Math.random() * 100,
            x: Math.random() * 100,
            opacity: 0,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 0.1, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
            delay: Math.random() * 5,
          }}
          className="absolute rounded-full bg-white"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
        <div className="mb-8 overflow-hidden">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
          >
            {typingText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 0.2,
              }}
              className="ml-1"
            >
              |
            </motion.span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl max-w-2xl mb-10"
        >
          Explore our curated collection of unforgettable travel experiences
          around the globe.
        </motion.p>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          {/* Secondary Button with Advanced Effects */}
          <motion.button
            className="relative border-2 border-white text-white font-semibold px-8 py-4 rounded-lg overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(255,255,255,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredButton("secondary")}
            onHoverEnd={() => setHoveredButton(null)}
          >
            <motion.span
              className="absolute inset-0 bg-white opacity-0"
              animate={{
                opacity: hoveredButton === "secondary" ? 0.1 : 0,
                transition: { duration: 0.3 },
              }}
            />
            <a href="#trips">
              <motion.span className="relative z-10 flex items-center justify-center gap-2">
                Browse Amazing Trips
                <motion.span
                  animate={{
                    scale: hoveredButton === "secondary" ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: hoveredButton === "secondary" ? Infinity : 0,
                    repeatDelay: 1,
                  }}
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.span>
              </motion.span>
            </a>

            {/* Border Animation */}
            <motion.span
              className="absolute inset-0 rounded-lg"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition:
                  hoveredButton === "secondary" ? "100% 0" : "-100% 0",
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.button>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <motion.span
              className="absolute top-0 left-0 w-full h-full rounded-full border border-white"
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.3, 0.1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
