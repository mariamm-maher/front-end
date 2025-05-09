import {
  FiGrid,
  FiArrowUp,
  FiArrowDown,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

const supportStats = [
  {
    title: "Total Requests",
    value: 24,
    icon: <FiGrid className="text-[#1784ad]" />,
    growth: "12%",
    trend: "up",
    color: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    title: "Open Tickets",
    value: 8,
    icon: <FiAlertCircle className="text-[#ef4444]" />,
    growth: "5%",
    trend: "up",
    color: "bg-red-50",
    border: "border-red-100",
  },
  {
    title: "Resolved Today",
    value: 6,
    icon: <FiCheckCircle className="text-[#10b981]" />,
    growth: "20%",
    trend: "up",
    color: "bg-green-50",
    border: "border-green-100",
  },
  {
    title: "Avg. Response Time",
    value: "2.4h",
    icon: <FiClock className="text-[#f59e0b]" />,
    growth: "15%",
    trend: "down",
    color: "bg-amber-50",
    border: "border-amber-100",
  },
];
function StatsCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {supportStats.map((stat, index) => (
        <div
          key={index}
          className={`bg-white rounded-xl p-5 shadow-sm border ${stat.border} transition-all hover:shadow-md`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-800">
                {stat.value}
              </h3>
              <div
                className={`flex items-center mt-2 text-sm ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.trend === "up" ? (
                  <FiArrowUp className="mr-1" />
                ) : (
                  <FiArrowDown className="mr-1" />
                )}
                <span>{stat.growth}</span>
                <span className="text-gray-500 ml-1">vs last week</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCard;
