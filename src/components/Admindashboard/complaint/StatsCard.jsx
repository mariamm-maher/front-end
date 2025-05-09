import {
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiArrowUp,
  FiArrowDown,
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

function StatsCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {complaintStats.map((stat, index) => (
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
                <span>{stat.change}</span>
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
