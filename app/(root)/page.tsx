import Link from "next/link";
import { err } from "pino-std-serializers";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { getQuestions } from "@/lib/actions/question.action";

interface ISearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: ISearchParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { questions } = data || {};

  /* const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query?.toLowerCase());
    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter
      : true;

    return matchesQuery && matchesFilter;
  }); */

  return (
    <div>
      <section className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All questions</h1>

        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a question</Link>
        </Button>
      </section>

      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions ... "
          otherClasses="flex-1"
        />
      </section>

      <HomeFilter />
      {success ? (
        <div className="mt-10 flex w-full flex-col gap-6">
          {questions && questions.length > 0 ? (
            questions.map((question) => (
              <div key={question._id}>
                <h2>{question.title}</h2>
                <QuestionCard key={question._id} question={question} />
              </div>
            ))
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark400_light700">No questions found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex w-full items-center justify-center">
          <p className="text-dark400_light700">
            {error?.message || "Failed to fetch"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
