import { FilterQuery } from "mongoose";

import { Question, Tag } from "@/database";
import { GetTagQuestionParams } from "@/types/action";
import {
  ActionResponse,
  ErrorResponse,
  PaginatedSearchParams,
  QuestionProps,
} from "@/types/global";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { getSkipLimit } from "../utils";
import {
  GetTagQuestionsSchema,
  PaginatedSearchParamsSchema,
} from "../validation";

export const getTags = async (
  params: PaginatedSearchParams
): Promise<ActionResponse<{ tags: Tag[]; isNext: boolean }>> => {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;
  const { skip, limit } = getSkipLimit(page, pageSize);

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

export const getTagQuestion = async (
  params: GetTagQuestionParams
): Promise<ActionResponse<{ tag: Tag; questions: QuestionProps[] }>> => {
  const validationResult = await action({
    params,
    schema: GetTagQuestionsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { tagId, page = 1, pageSize = 10, query } = params;
  const { skip, limit } = getSkipLimit(page, pageSize);

  try {
    const tag = await Tag.findById(tagId);

    if (!tag) {
      throw new Error("Tag not found");
    }

    const filterQuery: FilterQuery<typeof Question> = {
      tags: { $in: [tagId] },
    };

    if (query) {
      filterQuery.title = { $regex: query, $options: "i" };
    }

    const totalQuestions = await Question.countDocuments(filterQuery);

    const questions = await Question.find(filterQuery)
      .select("_id title views answers upvotes downvotes auth createdAt")
      .populate([
        { path: "author", select: "name image" },
        { path: "tags", select: "name" },
      ])
      .skip(skip)
      .limit(limit);

    const isNext = totalQuestions > skip * questions.length;

    return {
      success: true,
      data: {
        tag: JSON.parse(JSON.stringify(tag)),
        questions: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }

  // Make a call from the Question model and find questions that contain this tag

  // Return the questions
};
