import Header from "./header";
import StatsCard from "./StatsCard";
import ComplaintList from "./complaintList";
import Search from "./Search";

export default function ComplaintsManagement() {
  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <Header />
      {/* Stats Cards */}
      <StatsCard />
      {/* Filters and Search */}
      <Search />
      {/* Complaints List */}
      <ComplaintList />
    </div>
  );
}
