import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiUser,
  FiLogOut,
  FiSettings,
  FiCalendar,
} from "react-icons/fi";
import { HiOutlineBookmark } from "react-icons/hi";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(3); // Example count
  const [isWishlistHovered, setIsWishlistHovered] = useState(false);

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Explore", path: "/explore" },
    { name: "Destinations", path: "/destinations" },
    { name: "About", path: "/aboutUs" },
    { name: "Contact", path: "/contactUs" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-b from-black/80 to-gray-900/50 backdrop-blur-sm z-50 p-4 md:px-8 flex justify-between items-center border-b border-gray-700/50 shadow-2xl">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-shrink-0"
      >
        <Link to="/">
          <img
            src={logo}
            className="h-24 md:h-16 hover:scale-105 transition-transform duration-300 filter drop-shadow-lg"
            alt="Adventure Tours Logo"
          />
        </Link>
      </motion.div>

      {/* Menu Toggle (for mobile) */}
      <button
        className="text-white md:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <motion.div
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: { rotate: 90 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </motion.div>
      </button>

      {/* Navigation Links - Centered */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${
          isOpen
            ? "flex flex-col fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 items-center justify-center gap-8"
            : "hidden"
        } 
          md:flex md:static md:flex-row md:bg-transparent md:gap-4 lg:gap-8`}
      >
        {navLinks.map((link, index) => (
          <motion.div
            key={index}
            onHoverStart={() => setHoveredLink(index)}
            onHoverEnd={() => setHoveredLink(null)}
            className="relative"
          >
            <Link
              to={link.path}
              className="text-gray-300 hover:text-white text-lg md:text-sm lg:text-base font-medium transition-colors duration-300 px-3 py-2 flex items-center group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1784ad] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {hoveredLink === index && (
              <motion.div
                layoutId="navHighlight"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute bottom-0 left-0 h-0.5 bg-[#1784ad] shadow-[0_0_8px_#1784ad]"
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Right Side Controls */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden md:flex items-center gap-4"
      >
        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsWishlistHovered(true)}
          onHoverEnd={() => setIsWishlistHovered(false)}
          className="relative p-2 text-gray-300 hover:text-[#ff6b6b] transition-colors duration-300"
        >
          <FiHeart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-[#ff6b6b] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            >
              {wishlistCount}
            </motion.span>
          )}
          <AnimatePresence>
            {isWishlistHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full right-0 mt-2 bg-gray-800 text-white text-sm px-3 py-1 rounded whitespace-nowrap shadow-lg border border-gray-700"
              >
                Your favourites
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Auth Buttons */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="text-gray-300 hover:text-[#1784ad] font-medium px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-700/30 border border-gray-600 hover:border-[#1784ad]"
        >
          Login
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-gradient-to-r from-[#1784ad] to-teal-500 hover:from-[#1784ad]/90 hover:to-teal-500/90 text-white font-medium px-5 py-2 rounded-md transition-all duration-300 shadow-lg hover:shadow-[#1784ad]/40"
        >
          Sign Up
        </motion.button>

        {/* Profile Dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 text-gray-300 hover:text-white p-2 rounded-full hover:bg-gray-700/50 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1784ad] to-teal-400 flex items-center justify-center overflow-hidden shadow-inner">
              <FiUser className="w-4 h-4 text-white" />
            </div>
          </motion.button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {showUserDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-md shadow-2xl py-1 z-50 border border-gray-700/50 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-gray-700/50">
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-gray-400">john@example.com</p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
                >
                  <FiUser className="mr-3" /> Profile
                </Link>
                <Link
                  to="/bookings"
                  className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
                >
                  <FiCalendar className="mr-3" /> My Bookings
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
                >
                  <HiOutlineBookmark className="mr-3" /> Wishlist
                  {wishlistCount > 0 && (
                    <span className="ml-auto bg-[#ff6b6b] text-white text-xs font-bold rounded-full px-2 py-0.5">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
                >
                  <FiSettings className="mr-3" /> Settings
                </Link>
                <div className="border-t border-gray-700/50 my-1"></div>
                <button className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-red-400 transition-colors">
                  <FiLogOut className="mr-3" /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col items-center gap-6 fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 pt-24 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={`mobile-${index}`}
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full text-center"
              >
                <Link
                  to={link.path}
                  className="block text-gray-300 hover:text-white text-xl font-medium px-4 py-3 w-full"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
                <div className="mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-[#1784ad] to-transparent opacity-50"></div>
              </motion.div>
            ))}

            <div className="flex flex-col gap-4 mt-8 w-64">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="text-white font-medium px-6 py-3 rounded-md transition-all duration-300 hover:bg-gray-700/50 border border-[#1784ad]"
              >
                Login
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#1784ad] to-teal-500 hover:from-[#1784ad]/90 hover:to-teal-500/90 text-white font-medium px-6 py-3 rounded-md transition-all duration-300 shadow-lg hover:shadow-[#1784ad]/40"
              >
                Sign Up
              </motion.button>
            </div>

            {/* Mobile Wishlist Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="mt-8 flex items-center gap-2 text-gray-300 hover:text-[#ff6b6b] px-4 py-2"
            >
              <FiHeart className="w-5 h-5" />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="bg-[#ff6b6b] text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {wishlistCount}
                </span>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
