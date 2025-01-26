import {
  ActionResponse,
  ErrorResponse,
  PaginatedSearchParams,
} from "@/types/global";
import action from "../handlers/action";
import { PaginatedSearchParamsSchema } from "../validation";
import handleError from "../handlers/error";
import { FilterQuery } from "mongoose";
import { Tag } from "@/database";
import { ITagDoc } from "@/database/tag.model";

export const getTags = async (
  params: PaginatedSearchParams
): Promise<ActionResponse<{ tags: ITagDoc[]; isNext: boolean }>> => {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof Tag> = {};

  if (query) {
    filterQuery.$or = [
      {
        name: { $regex: query, $options: "i" },
      },
    ];
  }

  let sorCriteria = {};

  switch (filter) {
    case "popular":
      sorCriteria = { questions: -1 };
      break;
    case "recent":
      sorCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sorCriteria = { createdAt: 1 };
      break;
    case "name":
      sorCriteria = { name: 1 };
      break;
    default:
      sorCriteria = { questions: -1 };
      break;
  }

  try {
    const totalTags = await Tag.countDocuments(filterQuery);

    const tags = await Tag.find(filterQuery)
      .sort(sorCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalTags > skip * tags.length;

    return {
      success: true,
      data: {
        tags: JSON.parse(JSON.stringify(tags)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
