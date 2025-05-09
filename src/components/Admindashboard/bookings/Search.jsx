import { useState } from "react";
import { FiSearch, FiFilter, FiChevronDown } from "react-icons/fi";
const transactionList = [
  {
    id: "TRX-2023-0425",
    bookingId: "BK-2023-0425",
    customer: "john.doe@example.com",
    type: "Tour Bookings",
    amount: "$320.00",
    status: "Completed",
    paymentMethod: "Credit Card",
    date: "2023-06-15",
    lastUpdated: "2023-06-15 09:45",
    description: "Full day city tour with lunch included",
  },
  {
    id: "TRX-2023-0424",
    bookingId: "BK-2023-0424",
    customer: "jane.smith@example.com",
    type: "Hotel Reservations",
    amount: "$450.00",
    status: "Completed",
    paymentMethod: "PayPal",
    date: "2023-06-14",
    lastUpdated: "2023-06-14 14:20",
    description: "3-night stay at Grand Hotel (Deluxe Room)",
  },
  {
    id: "TRX-2023-0423",
    bookingId: "BK-2023-0423",
    customer: "robert.johnson@example.com",
    type: "Activity Tickets",
    amount: "$75.50",
    status: "Pending",
    paymentMethod: "Credit Card",
    date: "2023-06-13",
    lastUpdated: "2023-06-13 17:30",
    description: "Sunset boat tour for 2 adults",
  },
  {
    id: "TRX-2023-0422",
    bookingId: "BK-2023-0422",
    customer: "emily.wilson@example.com",
    type: "Tour Bookings",
    amount: "$210.00",
    status: "Refunded",
    paymentMethod: "Credit Card",
    date: "2023-06-12",
    lastUpdated: "2023-06-13 10:15",
    description: "Half-day hiking tour (cancelled by customer)",
  },
  {
    id: "TRX-2023-0421",
    bookingId: "BK-2023-0421",
    customer: "michael.brown@example.com",
    type: "Transportation",
    amount: "$60.00",
    status: "Completed",
    paymentMethod: "Bank Transfer",
    date: "2023-06-11",
    lastUpdated: "2023-06-11 11:45",
    description: "Airport transfer service",
  },
];
function Search() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = transactionList.filter((transaction) => {
    const matchesSearch =
      transaction.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ||
      transaction.status.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: transactionList.length,
    completed: transactionList.filter((t) => t.status === "Completed").length,
    pending: transactionList.filter((t) => t.status === "Pending").length,
    refunded: transactionList.filter((t) => t.status === "Refunded").length,
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1.5 text-sm rounded-lg flex items-center ${
              activeFilter === "all"
                ? "bg-[#1784ad] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            All ({statusCounts.all})
          </button>
          <button
            onClick={() => setActiveFilter("completed")}
            className={`px-3 py-1.5 text-sm rounded-lg flex items-center ${
              activeFilter === "completed"
                ? "bg-[#1784ad] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Completed ({statusCounts.completed})
          </button>
          <button
            onClick={() => setActiveFilter("pending")}
            className={`px-3 py-1.5 text-sm rounded-lg flex items-center ${
              activeFilter === "pending"
                ? "bg-[#1784ad] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Pending ({statusCounts.pending})
          </button>
          <button
            onClick={() => setActiveFilter("refunded")}
            className={`px-3 py-1.5 text-sm rounded-lg flex items-center ${
              activeFilter === "refunded"
                ? "bg-[#1784ad] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Refunded ({statusCounts.refunded})
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search transactions..."
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1784ad] text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <FiFilter className="mr-2" />
            Filters
            <FiChevronDown
              className={`ml-1 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transaction Type
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#1784ad] focus:border-[#1784ad]">
                <option value="">All Types</option>
                <option value="Tour Bookings">Tour Bookings</option>
                <option value="Hotel Reservations">Hotel Reservations</option>
                <option value="Activity Tickets">Activity Tickets</option>
                <option value="Transportation">Transportation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#1784ad] focus:border-[#1784ad]">
                <option value="">All Methods</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#1784ad] focus:border-[#1784ad]">
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-3">
            <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              Reset
            </button>
            <button className="px-4 py-2 bg-[#1784ad] text-white text-sm rounded-lg hover:bg-[#14739c]">
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
