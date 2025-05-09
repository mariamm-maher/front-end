import Charts from "./charts";
import Header from "./header";
import RequestList from "./RequestList";
import StatsCard from "./statsCard";

export default function SupportRequests() {
  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <Header />
      {/* Stats Cards */}
      <StatsCard />
      {/* Priority Distribution */}

      <Charts />

      {/* Requests List */}
      <RequestList />
    </div>
  );
}
