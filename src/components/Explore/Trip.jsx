import { FiCalendar, FiMapPin, FiClock, FiStar } from "react-icons/fi";

function Trip({ trip }) {
  return (
    <div className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow transition-shadow duration-200 w-full">
      <div className="relative h-32">
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1 right-1 bg-white px-1.5 py-0.5 rounded-full text-xs font-medium flex items-center">
          <FiStar className="text-yellow-400 mr-0.5" size={12} />
          {trip.rating}
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-base font-semibold mb-1 text-gray-800 line-clamp-1">
          {trip.title}
        </h3>

        <div className="space-y-1.5 mb-3 text-xs">
          <div className="flex items-center text-gray-600">
            <FiMapPin className="mr-1 text-[#1784ad]" size={12} />
            <span className="truncate">{trip.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FiCalendar className="mr-1 text-[#1784ad]" size={12} />
            <span>
              {new Date(trip.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <FiClock className="mr-1 text-[#1784ad]" size={12} />
            <span>{trip.duration}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm font-bold text-[#1784ad]">
            ${trip.price.toLocaleString()}
          </div>
          <button className="bg-[#1784ad] hover:bg-[#147399] text-white px-3 py-1 rounded text-xs transition-colors">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default Trip;
