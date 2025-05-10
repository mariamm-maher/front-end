import { motion } from "framer-motion";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import AnimatedBackground from "../components/Auth/background";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

import { displayAuthError } from "../utils/authUtils";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Use the AuthContext
  const { login, isLoggingIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs before submitting
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    console.log("Attempting login with:", email);

    try {
      // Use the login function from context which now returns a Promise
      await login({
        email,
        password,
      });
      // Success case is handled by the context
    } catch (error) {
      console.error("Login failed:", error);
      // Use our utility function to display the appropriate error message
      displayAuthError(error, toast);
    }
  };

  return (
    <AnimatedBackground>
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md px-6 py-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            {/* Form Header */}
            <div className="p-8 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-white/80">Sign in to access your Account</p>
            </div>

            {/* Form */}
            <form className="px-8 pb-8" onSubmit={handleSubmit}>
              {/* Email */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-white/60" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    required
                    disabled={isLoggingIn}
                  />
                </div>
              </motion.div>
              {/* Password */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-white/60" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                    disabled={isLoggingIn}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={isLoggingIn}
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-white/60 hover:text-white/90 transition-colors" />
                    ) : (
                      <FiEye className="text-white/60 hover:text-white/90 transition-colors" />
                    )}
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <Link
                    to="/forget-password"
                    className="text-sm text-white/60 hover:text-[#1784ad] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </motion.div>{" "}
              {/* Submit */}
              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: isLoggingIn ? 1 : 1.02 }}
                whileTap={{ scale: isLoggingIn ? 1 : 0.98 }}
                disabled={isLoggingIn}
                className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isLoggingIn
                    ? "bg-[#1784ad]/80 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#1784ad] to-teal-500 hover:from-[#1784ad] hover:to-teal-400 shadow-lg hover:shadow-[#1784ad]/30"
                }`}
              >
                {isLoggingIn ? "Logging in..." : "Log in"}
              </motion.button>
              {/* Account Status Help Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-xs text-white/60 mt-3"
              >
                If you can't log in, your account may be pending approval or
                suspended.
                <br />
                <Link
                  to="/contact-us"
                  className="text-[#1784ad] hover:text-emerald-200 transition-colors"
                >
                  Contact support for assistance
                </Link>
              </motion.p>
            </form>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="px-8 pb-6 text-center"
            >
              <p className="text-white/60 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup-user"
                  className="text-[#1784ad] hover:text-emerald-200 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default LoginPage;
