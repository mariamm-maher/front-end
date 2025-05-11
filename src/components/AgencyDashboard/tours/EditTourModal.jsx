import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  updateTour,
  getAllCategories,
} from "../../../services/TravelAgencyApi";
import { FiX, FiUpload, FiCalendar } from "react-icons/fi";
import toast from "react-hot-toast";

const EditTourModal = ({ isOpen, onClose, onSuccess, tour }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryName: "",
    price: 0,
    location: "",
    startDate: "",
    endDate: "",
    availableSeats: 0,
    transportation: "",
    accomodation: "",
    photos: [],
    mainpphoto: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [existingPhotos, setExistingPhotos] = useState([]);

  // Format ISO date to YYYY-MM-DD for input elements
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await getAllCategories();
        if (response && response.data) {
          setCategories(response.data);
        } else {
          // Fallback to default categories if API doesn't return expected format
          setCategories(["Adventure"]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories. Using default values.");
        setCategories(["Adventure"]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // Set form data when tour prop changes
  useEffect(() => {
    if (tour && isOpen) {
      // Initialize existing photos if available
      let photos = [];
      if (tour.photos && tour.photos.$values) {
        photos = tour.photos.$values;
        setExistingPhotos(photos);

        // Create preview URLs for existing photos
        const previews = photos.map((photo) => photo);
        setPreviewImages(previews);
      }

      // Initialize main image if available
      if (tour.mainimage) {
        setMainImagePreview(tour.mainimage);
      } // Set form data with tour data
      setFormData({
        title: tour.title || "",
        description: tour.description || "",
        categoryName: tour.category || "", // Using category from API
        price: tour.price || 0,
        location: tour.location || "",
        startDate: formatDateForInput(tour.startDate) || "",
        endDate: formatDateForInput(tour.endDate) || "",
        availableSeats: tour.availableSeats || 0,
        transportation: tour.transportation || "",
        accomodation: tour.accomodation || "",
        photos: photos,
        mainpphoto: tour.mainimage || null, // Using mainimage from API
      });
    }
  }, [tour, isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: "",
        description: "",
        categoryName: "",
        price: 0,
        location: "",
        startDate: "",
        endDate: "",
        availableSeats: 0,
        transportation: "",
        accomodation: "",
        photos: [],
        mainpphoto: null,
      });
      setPreviewImages([]);
      setMainImagePreview("");
      setExistingPhotos([]);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, photos: [...formData.photos, ...files] });

    // Create preview URLs for new files
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviews]);
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, mainpphoto: file });
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = (index) => {
    const newImages = [...formData.photos];
    newImages.splice(index, 1);
    setFormData({ ...formData, photos: newImages });

    // Also update previews
    const newPreviews = [...previewImages];
    // Only revoke URL if it's a blob URL (for new images)
    if (
      typeof newPreviews[index] === "string" &&
      newPreviews[index].startsWith("blob:")
    ) {
      URL.revokeObjectURL(newPreviews[index]); // Free memory
    }
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  const clearMainImage = () => {
    setFormData({ ...formData, mainpphoto: null });
    if (mainImagePreview && !mainImagePreview.startsWith("http")) {
      URL.revokeObjectURL(mainImagePreview);
    }
    setMainImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Format data to match API requirements based on the exact model
      const processedData = {
        id: tour.id,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        location: formData.location,
        startDate: formData.startDate
          ? new Date(formData.startDate).toISOString()
          : "",
        endDate: formData.endDate
          ? new Date(formData.endDate).toISOString()
          : "",
        availableSeats: parseInt(formData.availableSeats, 10),
        transportation: formData.transportation,
        accomodation: formData.accomodation,
        categoryName: formData.categoryName, // Keep as categoryName
      };

      // Handle main image
      if (formData.mainpphoto instanceof File) {
        // If it's a new file upload, special handling is needed
        processedData.newMainImage = formData.mainpphoto;
      } else if (typeof formData.mainpphoto === "string") {
        // Keep existing mainimage as is (lowercase i, matching API model)
        processedData.mainimage = formData.mainpphoto;
      }

      // Handle photos - split between existing URLs and new File objects
      const existingImageUrls = formData.photos.filter(
        (p) => typeof p === "string"
      );
      const newImageFiles = formData.photos.filter((p) => p instanceof File);

      if (newImageFiles.length > 0) {
        // If there are new images to upload, send them separately
        processedData.newImages = newImageFiles;
      }

      // Always send existing photos array
      processedData.photos = existingImageUrls;

      // Add debug logging
      console.log("Sending update data:", {
        ...processedData,
        newImages: processedData.newImages ? processedData.newImages.length : 0,
        photos: processedData.photos ? processedData.photos.length : 0,
      });

      const response = await updateTour(tour.id, processedData);
      toast.success("Tour updated successfully!");
      onSuccess(response);
      onClose();
    } catch (error) {
      console.error("Error updating tour:", error);

      // Enhanced error logging for better diagnosis
      if (error.response) {
        console.error(
          "Error response:",
          error.response.status,
          error.response.data
        );
        // Show more detailed error message if available
        const errorMessage =
          error.response.data?.message ||
          error.message ||
          "Failed to update tour. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error(
          error.message || "Failed to update tour. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Clean up previews when component unmounts
  useEffect(() => {
    return () => {
      // Only clean up blob URLs (new images), not existing image URLs
      previewImages.forEach((preview) => {
        if (typeof preview === "string" && preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
      if (mainImagePreview && mainImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(mainImagePreview);
      }
    };
  }, [previewImages, mainImagePreview]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Edit Tour: {tour?.title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tour Title*
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter tour title"
                      />
                    </div>

                    {/* Category & Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category*
                      </label>
                      <select
                        name="categoryName"
                        value={formData.categoryName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={categoriesLoading}
                      >
                        <option value="">
                          {categoriesLoading
                            ? "Loading categories..."
                            : "Select a category"}
                        </option>
                        {categories.map((category) => (
                          <option
                            key={
                              typeof category === "object"
                                ? category.id || category._id
                                : category
                            }
                            value={
                              typeof category === "object"
                                ? category.name
                                : category
                            }
                          >
                            {typeof category === "object"
                              ? category.name
                              : category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price per Person (USD)*
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter price"
                      />
                    </div>

                    {/* Location & Available Seats */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location*
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter location"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Available Seats*
                      </label>
                      <input
                        type="number"
                        name="availableSeats"
                        value={formData.availableSeats}
                        onChange={handleChange}
                        required
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter available seats"
                      />
                    </div>

                    {/* Dates */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date*
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date*
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    {/* Transportation & Accommodation */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transportation
                      </label>
                      <input
                        type="text"
                        name="transportation"
                        value={formData.transportation}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Flight, Bus, Private Car"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Accommodation
                      </label>
                      <input
                        type="text"
                        name="accomodation"
                        value={formData.accomodation}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 5-star Hotel, Resort"
                      />
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description*
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe the tour experience, itinerary, highlights, etc."
                      ></textarea>
                    </div>

                    {/* Main Image Upload */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Main Image (Thumbnail)
                      </label>
                      <div className="mt-1 flex items-center space-x-4">
                        <label className="flex items-center justify-center w-full h-32 px-4 py-2 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                          <div className="space-y-1 text-center">
                            <FiUpload className="mx-auto h-8 w-8 text-gray-400" />
                            <div className="text-sm text-gray-500">
                              {mainImagePreview
                                ? "Replace image"
                                : "Upload main image"}
                            </div>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleMainImageChange}
                          />
                        </label>

                        {mainImagePreview && (
                          <div className="relative h-32 w-32">
                            <img
                              src={mainImagePreview}
                              alt="Main preview"
                              className="h-full w-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={clearMainImage}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <FiX size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Images Upload */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Images
                      </label>
                      <div className="mt-1 flex items-center">
                        <label className="flex items-center justify-center w-full h-32 px-4 py-2 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                          <div className="space-y-1 text-center">
                            <FiUpload className="mx-auto h-8 w-8 text-gray-400" />
                            <div className="text-sm text-gray-500">
                              Upload additional images
                            </div>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>

                      {/* Image Previews */}
                      {previewImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {previewImages.map((preview, index) => (
                            <div key={index} className="relative">
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="h-24 w-full object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                              >
                                <FiX size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit & Cancel Buttons */}
                  <div className="mt-8 flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        isLoading ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating Tour..." : "Update Tour"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditTourModal;
