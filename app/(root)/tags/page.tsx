import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import { getTags } from "@/lib/actions/tag.action";
import { RouteParams } from "@/types/global";

const TagsPage = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { tags } = data || {};
  console.log("tags");
  console.log(tags);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 text-3xl">Tags</h1>

      <section className="mt-11">
        <LocalSearch
          route={ROUTES.TAGS}
          imgSrc="/icons/search.svg"
          placeholder="Search by tag name"
          iconPosition="left"
          otherClasses="flex-1"
        />
      </section>
    </>
  );
};

export default TagsPage;
