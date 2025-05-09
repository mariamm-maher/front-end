import { motion } from "framer-motion";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState } from "react";

const Step3 = ({ handleChange }) => {
  const { formData, validationErrors } = useSelector(
    (state) => state.agencyForm
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="flex flex-col items-center justify-center w-full"
    >
      <label className="block text-sm font-medium text-white/80 mb-2 self-start">
        Password *
      </label>
      <div className="relative w-full max-w-md">
        <FiLock className="absolute left-3 top-3 text-white/60" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
          placeholder="••••••••"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3"
        >
          {showPassword ? (
            <FiEyeOff className="text-white/60 hover:text-white/90 transition-colors" />
          ) : (
            <FiEye className="text-white/60 hover:text-white/90 transition-colors" />
          )}
        </button>
      </div>

      {validationErrors.password && (
        <p className="text-red-400 text-sm mt-2 self-start max-w-md">
          {validationErrors.password}
        </p>
      )}
    </motion.div>
  );
};

export default Step3;
