import { motion } from "framer-motion";
import { FiUser, FiPhone, FiMail } from "react-icons/fi";

const Step1 = ({ formData, handleChange }) => {
  return (
    <>
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="col-span-2"
      >
        <label className="block text-sm font-medium text-white/80 mb-2">
          Agency Name *
        </label>
        <div className="relative">
          <FiUser className="absolute left-3 top-3 text-white/60" />
          <input
            type="text"
            name="agencyName"
            value={formData.agencyName}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
            placeholder="Your Agency Name"
            required
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-sm font-medium text-white/80 mb-2">
          Phone Number *
        </label>
        <div className="relative">
          <FiPhone className="absolute left-3 top-3 text-white/60" />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
            placeholder="+1 234 567 890"
            required
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-sm font-medium text-white/80 mb-2">
          Email *
        </label>
        <div className="relative">
          <FiMail className="absolute left-3 top-3 text-white/60" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
            placeholder="contact@youragency.com"
            required
          />
        </div>
      </motion.div>
    </>
  );
};

export default Step1;
