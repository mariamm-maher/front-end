import { motion } from "framer-motion";
import { FiMapPin, FiGlobe } from "react-icons/fi";
import { useSelector } from "react-redux";

const paymentOptions = [
  "Credit Card",
  "Bank Transfer",
  "PayPal",
  "Cash",
  "Crypto",
];

const Step2 = ({ handleChange }) => {
  const { formData, validationErrors } = useSelector(
    (state) => state.agencyForm
  );

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
        {validationErrors.city && (
          <p className="text-red-400 text-sm mt-1">{validationErrors.city}</p>
        )}
      </motion.div>

      {/* Added Country Input */}
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
        {validationErrors.country && (
          <p className="text-red-400 text-sm mt-1">
            {validationErrors.country}
          </p>
        )}
      </motion.div>

      {/* <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <label className="block text-sm font-medium text-white/80 mb-2">
          Address *
        </label>
        <div className="relative">
          <FiMapPin className="absolute left-3 top-3 text-white/60" />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
            placeholder="Street Address"
            required
          />
        </div>
        {validationErrors.address && (
          <p className="text-red-400 text-sm mt-1">
            {validationErrors.address}
          </p>
        )}
      </motion.div> */}

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="col-span-2"
      >
        <label className="block text-sm font-medium text-white/80 mb-2">
          Accepted Payment Methods
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
          {paymentOptions.map((option) => (
            <div key={option} className="flex items-center">
              <input
                type="checkbox"
                id={`payment-${option}`}
                name="paymentMethods"
                value={option}
                checked={formData.paymentMethods?.includes(option)}
                onChange={handleChange}
                className="sr-only" // Hide default checkbox
              />
              <label
                htmlFor={`payment-${option}`}
                className={`flex items-center cursor-pointer text-sm text-white/80 py-2 px-3 rounded-md transition-all ${
                  formData.paymentMethods?.includes(option)
                    ? "bg-[#1784ad]/40 border-[#1784ad] shadow-sm"
                    : "bg-white/5 border-white/20"
                } border`}
              >
                <span
                  className={`w-4 h-4 mr-2 flex-shrink-0 rounded border ${
                    formData.paymentMethods?.includes(option)
                      ? "bg-[#1784ad] border-[#1784ad]"
                      : "bg-transparent border-white/40"
                  } flex items-center justify-center`}
                >
                  {formData.paymentMethods?.includes(option) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
                {option}
              </label>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Step2;
