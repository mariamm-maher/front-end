import { FiStar } from "react-icons/fi";
import ReviewCard from "./ReviewCard";
import { useState, useEffect } from "react";
import { getReviews } from "../../services/touristApi";
import { toast } from "react-hot-toast";

const TripReviews = ({ reviews, rating, tourId }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [combinedReviews, setCombinedReviews] = useState([]);

  // Display reviews - limited if not showing all
  const displayReviews = showAllReviews
    ? combinedReviews
    : combinedReviews.slice(0, 3);

  if (isLoading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
        {combinedReviews.length > 0 && rating && (
          <div className="flex items-center">
            <FiStar className="text-yellow-400 mr-1" />
            <span className="font-medium">
              {rating} · {combinedReviews.length} reviews
            </span>
          </div>
        )}
      </div>

      {combinedReviews.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <p className="text-gray-600">
            No reviews available for this tour yet.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {displayReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {combinedReviews.length > 3 && (
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="text-[#1784ad] font-medium hover:underline"
            >
              {showAllReviews ? "Show Less" : "Show All Reviews"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default TripReviews;
