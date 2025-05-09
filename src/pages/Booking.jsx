import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  // Sample trip data
  const trip = {
    id: 1,
    name: "Bali Cultural Experience",
    image:
      "https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    price: 899,
    duration: "7 days",
    startDate: "2023-11-15",
    endDate: "2023-11-22",
    location: "Bali, Indonesia",
    agency: "Bali Adventure Tours",
    description:
      "Explore Bali's rich culture through temple visits, traditional dances, and local crafts.",
  };

  // Sample travelers data
  const [travelers, setTravelers] = useState([
    { id: 1, name: "Alex Johnson", age: 32, passport: "", dietary: "" },
  ]);

  const handleAddTraveler = () => {
    setTravelers([
      ...travelers,
      {
        id: travelers.length + 1,
        name: "",
        age: "",
        passport: "",
        dietary: "",
      },
    ]);
  };

  const handleTravelerChange = (id, field, value) => {
    setTravelers(
      travelers.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const handleCardChange = (field, value) => {
    setCardDetails({ ...cardDetails, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process payment and booking
      alert("Booking confirmed! Thank you for your reservation.");
      navigate("/bookings");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
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
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                {step === 1 && "Traveler Information"}
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
                    {travelers.map((traveler, index) => (
                      <div
                        key={traveler.id}
                        className="border border-gray-200 rounded-lg p-6"
                      >
                        <h3 className="font-bold text-lg mb-4">
                          Traveler {index + 1} {index === 0 && "(Primary)"}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={traveler.name}
                              onChange={(e) =>
                                handleTravelerChange(
                                  traveler.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Age
                            </label>
                            <input
                              type="number"
                              value={traveler.age}
                              onChange={(e) =>
                                handleTravelerChange(
                                  traveler.id,
                                  "age",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Passport Number
                            </label>
                            <input
                              type="text"
                              value={traveler.passport}
                              onChange={(e) =>
                                handleTravelerChange(
                                  traveler.id,
                                  "passport",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Dietary Restrictions
                            </label>
                            <input
                              type="text"
                              value={traveler.dietary}
                              onChange={(e) =>
                                handleTravelerChange(
                                  traveler.id,
                                  "dietary",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
                              placeholder="None"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={handleAddTraveler}
                      className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#1784ad] hover:text-[#1784ad] w-full"
                    >
                      + Add Another Traveler
                    </button>
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
                )}

                {step === 3 && (
                  <div className="space-y-6">
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
                              <span>{travelers.length} traveler(s)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-bold text-lg mb-4">Travelers</h3>
                      <div className="space-y-4">
                        {travelers.map((traveler, index) => (
                          <div
                            key={traveler.id}
                            className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                          >
                            <h4 className="font-medium">
                              Traveler {index + 1} {index === 0 && "(Primary)"}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 text-sm text-gray-600">
                              <div>
                                <span className="block text-xs text-gray-400">
                                  Name
                                </span>
                                <span>{traveler.name}</span>
                              </div>
                              <div>
                                <span className="block text-xs text-gray-400">
                                  Age
                                </span>
                                <span>{traveler.age}</span>
                              </div>
                              <div>
                                <span className="block text-xs text-gray-400">
                                  Passport
                                </span>
                                <span>{traveler.passport}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-bold text-lg mb-4">
                        Payment Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span>${trip.price * travelers.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Taxes & Fees</span>
                          <span>$49.00</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200 mt-2">
                          <span>Total</span>
                          <span>${trip.price * travelers.length + 49}</span>
                        </div>
                      </div>
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
                  )}

                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#1784ad] hover:bg-[#147399] text-white rounded-lg"
                  >
                    {step < 3 ? "Continue" : "Confirm Booking"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Trip Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Your Trip
              </h2>

              <div className="flex items-start gap-4 mb-6">
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-bold">{trip.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{trip.agency}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dates</span>
                  <span>
                    {new Date(trip.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(trip.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span>{trip.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Travelers</span>
                  <span>{travelers.length} traveler(s)</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${trip.price * travelers.length + 49}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
