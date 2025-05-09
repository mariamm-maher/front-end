import { useState } from "react";
import {
  FiArrowLeft,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiPlus,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ComplaintPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");
  const [formData, setFormData] = useState({
    subject: "",
    complaintType: "booking",
    bookingReference: "",
    description: "",
    attachments: [],
  });

  // Sample past complaints data
  const pastComplaints = [
    {
      id: "COMP-789456",
      date: "2023-06-15",
      subject: "Incorrect billing for Bali trip",
      status: "resolved",
      lastUpdate: "2023-06-18",
      type: "billing",
    },
    {
      id: "COMP-123789",
      date: "2023-05-22",
      subject: "Tour guide didn't show up",
      status: "in-progress",
      lastUpdate: "2023-05-30",
      type: "service",
    },
    {
      id: "COMP-456123",
      date: "2023-04-05",
      subject: "Hotel not as advertised",
      status: "rejected",
      lastUpdate: "2023-04-10",
      type: "accommodation",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const removeAttachment = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would submit to your backend here
    alert("Complaint submitted successfully! We will get back to you soon.");
    setFormData({
      subject: "",
      complaintType: "booking",
      bookingReference: "",
      description: "",
      attachments: [],
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "resolved":
        return <FiCheckCircle className="text-green-500" />;
      case "in-progress":
        return <FiClock className="text-blue-500" />;
      case "rejected":
        return <FiXCircle className="text-red-500" />;
      default:
        return <FiClock className="text-yellow-500" />;
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
              Back
            </button>
            <h1 className="text-xl font-bold text-gray-800">
              Customer Support
            </h1>
            <div></div> {/* Empty div for spacing */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <nav className="space-y-4">
                <button
                  onClick={() => setActiveTab("new")}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg ${
                    activeTab === "new"
                      ? "bg-[#1784ad]/10 text-[#1784ad]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FiPlus />
                  <span>Submit New Complaint</span>
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg ${
                    activeTab === "history"
                      ? "bg-[#1784ad]/10 text-[#1784ad]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FiAlertTriangle />
                  <span>Past Complaints</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {activeTab === "new" ? (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Submit a Complaint
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
                          placeholder="Briefly describe your issue"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Complaint Type
                          </label>
                          <select
                            name="complaintType"
                            value={formData.complaintType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
                            required
                          >
                            <option value="booking">Booking Issue</option>
                            <option value="billing">Billing/Payment</option>
                            <option value="accommodation">Accommodation</option>
                            <option value="transportation">
                              Transportation
                            </option>
                            <option value="service">Service Quality</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Booking Reference (if applicable)
                          </label>
                          <input
                            type="text"
                            name="bookingReference"
                            value={formData.bookingReference}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
                            placeholder="TRP-123456"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Detailed Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows="5"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1784ad] focus:border-[#1784ad]"
                          placeholder="Please describe your complaint in detail..."
                          required
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Attachments (optional)
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                          <div className="space-y-1 text-center">
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-[#1784ad] hover:text-[#147399] focus-within:outline-none"
                              >
                                <span>Upload files</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={handleFileUpload}
                                  multiple
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, PDF up to 10MB
                            </p>
                          </div>
                        </div>

                        {formData.attachments.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Attached Files:
                            </h4>
                            <ul className="space-y-2">
                              {formData.attachments.map((file, index) => (
                                <li
                                  key={index}
                                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                                >
                                  <span className="text-sm truncate max-w-xs">
                                    {file.name}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => removeAttachment(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    Remove
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full bg-[#1784ad] hover:bg-[#147399] text-white font-medium py-3 rounded-lg"
                        >
                          Submit Complaint
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Past Complaints
                  </h2>

                  <div className="space-y-4">
                    {pastComplaints.length > 0 ? (
                      pastComplaints.map((complaint) => (
                        <div
                          key={complaint.id}
                          className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold">{complaint.subject}</h3>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                <span>Ref: {complaint.id}</span>
                                <span>
                                  {new Date(
                                    complaint.date
                                  ).toLocaleDateString()}
                                </span>
                                <span className="capitalize">
                                  {complaint.type}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(complaint.status)}
                              <span className="capitalize">
                                {complaint.status.replace("-", " ")}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-100 text-sm">
                            <p className="text-gray-600">
                              Last updated:{" "}
                              {new Date(
                                complaint.lastUpdate
                              ).toLocaleDateString()}
                            </p>
                            <button className="mt-2 text-[#1784ad] hover:underline">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <FiAlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          No past complaints
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          You haven't submitted any complaints yet.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintPage;
