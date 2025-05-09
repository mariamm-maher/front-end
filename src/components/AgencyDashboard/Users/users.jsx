import { useState } from "react";
import {
  FiPlus,
  FiDownload,
  FiUser,
  FiEdit,
  FiEye,
  FiXCircle,
} from "react-icons/fi";

const UserManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");

  const userData = [
    {
      id: 1,
      name: "Amina Salim",
      email: "amina@example.com",
      role: "Admin",
      status: "active",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      role: "Customer",
      status: "inactive",
    },
    {
      id: 3,
      name: "Fatima Zahra",
      email: "fatima@example.com",
      role: "Customer",
      status: "active",
    },
    {
      id: 4,
      name: "Ali Omar",
      email: "ali@example.com",
      role: "Moderator",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Create User */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            User Management
          </h2>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
            <FiPlus className="mr-2" /> Add New User
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b pb-2">
          {["all", "active", "inactive", "pending"].map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`text-sm capitalize px-3 py-1 rounded-md ${
                activeTab === status
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Export Button */}
        <div className="flex justify-end">
          <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
            <FiDownload className="mr-2" /> Export
          </button>
        </div>

        {/* User Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {userData
                .filter(
                  (user) =>
                    activeTab === "all" ||
                    user.status.toLowerCase() === activeTab
                )
                .map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700"
                            : user.status === "inactive"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEye />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FiEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <FiXCircle />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementDashboard;
