import { FiGrid, FiTrendingUp, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const categoryPerformance = [
  { name: "Jan", Historical: 120, Nature: 180, Adventure: 320, Luxury: 150 },
  { name: "Feb", Historical: 150, Nature: 210, Adventure: 380, Luxury: 190 },
  { name: "Mar", Historical: 110, Nature: 190, Adventure: 350, Luxury: 220 },
  { name: "Apr", Historical: 130, Nature: 230, Adventure: 420, Luxury: 250 },
  { name: "May", Historical: 140, Nature: 250, Adventure: 450, Luxury: 280 },
  { name: "Jun", Historical: 160, Nature: 270, Adventure: 490, Luxury: 310 },
];

const categoryDistribution = [
  { name: "Adventure", value: 42 },
  { name: "Nature", value: 28 },
  { name: "Luxury", value: 18 },
  { name: "Historical", value: 12 },
];

const COLORS = ["#1784ad", "#10b981", "#f59e0b", "#8b5cf6"];
function Charts() {
  const [activeTab, setActiveTab] = useState("bookings");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Category Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Category Performance
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-3 py-1 text-sm rounded-lg ${
                activeTab === "bookings"
                  ? "bg-[#1784ad] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab("growth")}
              className={`px-3 py-1 text-sm rounded-lg ${
                activeTab === "growth"
                  ? "bg-[#1784ad] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Growth
            </button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryPerformance}>
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
              <Bar dataKey="Adventure" fill="#1784ad" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Nature" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Luxury" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Historical" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Category Distribution
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {categoryDistribution.map((entry, index) => (
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
