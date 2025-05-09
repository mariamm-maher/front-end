import { useState } from "react";
import { FiStar, FiX, FiCheck, FiImage, FiArrowLeft } from "react-icons/fi";

// Mock trip data
const mockTrip = {
  id: "TRP-789456",
  name: "Bali Cultural Experience",
  image:
    "https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  location: "Bali, Indonesia",
  startDate: "2023-11-15",
  endDate: "2023-11-22",
  agency: "Bali Adventure Tours",
};

const ReviewPromptExample = () => {
  const [showPrompt, setShowPrompt] = useState(true);
  const [submittedReview, setSubmittedReview] = useState(null);

  const handleSubmitReview = (reviewData) => {
    console.log("Review submitted:", reviewData);
    setSubmittedReview(reviewData);
    setShowPrompt(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={() => setShowPrompt(true)}
        className="mb-8 flex items-center gap-2 px-4 py-2 bg-[#1784ad] text-white rounded-lg hover:bg-[#147399]"
      >
        <FiArrowLeft /> Back to Demo
      </button>

      {submittedReview && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-4">Your Review Submission</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-medium mr-2">Rating:</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`text-xl ${
                      i < submittedReview.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div>
              <span className="font-medium mr-2">Review:</span>
              <p className="text-gray-600">{submittedReview.review}</p>
            </div>
            {submittedReview.photos.length > 0 && (
              <div>
                <span className="font-medium mr-2">Photos:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {submittedReview.photos.map((photo, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(photo)}
                      alt={`Review photo ${i + 1}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-bold">Share Your Experience</h2>
              <button
                onClick={() => setShowPrompt(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Trip Info */}
            <div className="p-4 border-b">
              <div className="flex gap-4">
                <img
                  src={mockTrip.image}
                  alt={mockTrip.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-bold">{mockTrip.name}</h3>
                  <p className="text-sm text-gray-600">{mockTrip.location}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(mockTrip.startDate).toLocaleDateString()} -{" "}
                    {new Date(mockTrip.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <ReviewForm
              trip={mockTrip}
              onSubmit={handleSubmitReview}
              onClose={() => setShowPrompt(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ReviewForm = ({ trip, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos([...photos, ...files]);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSubmit({
      rating,
      review: reviewText,
      photos,
      tripId: trip.id,
    });
  };

  return (
    <>
      {/* Rating */}
      <div className="p-4 border-b">
        <h3 className="font-medium mb-3">How would you rate this trip?</h3>
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="text-3xl focus:outline-none"
            >
              {star <= (hoverRating || rating) ? (
                <FiStar className="text-yellow-400 fill-current" />
              ) : (
                <FiStar className="text-gray-300" />
              )}
            </button>
          ))}
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          {rating === 0
            ? "Select your rating"
            : rating === 5
            ? "Excellent!"
            : rating === 4
            ? "Good"
            : rating === 3
            ? "Average"
            : rating === 2
            ? "Below average"
            : "Poor"}
        </div>
      </div>

      {/* Review Text */}
      <div className="p-4 border-b">
        <h3 className="font-medium mb-3">
          Share details about your experience
        </h3>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="What did you like or dislike? Would you recommend this trip to others?"
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
        />
        <p className="text-xs text-gray-500 mt-1">Minimum 20 characters</p>
      </div>

      {/* Photo Upload */}
      <div className="p-4 border-b">
        <h3 className="font-medium mb-3">Add photos (optional)</h3>
        <label className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer">
          <FiImage className="mr-2" />
          Upload Photos
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
          />
        </label>

        {photos.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Review photo ${index + 1}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Skip
        </button>
        <button
          onClick={handleSubmit}
          disabled={rating === 0 || reviewText.length < 20}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            rating === 0 || reviewText.length < 20
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#1784ad] hover:bg-[#147399] text-white"
          }`}
        >
          <FiCheck /> Submit Review
        </button>
      </div>
    </>
  );
};

export default ReviewPromptExample;
