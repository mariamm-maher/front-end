import { FiGrid, FiTrendingUp, FiArrowUp, FiArrowDown } from "react-icons/fi";

const categoryStats = [
  {
    title: "Total Categories",
    value: 4,
    icon: <FiGrid className="text-[#1784ad]" />,
    growth: "0%",
    trend: "neutral",
    color: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    title: "Most Popular",
    value: "Adventure",
    icon: <FiTrendingUp className="text-[#10b981]" />,
    growth: "12.5%",
    trend: "up",
    color: "bg-green-50",
    border: "border-green-100",
  },
  {
    title: "Fastest Growing",
    value: "Luxury",
    icon: <FiArrowUp className="text-[#f59e0b]" />,
    growth: "8.3%",
    trend: "up",
    color: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    title: "Lowest Bookings",
    value: "Historical",
    icon: <FiArrowDown className="text-[#8b5cf6]" />,
    growth: "2.1%",
    trend: "down",
    color: "bg-purple-50",
    border: "border-purple-100",
  },
];
function StatsCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categoryStats.map((stat, index) => (
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
              {stat.trend !== "neutral" && (
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
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              )}
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCard;
