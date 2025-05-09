import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import { useState } from "react";
const bookingData = [
  { name: "Jan", bookings: 300, revenue: 12000 },
  { name: "Feb", bookings: 500, revenue: 20000 },
  { name: "Mar", bookings: 450, revenue: 18000 },
  { name: "Apr", bookings: 700, revenue: 28000 },
  { name: "May", bookings: 800, revenue: 32000 },
  { name: "Jun", bookings: 900, revenue: 36000 },
];
function BookingTrends() {
  const [activeTab, setActiveTab] = useState("bookings");
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-800">Booking Trends</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-3 py-1 text-sm rounded-lg ${
              activeTab === "bookings"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab("revenue")}
            className={`px-3 py-1 text-sm rounded-lg ${
              activeTab === "revenue"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Revenue
          </button>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={bookingData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280" }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={activeTab === "bookings" ? "bookings" : "revenue"}
              stroke={activeTab === "bookings" ? "#3b82f6" : "#10b981"}
              fill={
                activeTab === "bookings"
                  ? "rgba(59, 130, 246, 0.1)"
                  : "rgba(16, 185, 129, 0.1)"
              }
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BookingTrends;
