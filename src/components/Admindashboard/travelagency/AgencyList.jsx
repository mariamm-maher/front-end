import { FiEdit2, FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import ViewAgencyModal from "./TravelAgencyModel";
import { useState, useEffect } from "react";
import { deleteTravelAgency } from "../../../services/AdminApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
// import Modal from "../../../components/Modal"; // Assuming you have a Modal component

function AgencyList({ TravelAgencies }) {
  const [selectedAgencyId, setSelectedAgencyId] = useState();
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [agencyToDelete, setAgencyToDelete] = useState(null);

  const closeViewModal = () => {
    setShowViewModal(false);
  };

  const handleViewAgency = (id) => {
    setSelectedAgencyId(id);
    setShowViewModal(true);
  };

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTravelAgency,
    onSuccess: () => {
      queryClient.invalidateQueries(["all-travel-agencies"]);
      toast.success("Agency deleted successfully.");
      setShowDeleteModal(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete agency.");
    },
  });

  const handleDeleteClick = (agency) => {
    setAgencyToDelete(agency);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (agencyToDelete) {
      deleteMutation.mutate(agencyToDelete.id);
    }
  };

  const cancelDelete = () => {
    setAgencyToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            All Registered Agencies
          </h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search agencies..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1784ad] text-sm"
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button className="text-sm text-[#1784ad] hover:underline">
              View All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agency Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  profile pic
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tours count
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {TravelAgencies.map((agency) => (
                <tr key={agency.$id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                    {agency.$id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {agency.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {agency.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        true
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 font-medium">
                    {agency.profilePicture}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 font-medium">
                    100
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        className="p-1 text-indigo-500 hover:text-indigo-700"
                        onClick={() => handleViewAgency(agency.id)}
                        title="View agency"
                      >
                        <FiEye />
                      </button>
                      <button
                        className="p-1 text-blue-500 hover:text-blue-700"
                        title="Edit agency"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Delete agency"
                        onClick={() => handleDeleteClick(agency)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showViewModal && (
        <ViewAgencyModal agencyId={selectedAgencyId} onClose={closeViewModal} />
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={cancelDelete}>
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Confirm Deletion
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete {agencyToDelete?.name}? This action
            cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={cancelDelete}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={confirmDelete}
              disabled={deleteMutation.isLoading}
            >
              {deleteMutation.isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AgencyList;

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
