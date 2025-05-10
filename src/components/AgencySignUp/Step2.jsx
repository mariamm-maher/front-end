import { motion } from "framer-motion";
import { FiMapPin, FiGlobe } from "react-icons/fi";

const paymentOptions = [
  "Credit Card",
  "Bank Transfer",
  "PayPal",
  "Cash",
  "Crypto",
];

const Step2 = ({ formData, handleChange }) => {
  return (
    <>
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-sm font-medium text-white/80 mb-2">
          City *
        </label>
        <div className="relative">
          <FiMapPin className="absolute left-3 top-3 text-white/60" />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
            placeholder="Your City"
            required
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        <label className="block text-sm font-medium text-white/80 mb-2">
          Country *
        </label>
        <div className="relative">
          <FiGlobe className="absolute left-3 top-3 text-white/60" />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
            placeholder="Your Country"
            required
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="col-span-2"
      >
        <label className="block text-sm font-medium text-white/80 mb-2">
          Payment Methods Accepted (Optional)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {paymentOptions.map((method) => (
            <div key={method} className="flex items-center">
              <input
                type="checkbox"
                id={method}
                name="paymentMethods"
                value={method}
                checked={formData.paymentMethods.includes(method)}
                onChange={handleChange}
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#1784ad] focus:ring-[#1784ad]/50"
              />
              <label
                htmlFor={method}
                className="ml-2 text-sm text-white/80 cursor-pointer"
              >
                {method}
              </label>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Step2;
