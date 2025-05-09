import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
function ContactInfo() {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Contact Information
        </h2>
        <p className="text-gray-600 mb-6">
          Have questions or need assistance? Reach out to us through any of
          these channels.
        </p>
      </div>

      <div className="space-y-6">
        {/* Email */}
        <motion.div
          whileHover={{ x: 5 }}
          className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md"
        >
          <div className="p-3 bg-[#1784ad]/10 rounded-full text-[#1784ad]">
            <FiMail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Email</h3>
            <a
              href="mailto:contact@adventuretours.com"
              className="text-[#1784ad] hover:underline"
            >
              contact@adventuretours.com
            </a>
            <p className="text-sm text-gray-500 mt-1">
              Typically responds within 24 hours
            </p>
          </div>
        </motion.div>

        {/* Phone */}
        <motion.div
          whileHover={{ x: 5 }}
          className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md"
        >
          <div className="p-3 bg-[#1784ad]/10 rounded-full text-[#1784ad]">
            <FiPhone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Phone</h3>
            <a
              href="tel:+18005551234"
              className="text-[#1784ad] hover:underline"
            >
              +1 (800) 555-1234
            </a>
            <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9am-5pm EST</p>
          </div>
        </motion.div>

        {/* Address */}
        <motion.div
          whileHover={{ x: 5 }}
          className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md"
        >
          <div className="p-3 bg-[#1784ad]/10 rounded-full text-[#1784ad]">
            <FiMapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Headquarters</h3>
            <p className="text-gray-600">123 Adventure Way</p>
            <p className="text-gray-600">Denver, CO 80202</p>
            <p className="text-gray-600">United States</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ContactInfo;
