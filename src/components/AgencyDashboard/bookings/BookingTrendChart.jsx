import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function BookingTrendChart({ bookingTrends }) {
  return (
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
  );
}

export default BookingTrendChart;
