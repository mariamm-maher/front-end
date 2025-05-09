import Header from "./header";
import StatsCards from "./statsCards";
import Search from "./Search";
import TransactionList from "./transactionList";

export default function BookingTransactions() {
  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <Header />
      {/* Stats Cards */}
      <StatsCards />
      {/* Filters and Search */}
      <Search />
      {/* Transactions List */}
      <TransactionList />
    </div>
  );
}
