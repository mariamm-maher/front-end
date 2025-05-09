const topTours = [
  { name: "Bali Adventure", bookings: 245, revenue: "$98,000" },
  { name: "Paris Luxury", bookings: 189, revenue: "$236,250" },
  { name: "Tokyo Discovery", bookings: 132, revenue: "$118,800" },
  { name: "New York City Tour", bookings: 98, revenue: "$58,800" },
  { name: "Rome History", bookings: 76, revenue: "$45,600" },
];
function TopTour() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Top Tours</h3>
        <button className="text-sm text-blue-600 hover:underline">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {topTours.map((tour, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-800">{tour.name}</p>
                <p className="text-xs text-gray-500">
                  {tour.bookings} bookings
                </p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-800">{tour.revenue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopTour;
