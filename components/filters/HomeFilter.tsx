import { Button } from "@/components/ui/button";

const filters = [
  { name: "Newest", value: "newest" },
  { name: "Popular", value: "popular" },
  { name: "Unanswered", value: "unanswered" },
  { name: "Recommended", value: "recommended" },
];

const HomeFilter = () => {
  return (
    <div className="mt-10">
      {filters.map((filter) => (
        <Button key={filter.name}>{filter.name}</Button>
      ))}
    </div>
  );
};
export default HomeFilter;
