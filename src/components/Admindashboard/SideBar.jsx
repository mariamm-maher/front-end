import {
  FiX,
  FiHome,
  FiBriefcase,
  FiUsers,
  FiTag,
  FiCalendar,
  FiMessageSquare,
  FiAlertTriangle,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
const Sidebar = ({ sidebarOpen, toggleSidebar, collapsed, setCollapsed }) => {
  const [hovered, setHovered] = useState(false);

  const navigationLinks = [
    {
      to: "main",
      label: "Dashboard",
      icon: <FiHome className="w-5 h-5" />,
      badge: null,
    },
    {
      to: "travelAgency",
      label: "Travel Agencies",
      icon: <FiBriefcase className="w-5 h-5" />,
      badge: 8,
    },
    {
      to: "account",
      label: "Accounts",
      icon: <FiUsers className="w-5 h-5" />,
      badge: null,
    },
    {
      to: "category",
      label: "Categories",
      icon: <FiTag className="w-5 h-5" />,
      badge: 3,
    },
    {
      to: "booking",
      label: "Bookings",
      icon: <FiCalendar className="w-5 h-5" />,
      badge: 12,
    },
    {
      to: "support",
      label: "Support Requests",
      icon: <FiMessageSquare className="w-5 h-5" />,
      badge: 5,
    },
    {
      to: "complaint",
      label: "Complaints",
      icon: <FiAlertTriangle className="w-5 h-5" />,
      badge: 2,
    },
  ];

  return (
    <>
      {/* Background overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed lg:relative z-30 h-full transition-all duration-300 ease-in-out ${
          collapsed ? "w-14" : "w-56"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Sidebar */}
        <aside
          className={`h-full bg-white shadow-lg dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 rounded-r-xl overflow-hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              {!collapsed && (
                <div className="flex items-center space-x-2">
                  <h1 className="text-white">Admin Panal</h1>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <button
                  className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  onClick={toggleSidebar}
                >
                  <FiX className="w-5 h-5" />
                </button>
                <button
                  className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => setCollapsed(!collapsed)}
                >
                  {collapsed ? (
                    <FiChevronRight className="w-4 h-4 text-white" />
                  ) : (
                    <FiChevronLeft className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-2 px-2">
              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors text-sm ${
                          isActive
                            ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`
                      }
                    >
                      <div className="flex items-center">
                        <span className={collapsed ? "mx-auto" : "mr-3"}>
                          {link.icon}
                        </span>
                        {!collapsed && <span>{link.label}</span>}
                      </div>
                      {!collapsed && link.badge && (
                        <span className="bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-400 text-xs font-medium px-2 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                      {collapsed && hovered && (
                        <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md shadow-lg z-50 whitespace-nowrap">
                          {link.label}
                          {link.badge && (
                            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                              {link.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* User Profile & Logout */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              {!collapsed ? (
                <>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                      AD
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-white">
                        Admin User
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        admin@travelease.com
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <FiLogOut className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium mb-3">
                    AD
                  </div>
                  <button className="flex items-center justify-center w-full p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <FiLogOut className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
