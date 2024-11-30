import Link from "next/link";

import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filter/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { questions } from "@/constants/data";
import ROUTES from "@/constants/route";
import { api } from "@/lib/api";
import handleError from "@/lib/handlers/error";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const test = async () => {
  try {
    return await api.users.getAll();
  } catch (error) {
    return handleError(error, "server");
  }
};

const Home = async ({ searchParams }: SearchParams) => {
  const session = await auth();

 
  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter(({ title, tags }) => {
    const matchesQuery = title.toLowerCase().includes(query.toLowerCase());
    const matchesFilterQuery = tags.some((tag) =>
      tag.name.toLowerCase().includes(filter.toLowerCase())
    );
    return matchesQuery && matchesFilterQuery;
  });

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          icon="/icons/search.svg"
          placeholder="Search for questions"
          baseClassName="flex-1"
          route="/"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
