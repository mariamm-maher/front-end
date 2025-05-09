import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const accountGrowth = [
  { name: "Jan", accounts: 80, tourists: 60, agencies: 20 },
  { name: "Feb", accounts: 120, tourists: 90, agencies: 30 },
  { name: "Mar", accounts: 150, tourists: 110, agencies: 40 },
  { name: "Apr", accounts: 200, tourists: 150, agencies: 50 },
  { name: "May", accounts: 250, tourists: 190, agencies: 60 },
  { name: "Jun", accounts: 300, tourists: 230, agencies: 70 },
];

const roleDistribution = [
  { name: "Tourists", value: 78.4 },
  { name: "Agencies", value: 21.6 },
];
const COLORS = ["#1784ad", "#10b981"];
function Charts() {
  const [activeTab, setActiveTab] = useState("accounts");
  const [timeRange, setTimeRange] = useState("monthly");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Account Growth */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Account Growth
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab("accounts")}
              className={`px-3 py-1 text-sm rounded-lg ${
                activeTab === "accounts"
                  ? "bg-[#1784ad] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Total
            </button>
            <button
              onClick={() => setActiveTab("tourists")}
              className={`px-3 py-1 text-sm rounded-lg ${
                activeTab === "tourists"
                  ? "bg-[#1784ad] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Tourists
            </button>
            <button
              onClick={() => setActiveTab("agencies")}
              className={`px-3 py-1 text-sm rounded-lg ${
                activeTab === "agencies"
                  ? "bg-[#1784ad] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Agencies
            </button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={accountGrowth}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280" }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey={
                  activeTab === "accounts"
                    ? "accounts"
                    : activeTab === "tourists"
                    ? "tourists"
                    : "agencies"
                }
                stroke={
                  activeTab === "accounts"
                    ? "#1784ad"
                    : activeTab === "tourists"
                    ? "#10b981"
                    : "#f59e0b"
                }
                fill={
                  activeTab === "accounts"
                    ? "rgba(23, 132, 173, 0.1)"
                    : activeTab === "tourists"
                    ? "rgba(16, 185, 129, 0.1)"
                    : "rgba(245, 158, 11, 0.1)"
                }
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Role Distribution */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Role Distribution
          </h3>
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-1 px-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1784ad] text-sm"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roleDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(1)}%`
                }
                labelLine={false}
              >
                {roleDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value) => (
                  <span className="text-gray-600 text-sm">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Charts;
