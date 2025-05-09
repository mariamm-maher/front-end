import { useState } from "react";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiSearch,
  FiCalendar,
  FiFilter,
  FiChevronDown,
} from "react-icons/fi";
const complaintStats = [
  {
    title: "Total Complaints",
    value: 42,
    icon: <FiAlertTriangle className="text-[#ef4444]" />,
    change: "+5%",
    trend: "up",
    color: "bg-red-50",
    border: "border-red-100",
  },
  {
    title: "Resolved",
    value: 28,
    icon: <FiCheckCircle className="text-[#10b981]" />,
    change: "+12%",
    trend: "up",
    color: "bg-green-50",
    border: "border-green-100",
  },
  {
    title: "In Progress",
    value: 8,
    icon: <FiClock className="text-[#f59e0b]" />,
    change: "-3%",
    trend: "down",
    color: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    title: "Avg. Resolution Time",
    value: "2.8 days",
    icon: <FiCalendar className="text-[#1784ad]" />,
    change: "-0.5 days",
    trend: "down",
    color: "bg-blue-50",
    border: "border-blue-100",
  },
];

const complaintTypes = [
  { name: "Service Quality", count: 18, color: "#ef4444" },
  { name: "Billing Issues", count: 12, color: "#f59e0b" },
  { name: "Booking Problems", count: 7, color: "#1784ad" },
  { name: "Technical Issues", count: 5, color: "#8b5cf6" },
];
const complaintList = [
  {
    id: "COMP-2023-0015",
    subject: "Poor tour guide service",
    type: "Service Quality",
    priority: "High",
    status: "Open",
    customer: "michael.johnson@example.com",
    date: "2023-06-15",
    lastUpdated: "2023-06-16 14:30",
    description:
      "The tour guide was unprepared and provided incorrect information about historical sites during the entire tour.",
  },
  {
    id: "COMP-2023-0014",
    subject: "Double charged for booking",
    type: "Billing Issues",
    priority: "High",
    status: "In Progress",
    customer: "sarah.williams@example.com",
    date: "2023-06-14",
    lastUpdated: "2023-06-15 11:15",
    description:
      "I was charged twice for the same booking (transaction IDs #45678 and #45679). Please refund the duplicate charge.",
  },
  {
    id: "COMP-2023-0013",
    subject: "Website not accepting payment",
    type: "Technical Issues",
    priority: "Medium",
    status: "Resolved",
    customer: "david.miller@example.com",
    date: "2023-06-13",
    lastUpdated: "2023-06-14 16:45",
    description:
      "Payment gateway fails every time I try to complete my booking. Error message: 'Payment processing failed (Code: PG-402)'.",
  },
  {
    id: "COMP-2023-0012",
    subject: "Wrong tour date confirmed",
    type: "Booking Problems",
    priority: "Medium",
    status: "Resolved",
    customer: "lisa.wang@example.com",
    date: "2023-06-12",
    lastUpdated: "2023-06-13 09:20",
    description:
      "I booked for June 20th but received confirmation for June 22nd. This doesn't work with my travel plans.",
  },
  {
    id: "COMP-2023-0011",
    subject: "Vehicle condition unsatisfactory",
    type: "Service Quality",
    priority: "Low",
    status: "Open",
    customer: "robert.garcia@example.com",
    date: "2023-06-11",
    lastUpdated: "2023-06-11 17:30",
    description:
      "The tour vehicle had broken AC and dirty seats. Photos attached.",
  },
];
function Search() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredComplaints = complaintList.filter((complaint) => {
    const matchesSearch =
      complaint.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ||
      complaint.status.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: complaintList.length,
    open: complaintList.filter((c) => c.status === "Open").length,
    inprogress: complaintList.filter((c) => c.status === "In Progress").length,
    resolved: complaintList.filter((c) => c.status === "Resolved").length,
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
            onClick={() => setActiveFilter("open")}
            className={`px-3 py-1.5 text-sm rounded-lg flex items-center ${
              activeFilter === "open"
                ? "bg-[#1784ad] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Open ({statusCounts.open})
          </button>
          <button
            onClick={() => setActiveFilter("inprogress")}
            className={`px-3 py-1.5 text-sm rounded-lg flex items-center ${
              activeFilter === "inprogress"
                ? "bg-[#1784ad] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            In Progress ({statusCounts.inprogress})
          </button>
          <button
            onClick={() => setActiveFilter("resolved")}
            className={`px-3 py-1.5 text-sm rounded-lg flex items-center ${
              activeFilter === "resolved"
                ? "bg-[#1784ad] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Resolved ({statusCounts.resolved})
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search complaints..."
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
                Complaint Type
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#1784ad] focus:border-[#1784ad]">
                <option value="">All Types</option>
                <option value="Service Quality">Service Quality</option>
                <option value="Billing Issues">Billing Issues</option>
                <option value="Booking Problems">Booking Problems</option>
                <option value="Technical Issues">Technical Issues</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#1784ad] focus:border-[#1784ad]">
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
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
