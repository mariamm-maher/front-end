import { motion } from "framer-motion";
import { FiUser, FiBriefcase, FiGlobe, FiPlus } from "react-icons/fi";
import logo from "../assets/logo.png";
import AnimatedBackground from "../components/Auth/background";
import Option from "../components/welcome/option";

const options = [
  {
    id: "guest",
    title: "Continue as Guest",
    icon: <FiGlobe className="text-base" />,
    link: "/home",
  },
  {
    id: "login",
    title: "User Login",
    icon: <FiUser className="text-base" />,
    link: "/login",
  },
  {
    id: "signup",
    title: "Create Account",
    icon: <FiPlus className="text-base" />,
    link: "/signup-user",
  },
  {
    id: "agency-signUp",
    title: "Agency Sign Up",
    icon: <FiBriefcase className="text-base" />,
    link: "/signup-agency",
  },
];

const WelcomePage = () => {
  return (
    <AnimatedBackground>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-white/20 w-full max-w-md mx-4"
      >
        <div className="flex flex-col items-center px-6 py-8 space-y-6">
          {/* Logo and Slogan */}
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-3xl font-bold text-white mb-1">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-[#1784ad]">
                Welcome to{" "}
                <img
                  src={logo}
                  alt="GlobeOut Logo"
                  className="h-32 drop-shadow-lg transition-transform hover:scale-105 duration-300 mb-3"
                />
              </span>
            </h1>
            <p className=" text-white/80 italic">
              Your passport to extraordinary journeys
            </p>
          </motion.div>

          {/* Options */}
          <div className="w-full space-y-3">
            {options.map((option, index) => (
              <Option key={option.id} option={option} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatedBackground>
  );
};

export default WelcomePage;
