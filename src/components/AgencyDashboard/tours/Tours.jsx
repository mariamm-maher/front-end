import { useState, useEffect } from "react";
import { FiPlus, FiDownload } from "react-icons/fi";
import AddTourModal from "./AddTourModal";
import { getAllTours } from "../../../services/TravelAgencyApi";
import toast from "react-hot-toast";

const TourManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTours = async () => {
    try {
      setIsLoading(true);
      const response = await getAllTours();
      setTours(response.data || []);
    } catch (error) {
      console.error("Error fetching tours:", error);
      toast.error("Failed to load tours. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Sample tour data (commented out - using real API data now)
  /*
  const tourData = [
    {
      id: 1,
      name: "Bali Adventure",
      date: "2023-11-15",
      seats: 12,
      booked: 10,
      status: "confirmed",
      revenue: 12000,
    },
    {
      id: 2,
      name: "Paris Luxury",
      date: "2023-11-18",
      seats: 8,
      booked: 6,
      status: "confirmed",
      revenue: 18000,
    },
    {
      id: 3,
      name: "Tokyo Discovery",
      date: "2023-11-20",
      seats: 10,
      booked: 4,
      status: "open",
      revenue: 8000,
    },
    {
      id: 4,
      name: "Rome History",
      date: "2023-11-22",
      seats: 15,
      booked: 12,
      status: "waitlist",
      revenue: 15000,
    },
  ];
  */

  const tabs = ["upcoming", "completed", "draft"];

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "open":
        return "bg-blue-100 text-blue-800";
      case "waitlist":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      {/* Create Button */}
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-between px-5 py-3 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition"
        >
          <span>Create New Tour</span>
          <FiPlus />
        </button>

        {/* Tour List Card */}
        <div className="mt-6 bg-white rounded-xl shadow">
          {/* Tabs & Export */}
          <div className="border-b px-6 py-4 flex justify-between items-center">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-sm capitalize transition ${
                    activeTab === tab
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition">
              <FiDownload className="mr-1" />
              Export
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Tour Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Bookings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>{" "}
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      Loading tours...
                    </td>
                  </tr>
                ) : tours && tours.length > 0 ? (
                  tours.map((tour) => (
                    <tr key={tour.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {tour.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {new Date(tour.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {tour.bookedSeats || 0}/{tour.availableSeats}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        ${tour.price ? tour.price.toLocaleString() : 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                            tour.status || "open"
                          )}`}
                        >
                          {tour.status || "open"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-blue-600 hover:text-blue-800 mr-3 transition">
                          Edit
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No tours found. Create your first tour with the button
                      above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Tour Modal */}
      <AddTourModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          // Refetch tours after creating a new one
          fetchTours();
          toast.success("Tour created successfully!");
        }}
      />
    </div>
  );
};

export default TourManagementDashboard;
