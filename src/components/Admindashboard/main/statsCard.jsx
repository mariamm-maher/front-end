import {
  FiUsers,
  FiDollarSign,
  FiCalendar as FiCal,
  FiMapPin,
} from "react-icons/fi";
const stats = [
  {
    name: "Total Bookings",
    value: "1,248",
    icon: FiUsers,
    change: "+12%",
    trend: "up",
  },
  {
    name: "Revenue",
    value: "$89,450",
    icon: FiDollarSign,
    change: "+18%",
    trend: "up",
  },
  {
    name: "Upcoming Tours",
    value: "24",
    icon: FiMapPin,
    change: "-3%",
    trend: "down",
  },
  {
    name: "Pending Approvals",
    value: "8",
    icon: FiCal,
    change: "+2",
    trend: "neutral",
  },
];

function StatsCard() {
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
                  stat.trend === "up"
                    ? "text-green-600"
                    : stat.trend === "down"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {stat.change} {stat.trend !== "neutral" && "from last month"}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <stat.icon size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCard;
