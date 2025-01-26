import { getTags } from "@/lib/actions/tags.action";
import React from "react";

const Tags = async () => {
  const { success, data, error } = await getTags({
    page: 1,
    pageSize: 10,
  });

  const tags = data?.tags || [];

  console.log("TAGS", JSON.stringify(tags, null, 2));

  return <div>Tags</div>;
};

export default Tags;
