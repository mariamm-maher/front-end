import { FiAlertCircle, FiCheckCircle, FiXCircle } from "react-icons/fi";

function ViewBookingModel({
  bookingDetails,
  loadingBookingDetails,
  onClose,
  actionInProgress,
  handleUpdateStatus,
}) {
  // Extract booking data accounting for possible nesting
  const bookingData = bookingDetails?.booking || bookingDetails;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Booking Details
          </h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>{" "}
        <div className="p-6">
          {loadingBookingDetails ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading booking details...</p>
            </div>
          ) : !bookingDetails ? (
            <div className="text-center text-red-500 py-8">
              <FiAlertCircle size={32} className="mx-auto mb-4" />
              <p>Failed to load booking details</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Booking Status */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">Booking Status</span>
                  <div className="mt-1">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        (
                          bookingData.bookingStatus ||
                          bookingData.status ||
                          ""
                        ).toLowerCase() === "approved"
                          ? "bg-green-100 text-green-800"
                          : (
                              bookingData.bookingStatus ||
                              bookingData.status ||
                              ""
                            ).toLowerCase() === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {bookingData.bookingStatus ||
                        bookingData.status ||
                        "Unknown"}
                    </span>
                  </div>
                </div>
                {(
                  bookingData.bookingStatus ||
                  bookingData.status ||
                  ""
                ).toLowerCase() === "pending" && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        handleUpdateStatus(bookingData.id, "approve")
                      }
                      disabled={actionInProgress}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center"
                    >
                      <FiCheckCircle className="mr-2" /> Approve
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(bookingData.id, "reject")
                      }
                      disabled={actionInProgress}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center"
                    >
                      <FiXCircle className="mr-2" /> Reject
                    </button>
                  </div>
                )}{" "}
              </div>

              {/* Booking Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-4">
                    Customer Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Name</span>
                      <p className="font-medium">
                        {bookingData.touristName || "Unknown User"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Tourist ID</span>
                      <p className="font-medium text-xs">
                        {bookingData.touristId || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Tour Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-4">
                    Tour Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Tour Name</span>
                      <p className="font-medium">
                        {bookingData.tourTitle || "Unknown Trip"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Tour ID</span>
                      <p className="font-medium">
                        {bookingData.tourId || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Date</span>
                      <p className="font-medium">
                        {bookingData.bookingDate || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Guests</span>
                      <p className="font-medium">
                        {bookingData.numberOfPeople || 0} people
                      </p>
                    </div>
                  </div>
                </div>{" "}
                {/* Payment Information */}
                <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                  <h4 className="font-medium text-gray-700 mb-4">
                    Payment Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">
                        Payment Method
                      </span>
                      <p className="font-medium capitalize">
                        {bookingData.paymentMethod || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Amount</span>
                      <p className="font-medium">
                        ${bookingData.totalPrice || 0}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        Payment Status
                      </span>
                      <p className="font-medium">
                        {bookingData.paymentStatus === "paid"
                          ? "Paid"
                          : bookingData.paymentStatus === "refunded"
                          ? "Refunded"
                          : "Pending"}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Cancellation Information */}
                {bookingData.cancellationDate && (
                  <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Cancellation Information
                    </h4>
                    <p className="text-gray-600">
                      Cancelled on: {bookingData.cancellationDate}
                    </p>
                  </div>
                )}
                {/* Additional Notes */}
                {bookingData.notes && (
                  <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Additional Notes
                    </h4>
                    <p className="text-gray-600">{bookingData.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewBookingModel;
