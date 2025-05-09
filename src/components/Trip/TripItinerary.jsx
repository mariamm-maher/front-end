const TripItinerary = ({ itinerary }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Detailed Itinerary
      </h2>
      <div className="space-y-6">
        {itinerary.map((day) => (
          <div key={day.day} className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-800 mb-2">
              Day {day.day}: {day.title}
            </h3>
            <p className="text-gray-600">{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripItinerary;
