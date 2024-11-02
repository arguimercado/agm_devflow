import { title } from "process";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import TagCard from "@/components/cards/TagCard";
import ROUTES from "@/contstants/route";

const hotQuestions = [
  {
    _id: "1",
    title: "How to create a custom hook in React?",
  },
  {
    _id: "2",
    title: "How to customize the scrollbar in CSS?",
  },
  {
    _id: "3",
    title: "How to use async/await in JavaScript?",
  },
  {
    _id: "4",
    title: "How to use React Router?",
  },
  {
    _id: "5",
    title: "How to use Redux in React?",
  },
];

const popularTags = [
  { _id: "1", title: "react", questions: 100 },
  { _id: "2", title: "javascript", questions: 200 },
  { _id: "3", title: "css", questions: 300 },
  { _id: "4", title: "html", questions: 400 },
  { _id: "5", title: "nodejs", questions: 500 },
];

const RightSidebar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border right-0 top-0 flex h-screen w-[360px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 shadow-light-400 dark:shadow-none  max-xl:hidden ">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Question</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              href={ROUTES.PROFILE(_id)}
              key={_id}
              className="flex cursor-pointer items-center justify-between gap-3"
            >
              <span className="body-medium text-dark500_light700 font-space-grotesk">
                {title}
              </span>
              <Image
                src="/icons/chevron-right.svg"
                alt="chevron-right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map(({ _id, title, questions }) => (
            <TagCard
              key={_id}
              _id={_id}
              showCount
              name={title}
              questions={questions}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
