import Header from "./header";
import StatsCards from "./StatsCards";
import AccountList from "./AccountList";
import Charts from "./Charts";
import { getAllUsers } from "../../../services/AdminApi";
import { useQuery } from "@tanstack/react-query";
import DownloadSpinner from "../../shared/Downlaoding";

export default function AccountManagement() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["all-Acounts"],
    queryFn: getAllUsers,
    onSuccess: (data) => {
      // console.log("All Users:", data);
    },
  });

  console.log(data);

  if (isLoading) return <DownloadSpinner />;
  if (isError) return <div>failed to get the data</div>;

  // Add role property to each item and combine arrays
  const agenciesWithRole = (data.agencies?.$values || []).map((agency) => ({
    ...agency,
    role: "agency",
  }));

  const touristsWithRole = (data.tourists?.$values || []).map((tourist) => ({
    ...tourist,
    role: "tourist",
  }));

  const allAccounts = [...agenciesWithRole, ...touristsWithRole];

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <Header />
      {/* Stats Cards */}
      <StatsCards accounts={allAccounts} />
      {/* Charts Section */}
      <Charts />
      {/* Account List - Now passing the combined array with roles */}
      <AccountList accounts={allAccounts} />
    </div>
  );
}
