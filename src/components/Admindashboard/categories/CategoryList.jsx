import { useState } from "react";
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DownloadSpinner from "../../shared/Downlaoding";
import { deleteCategory, updateCategory } from "../../../services/AdminApi";

function CategoryList({ categories = [], isLoading, isError, error }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [categoryToUpdate, setCategoryToUpdate] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, categoryData }) => updateCategory(id, categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      setShowUpdateModal(false);
      setCategoryToUpdate(null);
      setNewCategoryName("");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const filteredCategories = categories.filter((cat) =>
    cat.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      deleteMutation.mutate(categoryToDelete.categoryId);
    }
  };

  const handleEditClick = (category) => {
    setCategoryToUpdate(category);
    setNewCategoryName(category.categoryName);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (categoryToUpdate && newCategoryName.trim()) {
      updateMutation.mutate({
        id: categoryToUpdate.categoryId,
        categoryData: { categoryName: newCategoryName.trim() },
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Header with search */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          All Tour Categories
        </h3>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1784ad] text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button className="text-sm text-[#1784ad] hover:underline">
            View All
          </button>
        </div>
      </div>

      {/* Spinner / Error / Table */}
      {isLoading ? (
        <DownloadSpinner />
      ) : isError ? (
        <p className="text-red-500">{error.message}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategories.map((category, index) => (
                <tr key={category.categoryId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {category.categoryName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        className="p-1 text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditClick(category)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="p-1 text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteClick(category)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCategories.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-3 text-sm text-gray-500 text-center"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Delete Category
            </h4>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-red-600">
                {categoryToDelete?.categoryName}
              </span>
              ?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                onClick={confirmDelete}
              >
                {deleteMutation.isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Update Category
            </h4>
            <form onSubmit={handleUpdateSubmit}>
              <label className="block mb-4">
                <span className="text-sm text-gray-600">New Name</span>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1784ad] text-sm"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </label>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  {updateMutation.isLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryList;
