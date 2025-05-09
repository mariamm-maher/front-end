import {
  FiCheckCircle,
  FiClock,
  FiArrowUp,
  FiArrowDown,
  FiDollarSign,
  FiCreditCard,
} from "react-icons/fi";

function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Transactions Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100 transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm font-medium">
              Total Transactions
            </p>
            <h3 className="text-2xl font-bold mt-1 text-gray-800">128</h3>
            <div className="flex items-center mt-2 text-sm text-green-500">
              <FiArrowUp className="mr-1" />
              <span>+12%</span>
              <span className="text-gray-500 ml-1">vs last week</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-blue-50">
            <FiDollarSign className="text-[#1784ad]" />
          </div>
        </div>
      </div>

      {/* Completed Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100 transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm font-medium">Completed</p>
            <h3 className="text-2xl font-bold mt-1 text-gray-800">112</h3>
            <div className="flex items-center mt-2 text-sm text-green-500">
              <FiArrowUp className="mr-1" />
              <span>+8%</span>
              <span className="text-gray-500 ml-1">vs last week</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-green-50">
            <FiCheckCircle className="text-[#10b981]" />
          </div>
        </div>
      </div>

      {/* Pending Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-amber-100 transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm font-medium">Pending</p>
            <h3 className="text-2xl font-bold mt-1 text-gray-800">9</h3>
            <div className="flex items-center mt-2 text-sm text-red-500">
              <FiArrowDown className="mr-1" />
              <span>-2%</span>
              <span className="text-gray-500 ml-1">vs last week</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-amber-50">
            <FiClock className="text-[#f59e0b]" />
          </div>
        </div>
      </div>

      {/* Avg. Transaction Value Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-purple-100 transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm font-medium">
              Avg. Transaction Value
            </p>
            <h3 className="text-2xl font-bold mt-1 text-gray-800">$245.80</h3>
            <div className="flex items-center mt-2 text-sm text-green-500">
              <FiArrowUp className="mr-1" />
              <span>+$12.50</span>
              <span className="text-gray-500 ml-1">vs last week</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-purple-50">
            <FiCreditCard className="text-[#8b5cf6]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
