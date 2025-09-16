import { getTags } from "@/lib/actions/tag.action";
import { RouteParams } from "@/types/global";

const TagsPage = async ({ searchParams }: RouteParams) => {
  const { success, data, error } = await getTags({
    page: 1,
    pageSize: 10,
    query: "javascript",
  });

  const { tags } = data || {};
  console.log("tags");
  console.log(tags);

  return <p>Tags Page</p>;
};

export default TagsPage;
