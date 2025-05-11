import {
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiSearch,
  FiFilter,
  FiUser,
  FiChevronDown,
  FiAlertCircle,
} from "react-icons/fi";

function BookingTable({
  loading,
  error,
  fetchBookings,
  filteredBookings,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  dateFilter,
  setDateFilter,
  actionInProgress,
  handleViewDetails,
  handleUpdateStatus,
}) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {" "}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex space-x-2">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`text-sm capitalize px-3 py-1 rounded-md ${
                activeTab === status
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex space-x-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search bookings..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <FiFilter className="mr-2" />
              Filters
              <FiChevronDown className="ml-1" />
            </button>

            {showFilters && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 p-3">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    <option value="all">All Dates</option>
                    <option value="2023-09">September 2023</option>
                    <option value="2023-10">October 2023</option>
                    <option value="2023-11">November 2023</option>
                    <option value="2023-12">December 2023</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {loading ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading bookings...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center text-red-500 flex flex-col items-center">
          <FiAlertCircle size={24} className="mb-2" />
          <p>{error}</p>
          <button
            onClick={fetchBookings}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tour
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                          <FiUser />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.user?.touristName ||
                              booking.touristName ||
                              booking.userName ||
                              "Unknown User"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.trip?.name ||
                          booking.tourTitle ||
                          "Unknown Trip"}
                      </div>
                      <div className="text-sm text-gray-500">
                        ({booking.numberOfPeople || 0}) people • $
                        {booking.totalPrice || booking.price || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.bookingDate
                        ? new Date(booking.bookingDate).toLocaleDateString()
                        : booking.date || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          (
                            booking.bookingStatus ||
                            booking.status ||
                            ""
                          ).toLowerCase() === "approved"
                            ? "bg-green-100 text-green-800"
                            : (
                                booking.bookingStatus ||
                                booking.status ||
                                ""
                              ).toLowerCase() === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.bookingStatus || booking.status || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs text-gray-500 capitalize">
                        {booking.paymentMethod ||
                          booking.payment ||
                          "Not specified"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="View details"
                        onClick={() => handleViewDetails(booking.id)}
                        disabled={actionInProgress}
                      >
                        <FiEye size={18} />
                      </button>
                      {(
                        booking.bookingStatus ||
                        booking.status ||
                        ""
                      ).toLowerCase() === "pending" && (
                        <>
                          <button
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                            title="Confirm booking"
                            onClick={() =>
                              handleUpdateStatus(booking.id, "approve")
                            }
                            disabled={actionInProgress}
                          >
                            <FiCheckCircle size={18} />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                            title="Cancel booking"
                            onClick={() =>
                              handleUpdateStatus(booking.id, "reject")
                            }
                            disabled={actionInProgress}
                          >
                            <FiXCircle size={18} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No bookings match your current filters
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BookingTable;
