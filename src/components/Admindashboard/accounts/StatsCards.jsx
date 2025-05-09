import {
  FiUsers,
  FiUser,
  FiBriefcase,
  FiArrowUp,
  FiArrowDown,
  FiLock,
} from "react-icons/fi";

function StatsCards({ accounts }) {
  // Calculate statistics from the accounts data
  const totalAccounts = accounts ? accounts.length : 0;
  const tourists = accounts
    ? accounts.filter((account) => account.role === "tourist").length
    : 0;
  const agencies = accounts
    ? accounts.filter((account) => account.role === "agency").length
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Accounts Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100 transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Accounts</p>
            <h3 className="text-2xl font-bold mt-1 text-gray-800">
              {totalAccounts}
            </h3>
            <div className="flex items-center mt-2 text-sm text-green-500">
              <FiArrowUp className="mr-1" />
              <span>8.2%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-blue-50">
            <FiUsers className="text-[#1784ad]" />
          </div>
        </div>
      </div>

      {/* Tourists Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100 transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm font-medium">Tourists</p>
            <h3 className="text-2xl font-bold mt-1 text-gray-800">
              {tourists}
            </h3>
            <div className="flex items-center mt-2 text-sm text-green-500">
              <FiArrowUp className="mr-1" />
              <span>6.5%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-green-50">
            <FiUser className="text-[#10b981]" />
          </div>
        </div>
      </div>

      {/* Agencies Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-amber-100 transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm font-medium">Agencies</p>
            <h3 className="text-2xl font-bold mt-1 text-gray-800">
              {agencies}
            </h3>
            <div className="flex items-center mt-2 text-sm text-green-500">
              <FiArrowUp className="mr-1" />
              <span>12.3%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-amber-50">
            <FiBriefcase className="text-[#f59e0b]" />
          </div>
        </div>
      </div>

      {/* Suspended Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-purple-100 transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm font-medium">Suspended</p>
            <h3 className="text-2xl font-bold mt-1 text-gray-800">0</h3>
            <div className="flex items-center mt-2 text-sm text-red-500">
              <FiArrowDown className="mr-1" />
              <span>2.1%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-purple-50">
            <FiLock className="text-[#8b5cf6]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
