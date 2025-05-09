import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../services/AdminApi"; // adjust the path if needed
import Header from "./Header";
import StatsCard from "./StatsCard";
import CategoryList from "./CategoryList";

export default function CategoriesManagement() {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
  console.log(categories);
  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <Header />

      {/* Stats Cards */}
      <StatsCard categories={categories} isLoading={isLoading} />

      {/* Categories List */}
      <CategoryList
        categories={categories}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </div>
  );
}
