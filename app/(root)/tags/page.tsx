import { getTags } from "@/lib/actions/tag.action";

const TagsPage = async () => {
  const { success, data, error } = await getTags({
    page: 1,
    pageSize: 10,
    query: "",
  });

  const { tags } = data || {};
  console.log("tags");
  console.log(tags);

  return <p>Tags Page</p>;
};

export default TagsPage;
