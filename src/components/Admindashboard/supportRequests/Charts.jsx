import { useState } from "react";
import { FiEdit2, FiSearch, FiCheckCircle, FiMail } from "react-icons/fi";
const priorityData = [
  { name: "High", value: 8 },
  { name: "Medium", value: 10 },
  { name: "Low", value: 6 },
];
const requestList = [
  {
    id: 1,
    subject: "Payment issue for booking #12345",
    category: "Billing",
    priority: "High",
    status: "Open",
    customer: "john.doe@example.com",
    createdAt: "2023-05-15 09:30",
    lastUpdated: "2023-05-15 10:15",
  },
  {
    id: 2,
    subject: "Need to change tour date for booking #12346",
    category: "Booking",
    priority: "Medium",
    status: "In Progress",
    customer: "sarah.smith@example.com",
    createdAt: "2023-05-14 14:20",
    lastUpdated: "2023-05-15 09:45",
  },
  {
    id: 3,
    subject: "Question about cancellation policy",
    category: "General",
    priority: "Low",
    status: "Resolved",
    customer: "mike.johnson@example.com",
    createdAt: "2023-05-13 11:10",
    lastUpdated: "2023-05-14 16:30",
  },
  {
    id: 4,
    subject: "Technical issue with mobile app",
    category: "Technical",
    priority: "High",
    status: "Open",
    customer: "lisa.wang@example.com",
    createdAt: "2023-05-15 08:45",
    lastUpdated: "2023-05-15 08:45",
  },
  {
    id: 5,
    subject: "Feedback about recent tour",
    category: "Feedback",
    priority: "Low",
    status: "Open",
    customer: "david.miller@example.com",
    createdAt: "2023-05-14 17:30",
    lastUpdated: "2023-05-14 17:30",
  },
];
const COLORS = ["#ef4444", "#f59e0b", "#10b981"];
function Charts() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = requestList.filter((request) => {
    const matchesSearch =
      request.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      request.status.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Request Priority Distribution
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1 text-sm rounded-lg ${
              activeTab === "all"
                ? "bg-[#1784ad] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("open")}
            className={`px-3 py-1 text-sm rounded-lg ${
              activeTab === "open"
                ? "bg-[#1784ad] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Open
          </button>
          <button
            onClick={() => setActiveTab("in progress")}
            className={`px-3 py-1 text-sm rounded-lg ${
              activeTab === "in progress"
                ? "bg-[#1784ad] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setActiveTab("resolved")}
            className={`px-3 py-1 text-sm rounded-lg ${
              activeTab === "resolved"
                ? "bg-[#1784ad] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Resolved
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {priorityData.map((priority, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-3"
              style={{ backgroundColor: COLORS[index] }}
            ></div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">{priority.name} Priority</span>
                <span className="font-medium">{priority.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${(priority.value / 24) * 100}%`,
                    backgroundColor: COLORS[index],
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Charts;
