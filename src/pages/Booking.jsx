import { useState, useEffect } from "react";
import {
  FiArrowLeft,
  FiUser,
  FiCreditCard,
  FiCheckCircle,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiUsers,
} from "react-icons/fi";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { bookTour } from "../services/touristApi";
import { getTour } from "../services/tourApi";
import { toast } from "react-hot-toast";
import BookingSuccess from "../components/shared/BookingSuccess";

const BookingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [trip, setTrip] = useState(
    location.state?.trip || {
      id: id || 1,
      name: "Loading...",
      image: "",
      price: 0,
      duration: "",
      startDate: "",
      endDate: "",
      location: "",
      agency: "",
      description: "",
    }
  );
  // Sample travelers data
  const [travelers, setTravelers] = useState([
    { id: 1, email: "", phoneNumber: "", numberOfPeople: 1 },
  ]);
  useEffect(() => {
    // Debug log to check what data is being passed to the Booking component
    console.log("Booking component - location state:", location.state);
    console.log("Booking component - trip ID from params:", id);
    console.log("Booking component - initial trip state:", trip);

    // Fetch tour data if not provided in location state
    const fetchTourData = async () => {
      if (!location.state?.trip && id) {
        try {
          setLoading(true);
          console.log(
            "Fetching tour data from API because location.state.trip is not available"
          );
          const tourData = await getTour(id);
          console.log("Fetched tour data from API:", tourData);

          // Extract tour object from response structure if needed
          const tourObject = tourData.tour || tourData;
          console.log("Extracted tour object:", tourObject);

          if (tourData) {
            const tripData = {
              id: tourObject.id || id,
              name: tourObject.title || tourObject.name || "Tour Package",
              image:
                tourObject.mainimage ||
                tourObject.image ||
                "https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              price: tourObject.price || 899,
              duration: tourObject.duration || "7 days",
              startDate:
                tourObject.startDate || new Date().toISOString().split("T")[0],
              endDate:
                tourObject.endDate ||
                new Date(new Date().setDate(new Date().getDate() + 7))
                  .toISOString()
                  .split("T")[0],
              location: tourObject.location || "Location not available",
              agency:
                tourObject.agency ||
                tourObject.travelAgencyName ||
                "Tour Agency",
              description:
                tourObject.description || "Tour description not available",
            };

            console.log("Setting trip data with prepared object:", tripData);
            setTrip(tripData);
          }
        } catch (error) {
          console.error("Error fetching tour data:", error);
          toast.error("Failed to load tour details. Using default data.");
        } finally {
          setLoading(false);
        }
      } else if (location.state?.trip) {
        console.log(
          "Using trip data from location.state:",
          location.state.trip
        );
      }
    };

    fetchTourData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, location.state]);

  const handleTravelerChange = (id, field, value) => {
    setTravelers(
      travelers.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };
  const handleCardChange = (field, value) => {
    setCardDetails({ ...cardDetails, [field]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission - Current trip data:", trip);
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process payment and booking
      try {
        setLoading(true);

        // Prepare booking data - only send numberOfPeople and paymentMethod as required by the API
        const bookingData = {
          numberOfPeople: travelers[0]?.numberOfPeople || 1,
          paymentMethod: paymentMethod,
        };

        console.log("Submitting booking with trip ID:", trip.id);
        console.log("Booking data:", bookingData); // Call the API to book the tour
        const response = await bookTour(trip.id, bookingData);
        console.log("Booking response:", response);

        // Show success modal instead of toast
        setShowSuccessModal(true);

        // Do not navigate away automatically - the modal will handle navigation
      } catch (error) {
        console.error("Error booking tour:", error);
        toast.error(
          error.message || "Failed to process booking. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen ">
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-[#1784ad] border-opacity-50 rounded-full animate-spin mb-4"></div>
            <p>
              {step === 3
                ? "Processing your booking..."
                : "Loading tour information..."}
            </p>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-[#1784ad]"
            >
              <FiArrowLeft className="mr-2" />
              Back to trip
            </button>
            <div className="flex items-center gap-2">
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 1
                    ? "bg-[#1784ad] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </span>
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 2
                    ? "bg-[#1784ad] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </span>
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 3
                    ? "bg-[#1784ad] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </span>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Main Content */}{" "}
      <div className="container mx-auto px-4 py-12">
        {" "}
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* Left Column - Booking Form */}
          <div className="lg:w-2/3 mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                {step === 1 && "personal Information"}
                {step === 2 && "Payment Method"}
                {step === 3 && "Review & Confirm"}
              </h1>
              {/* Progress Steps */}
              <div className="flex justify-between mb-8 relative">
                <div
                  className={`flex flex-col items-center ${
                    step >= 1 ? "text-[#1784ad]" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step >= 1 ? "bg-[#1784ad] text-white" : "bg-gray-100"
                    }`}
                  >
                    <FiUser />
                  </div>
                  <span className="text-sm">Travelers</span>
                </div>
                <div className="absolute top-5 left-1/4 right-1/4 h-1 bg-gray-200 z-0">
                  <div
                    className={`h-full ${
                      step >= 2 ? "bg-[#1784ad]" : "bg-gray-200"
                    }`}
                    style={{ width: step >= 2 ? "100%" : "0%" }}
                  ></div>
                </div>
                <div
                  className={`flex flex-col items-center ${
                    step >= 2 ? "text-[#1784ad]" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step >= 2 ? "bg-[#1784ad] text-white" : "bg-gray-100"
                    }`}
                  >
                    <FiCreditCard />
                  </div>
                  <span className="text-sm">Payment</span>
                </div>
                <div className="absolute top-5 left-3/4 right-1/4 h-1 bg-gray-200 z-0">
                  <div
                    className={`h-full ${
                      step >= 3 ? "bg-[#1784ad]" : "bg-gray-200"
                    }`}
                    style={{ width: step >= 3 ? "100%" : "0%" }}
                  ></div>
                </div>
                <div
                  className={`flex flex-col items-center ${
                    step >= 3 ? "text-[#1784ad]" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step >= 3 ? "bg-[#1784ad] text-white" : "bg-gray-100"
                    }`}
                  >
                    <FiCheckCircle />
                  </div>
                  <span className="text-sm">Confirm</span>
                </div>
              </div>
              {/* Form Steps */}
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-6">
                    {travelers.map((traveler) => (
                      <div key={traveler.id} className=" rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {" "}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              email
                            </label>
                            <input
                              type="email"
                              value={traveler.email || ""}
                              onChange={(e) =>
                                handleTravelerChange(
                                  traveler.id,
                                  "email",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Number of People
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={traveler.numberOfPeople || 1}
                              onChange={(e) =>
                                handleTravelerChange(
                                  traveler.id,
                                  "numberOfPeople",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              phone Number
                            </label>
                            <input
                              type="text"
                              value={traveler.phoneNumber || ""}
                              onChange={(e) =>
                                handleTravelerChange(
                                  traveler.id,
                                  "phoneNumber",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-bold text-lg mb-4">Payment Method</h3>

                      <div className="space-y-4">
                        <div
                          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                            paymentMethod === "credit"
                              ? "border-[#1784ad] bg-[#1784ad]/5"
                              : "border-gray-200"
                          }`}
                          onClick={() => setPaymentMethod("credit")}
                        >
                          <input
                            type="radio"
                            checked={paymentMethod === "credit"}
                            onChange={() => setPaymentMethod("credit")}
                            className="h-5 w-5 text-[#1784ad] focus:ring-[#1784ad]"
                          />
                          <label className="ml-3 font-medium">
                            Credit/Debit Card
                          </label>
                        </div>
                        <div
                          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                            paymentMethod === "Cash"
                              ? "border-[#1784ad] bg-[#1784ad]/5"
                              : "border-gray-200"
                          }`}
                          onClick={() => setPaymentMethod("Cash")}
                        >
                          <input
                            type="radio"
                            checked={paymentMethod === "Cash"}
                            onChange={() => setPaymentMethod("Cash")}
                            className="h-5 w-5 text-[#1784ad] focus:ring-[#1784ad]"
                          />
                          <label className="ml-3 font-medium">Cash</label>
                        </div>
                        <div
                          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                            paymentMethod === "paypal"
                              ? "border-[#1784ad] bg-[#1784ad]/5"
                              : "border-gray-200"
                          }`}
                          onClick={() => setPaymentMethod("paypal")}
                        >
                          <input
                            type="radio"
                            checked={paymentMethod === "paypal"}
                            onChange={() => setPaymentMethod("paypal")}
                            className="h-5 w-5 text-[#1784ad] focus:ring-[#1784ad]"
                          />
                          <label className="ml-3 font-medium">PayPal</label>
                        </div>
                      </div>

                      {paymentMethod === "credit" && (
                        <div className="mt-6 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              value={cardDetails.number}
                              onChange={(e) =>
                                handleCardChange("number", e.target.value)
                              }
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Name on Card
                            </label>
                            <input
                              type="text"
                              value={cardDetails.name}
                              onChange={(e) =>
                                handleCardChange("name", e.target.value)
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                value={cardDetails.expiry}
                                onChange={(e) =>
                                  handleCardChange("expiry", e.target.value)
                                }
                                placeholder="MM/YY"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                              </label>
                              <input
                                type="text"
                                value={cardDetails.cvv}
                                onChange={(e) =>
                                  handleCardChange("cvv", e.target.value)
                                }
                                placeholder="123"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}{" "}
                {step === 3 && (
                  <div className="space-y-6">
                    {/* Trip Summary */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-bold text-lg mb-4">Trip Summary</h3>
                      <div className="flex flex-col md:flex-row gap-6">
                        <img
                          src={trip.image}
                          alt={trip.name}
                          className="w-full md:w-48 h-48 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-xl">{trip.name}</h4>
                          <p className="text-gray-600 mt-2">
                            {trip.description}
                          </p>

                          <div className="mt-4 space-y-3">
                            <div className="flex items-center gap-3">
                              <FiMapPin className="text-[#1784ad]" />
                              <span>{trip.location}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <FiCalendar className="text-[#1784ad]" />
                              <span>
                                {new Date(trip.startDate).toLocaleDateString()}{" "}
                                - {new Date(trip.endDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <FiClock className="text-[#1784ad]" />
                              <span>{trip.duration}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <FiUsers className="text-[#1784ad]" />
                              <span>Travel Agency: {trip.agency}</span>
                            </div>
                            <div className="flex items-center gap-3 font-bold text-[#1784ad]">
                              <span>Price: ${trip.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Traveler Information */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-bold text-lg mb-4">
                        Traveler Information
                      </h3>
                      <div className="space-y-4">
                        {travelers.map((traveler) => (
                          <div
                            key={traveler.id}
                            className="bg-gray-50 p-4 rounded-lg"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">
                                  {traveler.email || "Not provided"}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Phone Number
                                </p>
                                <p className="font-medium">
                                  {traveler.phoneNumber || "Not provided"}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Number of People
                                </p>
                                <p className="font-medium">
                                  {traveler.numberOfPeople || 1}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-bold text-lg mb-4">
                        Payment Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">
                            Payment Method
                          </p>
                          <p className="font-medium">
                            {paymentMethod === "credit" && "Credit/Debit Card"}
                            {paymentMethod === "Cash" && "Cash"}
                            {paymentMethod === "paypal" && "PayPal"}
                          </p>
                        </div>

                        {paymentMethod === "credit" && (
                          <>
                            <div>
                              <p className="text-sm text-gray-500">
                                Card Number
                              </p>
                              <p className="font-medium">
                                {cardDetails.number
                                  ? "•••• •••• •••• " +
                                    cardDetails.number.slice(-4)
                                  : "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Name on Card
                              </p>
                              <p className="font-medium">
                                {cardDetails.name || "Not provided"}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Expiry Date
                                </p>
                                <p className="font-medium">
                                  {cardDetails.expiry || "Not provided"}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Booking Total */}
                    <div className="border border-gray-200 rounded-lg p-6 bg-[#1784ad]/5">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">Total Amount</h3>
                        <div className="text-xl font-bold text-[#1784ad]">
                          $
                          {(
                            trip.price * (travelers[0]?.numberOfPeople || 1)
                          ).toFixed(2)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        This amount covers {travelers[0]?.numberOfPeople || 1}{" "}
                        {travelers[0]?.numberOfPeople === 1
                          ? "person"
                          : "people"}{" "}
                        for the entire trip duration.
                      </p>
                    </div>
                  </div>
                )}
                <div className="mt-8 flex justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}{" "}
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#1784ad] hover:bg-[#147399] text-white rounded-lg flex items-center justify-center"
                    disabled={loading && step === 3}
                  >
                    {step < 3 ? "Continue" : "Confirm Booking"}
                    {loading && step === 3 && (
                      <div className="ml-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </button>
                </div>
              </form>{" "}
            </div>{" "}
          </div>
        </div>
      </div>
      {/* Success Modal */}
      {showSuccessModal && (
        <BookingSuccess
          travelAgencyName={trip.agency}
          onClose={() => {
            setShowSuccessModal(false);
            // Navigation will be handled by the BookingSuccess component
          }}
        />
      )}
    </div>
  );
};

export default BookingPage;
