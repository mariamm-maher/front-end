import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FiPlus, FiRefreshCw, FiX } from "react-icons/fi";
import { useState } from "react";
import { addCategory } from "../../../services/AdminApi"; // adjust path

function Header() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newCategory) => addCategory(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setCategoryName("");
      setIsFormOpen(false);
    },
    onSettled: () => setIsSubmitting(false),
    onError: (err) => {
      alert(err.message);
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleForm = () => {
    setIsFormOpen((prev) => !prev);
    setCategoryName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    mutation.mutate(categoryName);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Categories Management
          </h1>
          <p className="text-gray-600">
            Manage all tour categories and their performance metrics.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
            <FiRefreshCw className="mr-2" />
            Refresh
          </button>

          {!isFormOpen ? (
            <button
              className="flex items-center px-4 py-2 bg-[#1784ad] text-white rounded-lg hover:bg-[#14739c]"
              onClick={toggleForm}
            >
              <FiPlus className="mr-2" />
              Add Category
            </button>
          ) : (
            <button
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={toggleForm}
            >
              <FiX className="mr-2" />
              Cancel
            </button>
          )}
        </div>
      </div>
      {isFormOpen && (
        <div className="flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-4 rounded-lg shadow-md border border-gray-200 mt-4"
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1784ad] focus:border-[#1784ad]"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              autoFocus
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#1784ad] text-white rounded-md hover:bg-[#14739c] disabled:opacity-50"
                disabled={isSubmitting || !categoryName.trim()}
              >
                {isSubmitting ? "Adding..." : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Header;
