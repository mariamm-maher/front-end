import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiCreditCard,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
function Contact({ agencyInfo }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 h-fit sticky top-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Contact Information
      </h3>

      <div className="space-y-5">
        <div className="flex items-start">
          <FiMapPin className="text-[#1784ad] mt-1 mr-4 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-800">Address</h4>
            <p className="text-gray-600">{agencyInfo.headquarters}</p>
          </div>
        </div>

        <div className="flex items-center">
          <FiMail className="text-[#1784ad] mr-4" />
          <div>
            <h4 className="font-medium text-gray-800">Email</h4>
            <a
              href={`mailto:${agencyInfo.email}`}
              className="text-gray-600 hover:text-[#1784ad]"
            >
              {agencyInfo.email}
            </a>
          </div>
        </div>

        <div className="flex items-center">
          <FiPhone className="text-[#1784ad] mr-4" />
          <div>
            <h4 className="font-medium text-gray-800">Phone</h4>
            <a
              href={`tel:${agencyInfo.phone.replace(/\D/g, "")}`}
              className="text-gray-600 hover:text-[#1784ad]"
            >
              {agencyInfo.phone}
            </a>
          </div>
        </div>

        <div className="flex items-center">
          <FiClock className="text-[#1784ad] mr-4" />
          <div>
            <h4 className="font-medium text-gray-800">Working Hours</h4>
            <p className="text-gray-600">{agencyInfo.workingHours}</p>
          </div>
        </div>

        <div className="flex items-center">
          <FiCreditCard className="text-[#1784ad] mr-4" />
          <div>
            <h4 className="font-medium text-gray-800">Payment Methods</h4>
            <p className="text-gray-600">
              {agencyInfo.paymentMethods.join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="mt-8">
        <h4 className="font-medium text-gray-800 mb-3">Connect With Us</h4>
        <div className="flex space-x-4">
          <a
            href={`https://facebook.com/${agencyInfo.socialMedia.facebook}`}
            className="text-gray-600 hover:text-[#1784ad] transition-colors"
          >
            <FiFacebook className="w-6 h-6" />
          </a>
          <a
            href={`https://instagram.com/${agencyInfo.socialMedia.instagram}`}
            className="text-gray-600 hover:text-[#1784ad] transition-colors"
          >
            <FiInstagram className="w-6 h-6" />
          </a>
          <a
            href={`https://twitter.com/${agencyInfo.socialMedia.twitter}`}
            className="text-gray-600 hover:text-[#1784ad] transition-colors"
          >
            <FiTwitter className="w-6 h-6" />
          </a>
          <a
            href={`https://linkedin.com/company/${agencyInfo.socialMedia.linkedin}`}
            className="text-gray-600 hover:text-[#1784ad] transition-colors"
          >
            <FiLinkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
