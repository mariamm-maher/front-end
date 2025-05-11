import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const BookingSuccess = ({ travelAgencyName, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#1784ad]/20 mb-6">
            <FiCheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Booking Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your booking has been successfully sent to the travel agency "
            {travelAgencyName}" and is awaiting their acceptance. Please check
            your booking status until the agency notifies you.
          </p>
          <div className="bg-[#1784ad]/10 rounded-lg p-4 mb-6 flex items-center">
            <FiClock className="text-[#1784ad] mr-3 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              Booking confirmation may take up to 24 hours. You'll receive a
              notification once it's confirmed.
            </p>
          </div>{" "}
          <div className="flex flex-col sm:flex-row gap-3">
            {" "}
            <Link
              to="/profile"
              state={{ activeTab: "bookings" }}
              className="flex-1 bg-[#1784ad] hover:bg-[#147399] text-white py-3 px-4 rounded-lg flex items-center justify-center"
              onClick={onClose}
            >
              View My Bookings <FiArrowRight className="ml-2" />
            </Link>
            <button
              onClick={() => {
                navigate("/explore");
                onClose();
              }}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;
