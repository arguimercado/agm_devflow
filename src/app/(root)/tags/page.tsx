import TagCard from "@/components/cards/TagCard";
import DataRenderer from "@/components/commons/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/route";
import { EMPTY_TAGS } from "@/constants/state";
import { getTags } from "@/lib/actions/tags.action";
import { RouteParams } from "@/types/global";
import React from "react";





const Tags = async ({ searchParams }: RouteParams) => {

  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const tags = data?.tags || [];

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 text-3xl">Tags</h1>
      <section className="mt-11">
        <LocalSearch
          route={ROUTES.TAGS}
          icon="/icons/search.svg"
          placeholder="Search by Tag Name..."
          baseClassName="flex-1"
        />
      </section>
      <DataRenderer 
        success={success}
        data={tags}
        error={error}
        empty={EMPTY_TAGS}
        render={(tags) => (
          <div className="mt-10 flex w-full flex-wrap gap-4">
            {tags.map((tag) => (
              <TagCard key={tag._id} {...tag}  />
            ))}
          </div>
        )}
      />
    </>
  );
};

export default Tags;
