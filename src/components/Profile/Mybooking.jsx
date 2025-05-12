import { motion } from "framer-motion";
import { FiCalendar, FiDollarSign, FiUsers } from "react-icons/fi";
import {
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
} from "react-icons/fi";

const MyBookings = ({ bookings, isLoading }) => {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <FiCheckCircle className="text-green-500" />;
      case "approved":
        return <FiCheckCircle className="text-green-500" />;
      case "upcoming":
        return <FiClock className="text-blue-500" />;
      case "pending":
        return <FiClock className="text-blue-500" />;
      case "cancelled":
        return <FiXCircle className="text-red-500" />;
      case "rejected":
        return <FiXCircle className="text-red-500" />;
      default:
        return <FiAlertCircle className="text-yellow-500" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg">
            All
          </button>
          <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg">
            Approved
          </button>
          <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg">
            Rejected
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : bookings && bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <motion.div
              whileHover={{ y: -2 }}
              key={booking.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <img
                  src={
                    booking.mainPhoto ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={booking.tourTitle}
                  className="w-full md:w-48 h-48 object-cover"
                />
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{booking.tourTitle}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FiCalendar />{" "}
                          {new Date(booking.bookingDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiUsers /> {booking.numberOfPeople}{" "}
                          {booking.numberOfPeople === 1 ? "Person" : "People"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                      {getStatusIcon(booking.bookingStatus)}
                      <span className="capitalize">
                        {booking.bookingStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Booking ID</p>
                      <p className="font-medium">#{booking.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Price</p>
                      <p className="font-bold text-lg flex items-center">
                        <FiDollarSign className="text-gray-500" size={16} />
                        {booking.totalPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
                        View Details
                      </button>
                      {(booking.bookingStatus.toLowerCase() === "approved" ||
                        booking.bookingStatus.toLowerCase() === "pending") && (
                        <button className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm">
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No bookings found.</p>
          <p className="mt-2">
            Start exploring tours to make your first booking!
          </p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
