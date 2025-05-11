import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute, { RoleProtectedRoute } from "./pages/protectedRoute";

// Pages
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/TouristSignUp";
import HomePage from "./pages/HomePage";
import TravelAgencySignUp from "./pages/TravelAgencySignUp";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import Explore from "./pages/explore";
import Destinations from "./pages/destinations";
import AdminDashboard from "./pages/adminDashboard";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TripPage from "./pages/tripPage";
import AboutAgency from "./pages/travelAgencypage";
import MainLayout from "./pages/MainLayout";
import DestinationPage from "./pages/destinationPage";
import ProfilePage from "./pages/profile";
import BookingPage from "./pages/Booking";
import ComplaintPage from "./pages/complaint";
import ReviewPrompt from "./pages/reviews";

// Admin Dashboard Components
import DashBoard from "./components/Admindashboard/main/main";
import AgencyManagement from "./components/Admindashboard/travelagency/TravelAgencies";
import AccountManagement from "./components/Admindashboard/accounts/accounts";
import CategoriesManagement from "./components/Admindashboard/categories/categories";
import SupportRequests from "./components/Admindashboard/supportRequests/supportsRequests";
import ComplaintsManagement from "./components/Admindashboard/complaint/complaint";

// Travel Agency Dashboard Components
import TravelAgencyDashboard from "./pages/AgencyDashboard";
import Main from "./components/AgencyDashboard/main/main";
import TourManagementDashboard from "./components/AgencyDashboard/tours/Tours";
import BookingRequestsDashboard from "./components/AgencyDashboard/bookings/Bookings";

const queryClient = new QueryClient();
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          <Routes>
            {/* Public Routes */}{" "}
            <Route element={<MainLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/trip/:id" element={<TripPage />} />
              <Route path="/travelAgency" element={<AboutAgency />} />
              <Route path="/destinationPage" element={<DestinationPage />} />
            </Route>
            {/* Public Routes - No Authentication Required */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup-user" element={<SignupPage />} />
            <Route path="/signup-agency" element={<TravelAgencySignUp />} />
            <Route
              path="/registration-success"
              element={<RegistrationSuccess />}
            />
            {/* Protected Welcome Page - redirects to appropriate dashboard if authenticated */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<WelcomePage />} />
            </Route>
            {/* Protected Tourist Routes */}
            <Route element={<RoleProtectedRoute allowedRoles={["Tourist"]} />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/ComplaintPage" element={<ComplaintPage />} />
              <Route path="/review" element={<ReviewPrompt />} />
            </Route>
            {/* Protected Admin Dashboard Routes */}
            <Route element={<RoleProtectedRoute allowedRoles={["Admin"]} />}>
              <Route path="/admin" element={<AdminDashboard />}>
                <Route index element={<DashBoard />} />
                <Route path="main" element={<DashBoard />} />
                <Route path="travelAgency" element={<AgencyManagement />} />
                <Route path="account" element={<AccountManagement />} />
                <Route path="category" element={<CategoriesManagement />} />

                <Route path="support" element={<SupportRequests />} />
                <Route path="complaint" element={<ComplaintsManagement />} />
              </Route>
            </Route>
            {/* Protected Travel Agency Dashboard Routes */}
            <Route
              element={<RoleProtectedRoute allowedRoles={["TravelAgency"]} />}
            >
              <Route
                path="/travelAgencyDashboard"
                element={<TravelAgencyDashboard />}
              >
                <Route index element={<Main />} />
                <Route path="main" element={<Main />} />
                <Route path="tours" element={<TourManagementDashboard />} />

                <Route path="booking" element={<BookingRequestsDashboard />} />
              </Route>
            </Route>
            {/* <Route path="down" element={<DownloadSpinner />} /> */}
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
