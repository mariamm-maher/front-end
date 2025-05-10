import { motion } from "framer-motion";
import { FiUser, FiArrowLeft } from "react-icons/fi";
import AnimatedBackground from "../components/Auth/background";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "../services/AuthApi";
import toast from "react-hot-toast";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const resetMutation = useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: () => {
      setIsEmailSent(true);
      toast.success("Reset instructions sent to your email!", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#10B981",
          color: "white",
          padding: "16px",
          borderRadius: "10px",
        },
        icon: "📧",
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send reset email.", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "white",
          padding: "16px",
          borderRadius: "10px",
        },
        icon: "❌",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    resetMutation.mutate(email);
  };

  return (
    <AnimatedBackground>
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md px-6 py-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex justify-center mb-6"
              ></motion.div>
              <h1 className="text-3xl font-bold text-white mb-2 mt-0">
                {isEmailSent ? "Email Sent!" : "Forgot Password?"}
              </h1>
              <p className="text-white/80">
                {isEmailSent
                  ? "Check your inbox for instructions to reset your password."
                  : "Enter your email to reset your password."}
              </p>
            </div>

            {!isEmailSent ? (
              <form className="px-8 pb-8" onSubmit={handleSubmit}>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
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
                    />
                  </div>
                </motion.div>

                <motion.button
                  type="submit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={resetMutation.isPending}
                  className="w-full py-4 px-6 rounded-xl font-medium text-white bg-gradient-to-r from-[#1784ad] to-teal-500 hover:from-[#1784ad] hover:to-teal-400 shadow-lg hover:shadow-[#1784ad]/30 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>
                    {resetMutation.isPending ? "Sending..." : "Send Reset Link"}
                  </span>
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-8 pb-8 text-center"
              >
                <p className="text-white/80 mb-6">
                  Didn't receive an email? Check your spam folder or try again.
                </p>
                <button
                  onClick={() => setIsEmailSent(false)}
                  className="text-[#1784ad] hover:text-teal-400 font-medium transition-colors"
                >
                  Try Again
                </button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-8 pb-6 text-center"
            >
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-white/60 hover:text-[#1784ad] font-medium transition-colors"
              >
                <FiArrowLeft className="mr-2" /> Back to Login
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default ForgetPasswordPage;
