import Link from "next/link";
import React from "react";

import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/commons/DataRenderer";
import HomeFilter from "@/components/filter/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/route";
import { EMPTY_QUESTION } from "@/constants/state";
import { getTagQuestion } from "@/lib/actions/tags.action";
import { RouteParams } from "@/types/global";

const Page = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getTagQuestion({
    tagId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
  });

  const { tag, questions } = data || {};

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">{tag?.name}</h1>
      </section>
      <section className="mt-11">
        <LocalSearch
          icon="/icons/search.svg"
          placeholder="Search questions..."
          baseClassName="flex-1"
          iconPosition="left"
          route={ROUTES.TAG(id)}
        />
      </section>

      <div className="mt-10 flex w-full flex-col gap-6">
        <DataRenderer
          success={success}
          error={error}
          data={questions}
          empty={EMPTY_QUESTION}
          render={(questions) => (
            <div className="mt-10 flex w-full flex-col gap-6">
              {questions.map((question) => (
                <QuestionCard key={question._id} question={question} />
              ))}
            </div>
          )}
        />
      </div>
    </>
  );
};

export default Page;
