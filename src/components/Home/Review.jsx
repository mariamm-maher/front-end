import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";

const cardVariants = {
  hover: {
    y: -8,
    boxShadow: "0 10px 25px -5px rgba(23, 132, 173, 0.3)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

function ReviewCard({
  name,
  role,
  avatar,
  message,
  rating,
  date,
  destination,
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="h-full bg-white rounded-lg p-6 border border-gray-200 flex flex-col shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center mb-4">
        <motion.img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-[#1784ad]"
          variants={fadeIn}
        />
        <div className="ml-4">
          <motion.h3 className="text-[#232e3a] font-semibold" variants={fadeIn}>
            {name}
          </motion.h3>
          <motion.p
            className="text-[#1784ad] text-sm"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            {role}
          </motion.p>
        </div>
      </div>

      <motion.div
        className="flex mb-4"
        variants={fadeIn}
        transition={{ delay: 0.2 }}
      >
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-5 h-5 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </motion.div>

      <motion.p
        className="text-gray-600 mb-6 flex-grow italic"
        variants={fadeIn}
        transition={{ delay: 0.3 }}
      >
        "{message}"
      </motion.p>

      <motion.div
        className="mt-auto pt-4 border-t border-gray-100"
        variants={fadeIn}
        transition={{ delay: 0.4 }}
      >
        <p className="text-sm text-gray-500">
          <span className="font-medium text-[#1784ad]">{destination}</span> •{" "}
          {date}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default ReviewCard;
