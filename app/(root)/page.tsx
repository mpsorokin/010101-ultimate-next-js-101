import Link from "next/link";

import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const questions = [
  {
    _id: "1",
    title: "How to learn React",
    description: "I want to learn React, anyone can help me?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "javascript" },
    ],
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answers: 5,
    views: 150,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "How to learn JavaScript",
    description: "I want to learn Javascript, anyone can help me?",
    tags: [{ _id: "2", name: "javascript" }],
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answers: 5,
    views: 150,
    createdAt: new Date().toISOString(),
  },
];

interface ISearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: ISearchParams) => {
  const { query } = await searchParams;

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query.toLowerCase()),
  );

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
      <div>Home filter</div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <h2 key={question._id}>{question.title}</h2>
        ))}
      </div>
    </div>
  );
};

export default Home;
