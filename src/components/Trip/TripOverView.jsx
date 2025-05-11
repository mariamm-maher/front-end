import { FiCalendar, FiUsers } from "react-icons/fi";
const TripOverview = ({ trip }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Trip Overview</h2>
      <p className="text-gray-600 mb-6">{trip.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Trip Details</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <FiCalendar className="text-[#1784ad] mr-3 w-5 h-5" />
              <span className="text-gray-600">Duration: {trip.duration}</span>
            </div>
            <div className="flex items-center">
              <FiUsers className="text-[#1784ad] mr-3 w-5 h-5" />
              <span className="text-gray-600">
                Group Size: {trip.groupSize}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Highlights</h3>
          <ul className="space-y-2">
            {trip.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#1784ad] mr-2">•</span>
                <span className="text-gray-600">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h3 className="font-bold text-gray-800 mb-4">What's Included</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trip.inclusions.map((item, index) => (
            <div key={index} className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-600">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Not Included</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trip.exclusions.map((item, index) => (
            <div key={index} className="flex items-start">
              <span className="text-red-500 mr-2">✗</span>
              <span className="text-gray-600">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripOverview;
