import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

function Option({ option, delay = 0 }) {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(option.link)}
      className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#1784ad]/90 hover:bg-[#1784ad] text-white transition-all duration-200 shadow-sm hover:shadow-md text-sm"
    >
      <div className="flex items-center">
        <div className="p-1 rounded-md bg-white/20 mr-3">{option.icon}</div>
        <span className="font-medium">{option.title}</span>
      </div>
      <FiArrowRight className="text-sm" />
    </motion.button>
  );
}

export default Option;
