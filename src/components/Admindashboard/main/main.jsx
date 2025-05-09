import "react-calendar/dist/Calendar.css";
import Calender from "./calender";
import BookingTrends from "./BookingTrends";
import RecentBooking from "./recentBooking";
import TopTour from "./topTour";
import StatsCard from "./statsCard";

export default function DashBoard() {
  return (
    <div className="space-y-6 w-full">
      {/* Stats Cards */}
      <StatsCard />
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-3 gap-6">
        {/* Booking Trends */}
        <BookingTrends />
        {/* Calendar */}
        <Calender />
        {/* Top Tours */}
        <TopTour />
        {/* Recent Bookings */}
        <RecentBooking />
      </div>
    </div>
  );
}
