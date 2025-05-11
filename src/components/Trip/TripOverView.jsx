import {
  FiCalendar,
  FiUsers,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiTag,
  FiHeart,
} from "react-icons/fi";

const TripOverview = ({ trip }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Trip Overview</h2>
      <p className="text-gray-600 mb-6">{trip.description}</p>

      {/* Main Trip Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Trip Details</h3>
          <div className="space-y-4">
            {trip.duration && (
              <div className="flex items-center">
                <FiClock className="text-[#1784ad] mr-3 w-5 h-5" />
                <span className="text-gray-600">Duration: {trip.duration}</span>
              </div>
            )}
            {trip.startDate && (
              <div className="flex items-center">
                <FiCalendar className="text-[#1784ad] mr-3 w-5 h-5" />
                <span className="text-gray-600">
                  Start Date: {new Date(trip.startDate).toLocaleDateString()}
                </span>
              </div>
            )}
            {trip.endDate && (
              <div className="flex items-center">
                <FiCalendar className="text-[#1784ad] mr-3 w-5 h-5" />
                <span className="text-gray-600">
                  End Date: {new Date(trip.endDate).toLocaleDateString()}
                </span>
              </div>
            )}
            {trip.price !== undefined && (
              <div className="flex items-center">
                <FiDollarSign className="text-[#1784ad] mr-3 w-5 h-5" />
                <span className="text-gray-600">Price: ${trip.price}</span>
              </div>
            )}
            {trip.category && (
              <div className="flex items-center">
                <FiTag className="text-[#1784ad] mr-3 w-5 h-5" />
                <span className="text-gray-600">Category: {trip.category}</span>
              </div>
            )}
            {trip.location && (
              <div className="flex items-center">
                <FiMapPin className="text-[#1784ad] mr-3 w-5 h-5" />
                <span className="text-gray-600">Location: {trip.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Available Seats & Travel Agency */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Booking Information</h3>
          <div className="space-y-4">
            {" "}
            {trip.availableSeats !== undefined && (
              <div className="flex items-center">
                <FiUsers className="text-[#1784ad] mr-3 w-5 h-5" />
                <span className="text-gray-600">
                  Available Seats:{" "}
                  <span
                    className={`font-semibold ${
                      trip.availableSeats === 0 ? "text-red-500" : ""
                    }`}
                  >
                    {trip.availableSeats}
                  </span>
                  {trip.availableSeats === 0 && (
                    <span className="text-red-500 ml-2 font-medium">
                      - Fully Booked
                    </span>
                  )}
                </span>
              </div>
            )}
            {trip.travelAgencyName && (
              <div className="flex items-center">
                <FiHeart className="text-[#1784ad] mr-3 w-5 h-5" />
                <span className="text-gray-600">
                  Hosted by:{" "}
                  <span className="font-medium">{trip.travelAgencyName}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photos Gallery Section */}
      {trip.photos && trip.photos.$values && trip.photos.$values.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Trip Photos</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {trip.photos.$values.map((photo, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden"
              >
                <img
                  src={photo.url || photo}
                  alt={`Trip photo ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What's Included Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h3 className="font-bold text-gray-800 mb-4">What's Included</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trip.accommodation && (
            <div className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-600">
                Accommodation: {trip.accommodation}
              </span>
            </div>
          )}
          {trip.transportation && (
            <div className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-600">
                Transportation: {trip.transportation}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Exclusions Section - Only show if there are exclusions */}
      {trip.exclusions && trip.exclusions.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Not Included</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trip.exclusions.map((exclusion, index) => (
              <div key={index} className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span className="text-gray-600">{exclusion}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripOverview;
