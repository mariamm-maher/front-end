import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  getAllBookings,
  updateBookingStatus,
  getBookingDetails,
} from "../../../services/TravelAgencyApi";
import ViewBookingModel from "./ViewBookingModel";
import BookingCharts from "./BookingCharts";
import BookingTrendChart from "./BookingTrendChart";
import BookingTable from "./BookingTable";

const BookingRequestsDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loadingBookingDetails, setLoadingBookingDetails] = useState(false);
  const [actionInProgress, setActionInProgress] = useState(false);
  // Stats for the dashboard
  const [stats, setStats] = useState([
    { name: "Total Bookings", value: "0", change: "0%", trend: "up" },
    { name: "Pending", value: "0", change: "0%", trend: "up" },
    { name: "Approved", value: "0", change: "0%", trend: "up" },
    { name: "Revenue", value: "$0", change: "0%", trend: "up" },
  ]);
  // Chart data
  const [bookingTrends, setBookingTrends] = useState([]);
  // Define fetchBookings function - placed before useEffect
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllBookings();
      console.log("API Response:", response);

      // Extract bookings array from the response
      let bookingsArray = [];

      if (response && Array.isArray(response)) {
        bookingsArray = response;
      } else if (
        response &&
        response.bookings &&
        Array.isArray(response.bookings)
      ) {
        bookingsArray = response.bookings;
      } else if (response && Array.isArray(response.$values)) {
        bookingsArray = response.$values;
      } else if (
        response &&
        response.bookings &&
        Array.isArray(response.bookings.$values)
      ) {
        bookingsArray = response.bookings.$values;
      } else {
        console.warn("Unexpected API response format:", response);
        // Set empty array as fallback
        bookingsArray = [];
      }

      console.log("Processed bookings:", bookingsArray);
      setBookings(bookingsArray);

      // Update stats
      updateStats(bookingsArray);

      // Generate booking trends
      generateBookingTrends(bookingsArray);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.message || "Failed to fetch bookings");
      setLoading(false);
      // Set bookings to empty array in case of error
      setBookings([]);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const updateStats = (bookingsData) => {
    // Ensure bookingsData is an array
    if (!Array.isArray(bookingsData)) {
      console.error("bookingsData is not an array:", bookingsData);
      // Set default values for stats
      setStats([
        { name: "Total Bookings", value: "0", change: "0%", trend: "up" },
        { name: "Pending", value: "0", change: "0%", trend: "up" },
        { name: "Approved", value: "0", change: "0%", trend: "up" },
        { name: "Revenue", value: "$0", change: "0%", trend: "up" },
      ]);
      return;
    }

    // Calculate statistics from bookings data
    const totalBookings = bookingsData.length;

    const pendingBookings = bookingsData.filter(
      (b) => b.bookingStatus?.toLowerCase() === "pending"
    ).length;

    const confirmedBookings = bookingsData.filter(
      (b) => b.bookingStatus?.toLowerCase() === "approved"
    ).length;

    // Calculate total revenue
    const totalRevenue = bookingsData.reduce((sum, booking) => {
      // Get the price from totalPrice field
      const price = booking.totalPrice || 0;
      return sum + (isNaN(price) ? 0 : price);
    }, 0);

    setStats([
      {
        name: "Total Bookings",
        value: totalBookings.toString(),
        change: "+12%",
        trend: "up",
      },
      {
        name: "Pending",
        value: pendingBookings.toString(),
        change: "+5%",
        trend: "up",
      },
      {
        name: "Approved",
        value: confirmedBookings.toString(),
        change: "+18%",
        trend: "up",
      },
      {
        name: "Revenue",
        value: `$${totalRevenue.toFixed(2)}`,
        change: "+22%",
        trend: "up",
      },
    ]);
  };
  const generateBookingTrends = (bookingsData) => {
    // Ensure bookingsData is an array
    if (!Array.isArray(bookingsData)) {
      console.error(
        "bookingsData is not an array in generateBookingTrends:",
        bookingsData
      );
      setBookingTrends([]);
      return;
    }

    // This is a simplified version - in a real app, you'd group by month and count
    const monthCounts = {};

    // Get last 6 months
    const months = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = format(month, "MMM");
      months.push(monthName);
      monthCounts[monthName] = 0;
    }

    // Count bookings per month
    bookingsData.forEach((booking) => {
      try {
        // Handle different date formats - try both bookingDate and createdAt fields
        let dateToUse =
          booking.bookingDate || booking.createdAt || booking.date;

        // If date is in ISO format with time (e.g. "2023-11-15T14:30:00Z")
        // or in any other recognizable format
        const bookingDate = new Date(dateToUse);

        if (!isNaN(bookingDate.getTime())) {
          const monthName = format(bookingDate, "MMM");
          if (monthCounts[monthName] !== undefined) {
            monthCounts[monthName]++;
          }
        }
      } catch (err) {
        console.log("Error parsing date:", err);
        // Handle invalid dates silently
      }
    });

    // Convert to chart data format
    const trends = months.map((month) => ({
      name: month,
      bookings: monthCounts[month] || 0,
    }));

    setBookingTrends(trends);
  };

  const handleViewDetails = async (bookingId) => {
    try {
      setLoadingBookingDetails(true);
      setShowModal(true);
      const details = await getBookingDetails(bookingId);
      setBookingDetails(details);
      setLoadingBookingDetails(false);
    } catch (err) {
      setError(err.message || "Failed to fetch booking details");
      setLoadingBookingDetails(false);
    }
  };
  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      setActionInProgress(true);
      await updateBookingStatus(bookingId, newStatus);

      // Update the local state to reflect the change
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, bookingStatus: newStatus }
            : booking
        )
      );

      // If we were viewing this booking's details, update them too
      if (bookingDetails && bookingDetails.id === bookingId) {
        setBookingDetails({
          ...bookingDetails,
          bookingStatus: newStatus,
        });
      }

      // Update stats after status change
      updateStats(
        bookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, bookingStatus: newStatus }
            : booking
        )
      );

      setActionInProgress(false);
    } catch (err) {
      setError(err.message || `Failed to update booking to ${newStatus}`);
      setActionInProgress(false);
    }
  };

  // Filter bookings based on active tab, search query and date filter
  const filteredBookings = Array.isArray(bookings)
    ? bookings.filter((booking) => {
        // Get status from either bookingStatus or status field
        const bookingStatus = (
          booking.bookingStatus ||
          booking.status ||
          ""
        ).toLowerCase();

        // Check if the booking matches the active tab
        const matchesTab = activeTab === "all" || bookingStatus === activeTab;

        // User name could be in different fields depending on the API structure
        const userName =
          booking.user?.name || booking.userName || booking.user || "";
        const userEmail =
          booking.user?.email || booking.userEmail || booking.email || "";
        const tripName =
          booking.trip?.name || booking.tripName || booking.tour || "";

        // Check if the booking matches the search query
        const matchesSearch =
          userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tripName.toLowerCase().includes(searchQuery.toLowerCase());

        // Date field could be bookingDate or date
        const bookingDate = booking.bookingDate || booking.date || "";

        // Check if the booking matches the date filter
        const matchesDate =
          dateFilter === "all" ||
          (bookingDate && bookingDate.includes(dateFilter));

        return matchesTab && matchesSearch && matchesDate;
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 w-full">
      <div className="mx-auto space-y-6">
        {/* Header with Stats */}
        <BookingCharts stats={stats} />

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Trends Chart */}
          <BookingTrendChart bookingTrends={bookingTrends} />
          {/* Booking Requests Table */}
          <BookingTable
            loading={loading}
            error={error}
            fetchBookings={fetchBookings}
            filteredBookings={filteredBookings}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            actionInProgress={actionInProgress}
            handleViewDetails={handleViewDetails}
            handleUpdateStatus={handleUpdateStatus}
          />{" "}
        </div>
      </div>

      {/* Booking Details Modal */}
      {showModal && (
        <ViewBookingModel
          bookingDetails={bookingDetails}
          loadingBookingDetails={loadingBookingDetails}
          actionInProgress={actionInProgress}
          handleUpdateStatus={handleUpdateStatus}
          onClose={() => {
            setShowModal(false);
            setBookingDetails(null);
          }}
        />
      )}
    </div>
  );
};

export default BookingRequestsDashboard;
