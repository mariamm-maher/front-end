import { motion } from "framer-motion";

function Hero({ agencyInfo }) {
  return (
    <div className="relative h-96 bg-gradient-to-r from-[#1784ad] to-[#324252] text-white">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {agencyInfo.name}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl max-w-2xl"
        >
          {agencyInfo.description}
        </motion.p>
      </div>
    </div>
  );
}

export default Hero;
