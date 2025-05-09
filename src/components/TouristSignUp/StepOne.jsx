// Step1.jsx - First step component (name, email, password)
import { useState } from "react";
import { FiUser, FiLock, FiEye, FiMail, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
const Step1 = ({ formData, handleChange, onNext }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const password = formData.password;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters and include uppercase letters, lowercase letters, numbers, and special characters.",
        {
          duration: 7000,
          position: "top-center",
          style: {
            background: "#EF4444",
            color: "white",
            padding: "10px",
            borderRadius: "10px",
          },
          icon: "❌",
        }
      );
      return;
    }

    onNext();
  };

  return (
    <form className="px-8 pb-8" onSubmit={handleSubmit}>
      {/* First and Last Name */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 flex gap-4"
      >
        <div className="w-1/2">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-white/80 mb-2"
          >
            First Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-white/60" />
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
              placeholder="First Name"
              required
            />
          </div>
        </div>

        <div className="w-1/2">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-white/80 mb-2"
          >
            Last Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-white/60" />
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
              placeholder="Last Name"
              required
            />
          </div>
        </div>
      </motion.div>

      {/* Email */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mb-6"
      >
        <label
          htmlFor="email"
          className="block text-sm font-medium text-white/80 mb-2"
        >
          Email Address
        </label>
        <div className="relative">
          <FiMail className="absolute left-3 top-3 text-white/60" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent transition-all"
            placeholder="your@email.com"
            required
          />
        </div>
      </motion.div>

      {/* Password */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white/80 mb-2"
        >
          Password
        </label>
        <div className="relative">
          <FiLock className="absolute left-3 top-3 text-white/60" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent transition-all"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FiEyeOff className="text-white/60 hover:text-white/90 transition-colors" />
            ) : (
              <FiEye className="text-white/60 hover:text-white/90 transition-colors" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Continue Button */}
      <motion.button
        type="submit"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 px-6 rounded-xl font-medium text-white bg-gradient-to-r from-[#1784ad] to-teal-500 hover:from-[#1784ad] hover:to-teal-400 shadow-lg hover:shadow-[#1784ad]/30 transition-all duration-300 flex items-center justify-center space-x-2"
      >
        Continue
      </motion.button>
    </form>
  );
};

export default Step1;
