import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import handleError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";

const questions = [
  {
    _id: "1",
    title: "How to learn React",
    description: "I want to learn React, anyone can help me?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "javascript" },
    ],
    author: { _id: "1", name: "John Doe", image: "/images/img_avatar.png" },
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
    author: { _id: "1", name: "John Doe", image: "/images/img_avatar.png" },
    upvotes: 10,
    answers: 5,
    views: 150,
    createdAt: new Date().toISOString(),
  },
];

/* const test = async () => {
  try {
    await dbConnect();
  } catch (e) {
    return handleError(e);
  }
}; */

interface ISearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: ISearchParams) => {
  // await test();

  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query?.toLowerCase());
    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter
      : true;

    return matchesQuery && matchesFilter;
  });

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

      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <div key={question._id}>
            <h2>{question.title}</h2>
            <QuestionCard key={question._id} question={question} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
