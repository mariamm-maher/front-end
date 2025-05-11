import { useState, useEffect } from "react";
import { FiPlus, FiDownload, FiTrash2, FiEdit } from "react-icons/fi";
import AddTourModal from "./AddTourModal";
import EditTourModal from "./EditTourModal";
import ViewTourModal from "./ViewTourModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import {
  getAllTours,
  getTour,
  deleteTour,
} from "../../../services/TravelAgencyApi";
import toast from "react-hot-toast";

const TourManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [loadingTourId, setLoadingTourId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTours = async () => {
    try {
      setIsLoading(true);
      const response = await getAllTours();
      // Handle the specific response format
      if (response && response.tours && response.tours.$values) {
        setTours(response.tours.$values || []);
      } else {
        setTours([]);
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
      toast.error("Failed to load tours. Please try again.");
      setTours([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTours();
  }, []);
  const handleViewTour = async (tourId) => {
    try {
      setLoadingTourId(tourId);
      const response = await getTour(tourId);
      setSelectedTour(response);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error("Error fetching tour details:", error);
      toast.error("Failed to load tour details. Please try again.");
    } finally {
      setLoadingTourId(null);
    }
  };
  const handleDeleteClick = (tour) => {
    setSelectedTour(tour);
    setIsDeleteModalOpen(true);
  };

  const handleEditTour = async (tourId) => {
    try {
      setLoadingTourId(tourId);
      const response = await getTour(tourId);
      setSelectedTour(response);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error("Error fetching tour details for edit:", error);
      toast.error("Failed to load tour details. Please try again.");
    } finally {
      setLoadingTourId(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTour || !selectedTour.id) {
      toast.error("No tour selected for deletion.");
      return;
    }

    try {
      setDeleteLoading(true);
      await deleteTour(selectedTour.id);

      // Update the local state by removing the deleted tour
      setTours(tours.filter((tour) => tour.id !== selectedTour.id));

      // Close the modal and show success message
      setIsDeleteModalOpen(false);
      toast.success("Tour deleted successfully!");
    } catch (error) {
      console.error("Error deleting tour:", error);
      toast.error(error.message || "Failed to delete tour. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const tabs = ["upcoming", "completed", "draft"];

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
            {" "}
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Tour Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Thumbnail
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      Loading tours...
                    </td>
                  </tr>
                ) : tours && tours.length > 0 ? (
                  tours.map((tour) => (
                    <tr key={tour.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {tour.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {tour.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {tour.mainimage ? (
                          <img
                            src={tour.mainimage}
                            alt={tour.title}
                            className="h-12 w-20 object-cover rounded-md"
                          />
                        ) : (
                          <span className="text-gray-400">No image</span>
                        )}
                      </td>{" "}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          className="text-blue-600 hover:text-blue-800 mr-3 transition"
                          onClick={() => handleEditTour(tour.id)}
                        >
                          <FiEdit className="inline w-5 h-5" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 mr-3 transition"
                          onClick={() => handleViewTour(tour.id)}
                        >
                          View
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 transition"
                          onClick={() => handleDeleteClick(tour)}
                        >
                          <FiTrash2 className="inline w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
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
      </div>{" "}
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
      {/* Edit Tour Modal */}
      <EditTourModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        tour={selectedTour}
        onSuccess={() => {
          // Refetch tours after updating
          fetchTours();
          toast.success("Tour updated successfully!");
        }}
      />
      {/* View Tour Modal */}
      <ViewTourModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        tour={selectedTour}
      />
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        tourName={selectedTour?.title}
        isLoading={deleteLoading}
      />
    </div>
  );
};

export default TourManagementDashboard;
