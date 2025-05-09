import { useState } from "react";
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
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BookingRequestsDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Sample data
  const bookingData = [
    {
      id: 1,
      user: "Amina Salim",
      email: "amina@example.com",
      tour: "Sahara Desert Adventure",
      date: "2025-04-15",
      status: "pending",
      guests: 2,
      price: "$450",
      payment: "unpaid",
    },
    {
      id: 2,
      user: "John Doe",
      email: "john@example.com",
      tour: "Marrakech City Tour",
      date: "2025-04-12",
      status: "confirmed",
      guests: 4,
      price: "$680",
      payment: "paid",
    },
    {
      id: 3,
      user: "Fatima Zahra",
      email: "fatima@example.com",
      tour: "Atlas Mountains Trek",
      date: "2025-04-18",
      status: "cancelled",
      guests: 1,
      price: "$220",
      payment: "refunded",
    },
    {
      id: 4,
      user: "Ali Omar",
      email: "ali@example.com",
      tour: "Coastal Escape",
      date: "2025-04-20",
      status: "pending",
      guests: 3,
      price: "$540",
      payment: "unpaid",
    },
  ];

  // Stats data
  const stats = [
    { name: "Total Bookings", value: "124", change: "+12%", trend: "up" },
    { name: "Pending", value: "24", change: "+5%", trend: "up" },
    { name: "Confirmed", value: "89", change: "+18%", trend: "up" },
    { name: "Revenue", value: "$24,580", change: "+22%", trend: "up" },
  ];

  // Chart data
  const bookingTrends = [
    { name: "Jan", bookings: 45 },
    { name: "Feb", bookings: 68 },
    { name: "Mar", bookings: 72 },
    { name: "Apr", bookings: 89 },
    { name: "May", bookings: 94 },
    { name: "Jun", bookings: 112 },
  ];

  // Filter bookings based on active tab, search query and date filter
  const filteredBookings = bookingData.filter((booking) => {
    const matchesTab = activeTab === "all" || booking.status === activeTab;
    const matchesSearch =
      booking.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.tour.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate =
      dateFilter === "all" || booking.date.includes(dateFilter);

    return matchesTab && matchesSearch && matchesDate;
  });

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
          {/* Booking Requests Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden ">
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
                          <option value="2025-04">April 2025</option>
                          <option value="2025-05">May 2025</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

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
                          {booking.guests} guests • {booking.price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                        <div className="text-xs mt-1 text-gray-500 capitalize">
                          {booking.payment}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="View details"
                        >
                          <FiEye size={18} />
                        </button>
                        {booking.status === "pending" && (
                          <>
                            <button
                              className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                              title="Confirm booking"
                            >
                              <FiCheckCircle size={18} />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              title="Cancel booking"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingRequestsDashboard;
