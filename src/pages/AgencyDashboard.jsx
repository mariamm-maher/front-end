import { useState } from "react";

import Sidebar from "../components/AgencyDashboard/SideBar";

import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/AgencyDashboard/header";

const COLORS = ["#1784ad", "#34393f", "#324252", "#5a6a7a"];

export default function TravelAgencyDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-white text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <DashboardHeader />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="flex  items-center mb-6 ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
