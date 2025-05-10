import { useQuery } from "@tanstack/react-query";
import { FiCheck, FiX, FiSearch } from "react-icons/fi";
import {
  getAllTravelAgencyRequests,
  handleTravelAgencyRequest,
} from "../../../services/AdminApi"; // Adjust the path as needed
import DownloadSpinner from "../../shared/Downlaoding";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { format, parseISO, isValid } from "date-fns";
function RequestsTable() {
  const queryClient = useQueryClient();
  const {
    data: requestsList = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["travel-agency-requests"],
    queryFn: getAllTravelAgencyRequests,
  });

  const formatDate = (dateString) => {
    // Check if it's the default/empty date
    if (dateString === "0001-01-01T00:00:00" || !dateString) {
      return "Pending"; // More user-friendly than "N/A"
    }

    try {
      const date = parseISO(dateString);
      if (!isValid(date)) {
        return "Pending";
      }
      return format(date, "MMM dd, yyyy"); // Formats as "Jan 01, 2023"
    } catch (error) {
      console.error("Invalid date format:", error);
      return "Pending";
    }
  };

  // Mutation for handling travel agency requests
  const requestMutation = useMutation({
    mutationFn: ({ id, status }) => handleTravelAgencyRequest(id, status),
    onMutate: ({ id, status }) => {
      // Show loading toast
      toast.loading(
        `${status === "approve" ? "Approving" : "Rejecting"} request...`,
        {
          id: `request-${id}`,
        }
      );
    },
    onSuccess: (data, { id, status }) => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      queryClient.invalidateQueries({ queryKey: ["travel-agency-requests"] });

      // Show success toast
      toast.success(
        `Request ${
          status === "approve" ? "approved" : "rejected"
        } successfully!`,
        { id: `request-${id}` }
      );
    },
    onError: (error, { id, status }) => {
      // Show error toast
      toast.error(
        `Failed to ${status === "approve" ? "approve" : "reject"} request: ${
          error.message
        }`,
        { id: `request-${id}` }
      );
      console.error(`Error ${status} request:`, error);
    },
  });

  const handleApprove = (id) => {
    console.log(`Approving request with ID: ${id}`);
    requestMutation.mutate({ id, status: "approve" });
  };

  const handleReject = (id) => {
    console.log(`Rejecting request with ID: ${id}`);
    requestMutation.mutate({ id, status: "reject" });
  };
  console.log(requestsList);
  if (isLoading) return <DownloadSpinner />;
  if (isError) return <div> an error occurs</div>;
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Requests</h3>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search requests..."
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1784ad] text-sm"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button className="text-sm text-[#1784ad] hover:underline">
            View All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requestsList.map((request) => (
              <tr key={request.$id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                  {request.$id}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                  {request.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {request.email}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(request.createdAt)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-3">
                    <button
                      className="p-1.5 bg-green-50 text-green-600 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors"
                      onClick={() => handleApprove(request.id)}
                      title="Approve"
                    >
                      <FiCheck className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1.5 bg-red-50 text-red-600 rounded-full hover:bg-red-100 hover:text-red-700 transition-colors"
                      onClick={() => handleReject(request.id)}
                      title="Reject"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RequestsTable;
