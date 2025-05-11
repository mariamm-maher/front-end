import { useState, useEffect } from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiDownload,
  FiSearch,
  FiFilter,
  FiUser,
  FiCalendar,
  FiMapPin,
  FiChevronDown,
  FiPlus,
  FiTrendingUp,
  FiAlertCircle,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  getAllBookings,
  updateBookingStatus,
  getBookingDetails,
} from "../../../services/TravelAgencyApi";
import { format } from "date-fns";

const BookingRequestsDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loadingBookingDetails, setLoadingBookingDetails] = useState(false);
  const [actionInProgress, setActionInProgress] = useState(false);

  // Stats for the dashboard
  const [stats, setStats] = useState([
    { name: "Total Bookings", value: "0", change: "0%", trend: "up" },
    { name: "Pending", value: "0", change: "0%", trend: "up" },
    { name: "Confirmed", value: "0", change: "0%", trend: "up" },
    { name: "Revenue", value: "$0", change: "0%", trend: "up" },
  ]);

  // Chart data
  const [bookingTrends, setBookingTrends] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchBookings();
  }, []);
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllBookings();
      // Ensure data is an array before setting state
      const bookingsArray = Array.isArray(data) ? data : [];
      setBookings(bookingsArray);

      // Update stats
      updateStats(bookingsArray);

      // Generate booking trends (this would be better from an API endpoint)
      generateBookingTrends(bookingsArray);

      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch bookings");
      setLoading(false);
      // Set bookings to empty array in case of error
      setBookings([]);
    }
  };

  const updateStats = (bookingsData) => {
    // Calculate statistics from bookings data
    const totalBookings = bookingsData.length;

    const pendingBookings = bookingsData.filter(
      (b) => b.status.toLowerCase() === "pending"
    ).length;

    const confirmedBookings = bookingsData.filter(
      (b) => b.status.toLowerCase() === "confirmed"
    ).length;

    // Calculate total revenue (assuming each booking has a price field)
    const totalRevenue = bookingsData.reduce((sum, booking) => {
      // Assuming price might be stored in different formats
      const price =
        typeof booking.price === "string"
          ? parseFloat(booking.price.replace(/[^0-9.-]+/g, ""))
          : booking.price;

      return sum + (isNaN(price) ? 0 : price);
    }, 0);

    setStats([
      {
        name: "Total Bookings",
        value: totalBookings.toString(),
        change: "+12%",
        trend: "up",
      },
      {
        name: "Pending",
        value: pendingBookings.toString(),
        change: "+5%",
        trend: "up",
      },
      {
        name: "Confirmed",
        value: confirmedBookings.toString(),
        change: "+18%",
        trend: "up",
      },
      {
        name: "Revenue",
        value: `$${totalRevenue.toFixed(2)}`,
        change: "+22%",
        trend: "up",
      },
    ]);
  };

  const generateBookingTrends = (bookingsData) => {
    // This is a simplified version - in a real app, you'd group by month and count
    const monthCounts = {};

    // Get last 6 months
    const months = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = format(month, "MMM");
      months.push(monthName);
      monthCounts[monthName] = 0;
    } // Count bookings per month
    bookingsData.forEach((booking) => {
      try {
        const bookingDate = new Date(booking.date);
        const monthName = format(bookingDate, "MMM");
        if (monthCounts[monthName] !== undefined) {
          monthCounts[monthName]++;
        }
      } catch {
        // Handle invalid dates silently
      }
    });

    // Convert to chart data format
    const trends = months.map((month) => ({
      name: month,
      bookings: monthCounts[month] || 0,
    }));

    setBookingTrends(trends);
  };

  const handleViewDetails = async (bookingId) => {
    try {
      setLoadingBookingDetails(true);
      setShowModal(true);
      const details = await getBookingDetails(bookingId);
      setBookingDetails(details);
      setLoadingBookingDetails(false);
    } catch (err) {
      setError(err.message || "Failed to fetch booking details");
      setLoadingBookingDetails(false);
    }
  };

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      setActionInProgress(true);
      await updateBookingStatus(bookingId, newStatus);

      // Update the local state to reflect the change
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: newStatus.toLowerCase() }
            : booking
        )
      );

      // If we were viewing this booking's details, update them too
      if (bookingDetails && bookingDetails.id === bookingId) {
        setBookingDetails({
          ...bookingDetails,
          status: newStatus.toLowerCase(),
        });
      }

      // Update stats after status change
      updateStats(
        bookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: newStatus.toLowerCase() }
            : booking
        )
      );

      setActionInProgress(false);
    } catch (err) {
      setError(err.message || `Failed to update booking to ${newStatus}`);
      setActionInProgress(false);
    }
  };
  // Filter bookings based on active tab, search query and date filter
  const filteredBookings = Array.isArray(bookings)
    ? bookings.filter((booking) => {
        const matchesTab =
          activeTab === "all" || booking.status.toLowerCase() === activeTab;
        const matchesSearch =
          booking.user?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.tour?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.email?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDate =
          dateFilter === "all" ||
          (booking.date && booking.date.includes(dateFilter));

        return matchesTab && matchesSearch && matchesDate;
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 w-full">
      <div className=" mx-auto space-y-6">
        {/* Header with Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-semibold text-gray-800 mt-1">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-2 ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </div>
                <div
                  className={`p-3 rounded-full ${
                    stat.trend === "up"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <FiTrendingUp size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Trends Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-medium text-gray-700 mb-4">Booking Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingTrends}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Booking Requests Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex space-x-2">
                {["all", "pending", "confirmed", "cancelled"].map((status) => (
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
                                  {booking.user}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {booking.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {booking.tour}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.guests || booking.numberOfPeople} guests
                              • {booking.price}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                booking.status.toLowerCase() === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status.toLowerCase() === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {booking.status}
                            </span>
                            <div className="text-xs mt-1 text-gray-500 capitalize">
                              {booking.payment || booking.paymentMethod}
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
                            {booking.status.toLowerCase() === "pending" && (
                              <>
                                <button
                                  className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                  title="Confirm booking"
                                  onClick={() =>
                                    handleUpdateStatus(booking.id, "Confirmed")
                                  }
                                  disabled={actionInProgress}
                                >
                                  <FiCheckCircle size={18} />
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                  title="Cancel booking"
                                  onClick={() =>
                                    handleUpdateStatus(booking.id, "Cancelled")
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
        </div>
      </div>

      {/* Booking Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Booking Details
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setShowModal(false);
                  setBookingDetails(null);
                }}
              >
                &times;
              </button>
            </div>

            <div className="p-6">
              {loadingBookingDetails ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-4 text-gray-500">
                    Loading booking details...
                  </p>
                </div>
              ) : !bookingDetails ? (
                <div className="text-center text-red-500 py-8">
                  <FiAlertCircle size={32} className="mx-auto mb-4" />
                  <p>Failed to load booking details</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Booking Status */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">
                        Booking Status
                      </span>
                      <div className="mt-1">
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            bookingDetails.status.toLowerCase() === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : bookingDetails.status.toLowerCase() ===
                                "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {bookingDetails.status}
                        </span>
                      </div>
                    </div>

                    {bookingDetails.status.toLowerCase() === "pending" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleUpdateStatus(bookingDetails.id, "Confirmed")
                          }
                          disabled={actionInProgress}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center"
                        >
                          <FiCheckCircle className="mr-2" /> Confirm
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(bookingDetails.id, "Cancelled")
                          }
                          disabled={actionInProgress}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center"
                        >
                          <FiXCircle className="mr-2" /> Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Booking Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Customer Information */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-4">
                        Customer Information
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-500">Name</span>
                          <p className="font-medium">{bookingDetails.user}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Email</span>
                          <p className="font-medium">{bookingDetails.email}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Phone</span>
                          <p className="font-medium">
                            {bookingDetails.phone || "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tour Information */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-4">
                        Tour Information
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-500">
                            Tour Name
                          </span>
                          <p className="font-medium">{bookingDetails.tour}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Date</span>
                          <p className="font-medium">{bookingDetails.date}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Guests</span>
                          <p className="font-medium">
                            {bookingDetails.guests ||
                              bookingDetails.numberOfPeople}{" "}
                            people
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                      <h4 className="font-medium text-gray-700 mb-4">
                        Payment Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-sm text-gray-500">
                            Payment Method
                          </span>
                          <p className="font-medium capitalize">
                            {bookingDetails.payment ||
                              bookingDetails.paymentMethod}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Amount</span>
                          <p className="font-medium">
                            {bookingDetails.price || "Not specified"}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">
                            Payment Status
                          </span>
                          <p className="font-medium">
                            {bookingDetails.payment === "paid"
                              ? "Paid"
                              : bookingDetails.payment === "refunded"
                              ? "Refunded"
                              : "Unpaid"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    {bookingDetails.notes && (
                      <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                        <h4 className="font-medium text-gray-700 mb-2">
                          Additional Notes
                        </h4>
                        <p className="text-gray-600">{bookingDetails.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingRequestsDashboard;
