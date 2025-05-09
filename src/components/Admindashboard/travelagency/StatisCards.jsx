import {
  FiUsers,
  FiMapPin,
  FiTrendingUp,
  FiArrowUp,
  FiArrowDown,
  FiGlobe,
} from "react-icons/fi";

function StatisCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Agencies Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100 transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Agencies</p>
            <h3 className="text-2xl font-bold mt-1 text-gray-800">42</h3>
            <div className="flex items-center mt-2 text-sm text-green-500">
              <FiArrowUp className="mr-1" />
              <span>5.2%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-blue-50">
            <FiGlobe className="text-[#1784ad]" />
          </div>
        </div>
      </div>

      {/* Active Agencies Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100 transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm font-medium">Active Agencies</p>
            <h3 className="text-2xl font-bold mt-1 text-gray-800">38</h3>
            <div className="flex items-center mt-2 text-sm text-green-500">
              <FiArrowUp className="mr-1" />
              <span>3.8%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-green-50">
            <FiUsers className="text-[#10b981]" />
          </div>
        </div>
      </div>

      {/* Suspended Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-amber-100 transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm font-medium">Suspended</p>
            <h3 className="text-2xl font-bold mt-1 text-gray-800">4</h3>
            <div className="flex items-center mt-2 text-sm text-red-500">
              <FiArrowDown className="mr-1" />
              <span>1.2%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-amber-50">
            <FiTrendingUp className="text-[#f59e0b]" />
          </div>
        </div>
      </div>

      {/* New This Month Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-purple-100 transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm font-medium">New This Month</p>
            <h3 className="text-2xl font-bold mt-1 text-gray-800">7</h3>
            <div className="flex items-center mt-2 text-sm text-green-500">
              <FiArrowUp className="mr-1" />
              <span>12.5%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-purple-50">
            <FiMapPin className="text-[#8b5cf6]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisCards;
