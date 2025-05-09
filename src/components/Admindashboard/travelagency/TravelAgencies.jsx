import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllTravelAgencies } from "../../../services/AdminApi"; // adjust the path if needed

import Header from "./header";
import StatisCards from "./StatisCards";
import AgencyList from "./AgencyList";
import DownloadSpinner from "../../shared/Downlaoding";
import RequestsTable from "./Requests";

export default function AgencyManagement() {
  // State to control which table is displayed
  const [activeTab, setActiveTab] = useState("agencies"); // "agencies" or "requests"

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["all-travel-agencies"],
    queryFn: getAllTravelAgencies,
    onSuccess: (data) => {
      // console.log("All Users:", data);
    },
  });

  if (isLoading) return <DownloadSpinner />;
  if (isError) return <div>failed to get the data</div>;
  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <Header />

      {/* Stats Cards */}
      <StatisCards />

      {/* Tab Navigation */}
      <div className="flex items-center space-x-4 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab("agencies")}
          className={`py-2 px-4 font-medium text-sm transition-colors ${
            activeTab === "agencies"
              ? "text-[#1784ad] border-b-2 border-[#1784ad]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Agencies
        </button>
        <button
          onClick={() => setActiveTab("requests")}
          className={`py-2 px-4 font-medium text-sm transition-colors ${
            activeTab === "requests"
              ? "text-[#1784ad] border-b-2 border-[#1784ad]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Requests
        </button>
      </div>

      {/* Tables - conditionally rendered based on activeTab */}
      {activeTab === "agencies" ? (
        <AgencyList TravelAgencies={data} />
      ) : (
        <RequestsTable />
      )}
    </div>
  );
}
