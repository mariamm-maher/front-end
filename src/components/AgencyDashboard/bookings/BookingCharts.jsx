import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

function BookingCharts({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
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
              className={`p-3 rounded-full ${
                stat.trend === "up"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {stat.trend === "up" ? (
                <FiTrendingUp size={20} />
              ) : (
                <FiTrendingDown size={20} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingCharts;
