import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedBackground from "../components/Auth/background";
import { FiCheckCircle, FiClock, FiArrowRight } from "react-icons/fi";

const RegistrationSuccess = () => {
  return (
    <AnimatedBackground>
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md px-6 py-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20 p-8 text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center mb-6"
            >
              <div className="bg-teal-500/20 p-4 rounded-full">
                <FiCheckCircle className="text-6xl text-teal-500" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Registration Successful!
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="my-6 p-4 bg-white/10 rounded-lg border border-white/20"
            >
              <div className="flex items-center justify-center text-amber-400 mb-2">
                <FiClock className="mr-2" />
                <span className="font-semibold">Approval Pending</span>
              </div>
              <p className="text-white/80">
                Your travel agency account is now pending admin approval. We'll
                review your information and activate your account soon.
              </p>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/70 mb-8"
            >
              You'll receive an email notification once your account has been
              approved.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col space-y-4"
            >
              <Link
                to="/login"
                className="py-3 px-6 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r from-[#1784ad] to-teal-500 hover:from-[#1784ad] hover:to-teal-400 shadow-lg hover:shadow-[#1784ad]/30"
              >
                <span>Go to Login</span>
                <FiArrowRight />
              </Link>

              <Link
                to="/"
                className="py-3 px-6 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20"
              >
                Return to Main Page
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default RegistrationSuccess;
