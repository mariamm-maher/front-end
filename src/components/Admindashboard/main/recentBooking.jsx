import { FiDownload, FiCalendar as FiCal } from "react-icons/fi";
const recentBookings = [
  {
    id: 1,
    customer: "John Doe",
    tour: "Bali Adventure",
    date: "2023-06-15",
    status: "Confirmed",
    amount: "$1,200",
    duration: "7 days",
  },
  {
    id: 2,
    customer: "Jane Smith",
    tour: "Paris Luxury",
    date: "2023-06-18",
    status: "Pending",
    amount: "$2,500",
    duration: "5 days",
  },
  {
    id: 3,
    customer: "Robert Johnson",
    tour: "Bali Adventure",
    date: "2023-06-20",
    status: "Pending",
    amount: "$1,200",
    duration: "7 days",
  },
];

function RecentBooking() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
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

export default RecentBooking;
