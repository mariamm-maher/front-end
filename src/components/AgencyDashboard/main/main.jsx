import { useState } from "react";
import {
  FiTrendingUp,
  FiDollarSign,
  FiUsers,
  FiCalendar,
  FiChevronRight,
  FiDownload,
  FiMapPin,
} from "react-icons/fi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

// Sample data
const bookingData = [
  { name: "Jan", bookings: 300, revenue: 12000 },
  { name: "Feb", bookings: 500, revenue: 20000 },
  { name: "Mar", bookings: 450, revenue: 18000 },
  { name: "Apr", bookings: 700, revenue: 28000 },
  { name: "May", bookings: 800, revenue: 32000 },
  { name: "Jun", bookings: 900, revenue: 36000 },
];

const recentBookings = [
  {
    id: 1,
    customer: "John Doe",
    tour: "Bali Adventure",
    date: "2023-06-15",
    status: "Confirmed",
    amount: "$1,200",
  },
  {
    id: 2,
    customer: "Jane Smith",
    tour: "Paris Luxury",
    date: "2023-06-18",
    status: "Pending",
    amount: "$2,500",
  },
  {
    id: 3,
    customer: "Robert Johnson",
    tour: "Tokyo Discovery",
    date: "2023-06-20",
    status: "Confirmed",
    amount: "$1,800",
  },
  {
    id: 4,
    customer: "Emily Davis",
    tour: "Rome History",
    date: "2023-06-22",
    status: "Cancelled",
    amount: "$1,500",
  },
];

const topTours = [
  { name: "Bali Adventure", bookings: 245, revenue: "$98,000" },
  { name: "Paris Luxury", bookings: 189, revenue: "$236,250" },
  { name: "Tokyo Discovery", bookings: 132, revenue: "$118,800" },
  { name: "New York City Tour", bookings: 98, revenue: "$58,800" },
  { name: "Rome History", bookings: 76, revenue: "$45,600" },
];

// Stats Card Component
function StatsCard() {
  const stats = [
    {
      name: "Total Bookings",
      value: "1,248",
      change: "+12%",
      icon: <FiTrendingUp size={24} />,
      trend: "up",
    },
    {
      name: "Revenue",
      value: "$89,450",
      change: "+18%",
      icon: <FiDollarSign size={24} />,
      trend: "up",
    },
    {
      name: "New Customers",
      value: "324",
      change: "+8%",
      icon: <FiUsers size={24} />,
      trend: "up",
    },
    {
      name: "Upcoming Tours",
      value: "24",
      change: "-3%",
      icon: <FiCalendar size={24} />,
      trend: "down",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
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
              className={`p-3 rounded-lg ${
                stat.trend === "up"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Top Tours Component
function TopTour() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Top Tours</h3>
        <button className="text-sm text-blue-600 hover:underline">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {topTours.map((tour, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-800">{tour.name}</p>
                <p className="text-xs text-gray-500">
                  {tour.bookings} bookings
                </p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-800">{tour.revenue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Recent Bookings Component
function RecentBooking() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 md:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Recent Bookings</h3>
        <div className="flex items-center space-x-2">
          <button className="text-sm text-blue-600 hover:underline">
            View All
          </button>
          <button className="p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
            <FiDownload size={16} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tour
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                  {booking.customer}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {booking.tour}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {booking.date}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 font-medium">
                  {booking.amount}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "Pending"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main Dashboard Component
export default function Main() {
  return (
    <div className="space-y-6 w-full p-6">
      {/* Stats Cards */}
      <StatsCard />

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {/* Booking Trends - spans 2 columns on medium+ screens */}

        {/* Top Tours */}
        <TopTour />

        {/* Recent Bookings - spans 2 columns on medium+ screens */}
        <RecentBooking />
      </div>
    </div>
  );
}
