import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const TYPING_TEXTS = [
  "Discover Amazing Destinations",
  "Find Your Perfect Getaway",
  "Explore Hidden Gems",
  "Plan Your Dream Trip",
];

function Hero() {
  const [typingText, setTypingText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const controls = useAnimation();

  // Typing effect logic
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
      opacity: 0.2,
      transition: { duration: 1.5 },
    });
  }, [controls]);

  return (
    <div className="relative h-96 bg-gradient-to-r from-[#1784ad] to-[#324252] text-white overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        className="absolute inset-0 bg-black"
      />

      {/* Subtle floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: Math.random() * 50,
            x: Math.random() * 50,
            opacity: 0,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.05, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
            delay: Math.random() * 3,
          }}
          className="absolute rounded-full bg-white"
          style={{
            width: `${2 + Math.random() * 2}px`,
            height: `${2 + Math.random() * 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
        <div className="mb-4 overflow-hidden">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold leading-tight"
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
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg max-w-2xl mb-6"
        >
          Explore our curated collection of unforgettable destinations
        </motion.p>
      </div>
    </div>
  );
}

export default Hero;
