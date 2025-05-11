import { FiStar } from "react-icons/fi";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <img
            src={
              review.avatar || "https://randomuser.me/api/portraits/men/32.jpg"
            }
            alt={review.user || "User"}
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <div>
            <h4 className="font-medium">{review.user || "Anonymous"}</h4>
            <div className="flex items-center text-sm text-gray-500">
              {review.date
                ? new Date(review.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })
                : "Recent"}
            </div>
          </div>
        </div>
        <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
          <FiStar className="text-yellow-400 mr-1" />
          <span>{review.rating || 5}</span>
        </div>
      </div>

      <p className="text-gray-600 mb-4">
        {review.comment || "Great experience!"}
      </p>

      {review.images && review.images.length > 0 && (
        <div className="flex gap-2">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Review photo ${index + 1}`}
              className="w-16 h-16 rounded object-cover cursor-pointer hover:opacity-80"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
