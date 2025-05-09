import { useState } from "react";
import { FiSearch, FiMail, FiEdit2, FiCheckCircle } from "react-icons/fi";
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
function RequestList() {
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
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Customer Requests
        </h3>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search requests..."
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1784ad] text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-800">
                    {request.subject}
                  </div>
                  <div className="text-xs text-gray-500">
                    #{request.id.toString().padStart(5, "0")}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {request.category}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      request.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : request.priority === "Medium"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {request.priority}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      request.status === "Open"
                        ? "bg-blue-100 text-blue-800"
                        : request.status === "In Progress"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <FiMail className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700">
                      {request.customer}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {request.createdAt}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-500 hover:text-blue-700">
                      <FiEdit2 />
                    </button>
                    <button className="p-1 text-green-500 hover:text-green-700">
                      <FiCheckCircle />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RequestList;
