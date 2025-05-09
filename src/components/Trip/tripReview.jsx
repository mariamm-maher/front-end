import { FiStar } from "react-icons/fi";
import ReviewCard from "./ReviewCard";
import { useState } from "react";

const TripReviews = ({ reviews, rating }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
        <div className="flex items-center">
          <FiStar className="text-yellow-400 mr-1" />
          <span className="font-medium">
            {rating} · {reviews.length} reviews
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {(showAllReviews ? reviews : reviews.slice(0, 2)).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {reviews.length > 2 && (
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="mt-6 text-[#1784ad] font-medium hover:underline"
        >
          {showAllReviews
            ? "Show fewer reviews"
            : `Show all ${reviews.length} reviews`}
        </button>
      )}
    </div>
  );
};

export default TripReviews;
