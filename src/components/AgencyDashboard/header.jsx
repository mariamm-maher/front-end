import { FiBell, FiMessageSquare, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../utils/motion";
import logo from "../../assets/logo.png";

const Logo = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center"
  >
    <img src={logo} alt="Logo" className="h-14 rounded" />
  </motion.div>
);

function DashboardHeader() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-b border-gray-200 p-4 sticky top-0 z-20 shadow-sm"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Notification, Message, User */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex items-center space-x-4 ml-auto"
        >
          <motion.button
            variants={fadeIn("left", "tween", 0.2, 1)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2 text-gray-500 hover:text-gray-700"
            aria-label="Notifications"
          >
            <FiBell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </motion.button>

          <motion.button
            variants={fadeIn("left", "tween", 0.3, 1)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2 text-gray-500 hover:text-gray-700"
            aria-label="Messages"
          >
            <FiMessageSquare size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></span>
          </motion.button>

          <motion.div
            variants={fadeIn("left", "tween", 0.4, 1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white cursor-pointer"
            aria-label="User Profile"
          >
            <FiUser size={16} />
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
}

export default DashboardHeader;
