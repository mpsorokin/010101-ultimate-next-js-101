import { FilterQuery } from "mongoose";

import { Tag } from "@/database";
import { ITag } from "@/database/tag.model";
import action from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import {
  GetTagQuestionsSchema,
  PaginatedSearchParamsSchema,
} from "@/lib/validations";
import { GetTagQuestionsParams } from "@/types/action";
import {
  ActionResponse,
  ErrorResponse,
  IPaginatedSearchParams,
  IQuestion,
} from "@/types/global";

export const getTags = async (
  params: IPaginatedSearchParams,
): Promise<ActionResponse<{ tags: ITag[]; isNext: boolean }>> => {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;
  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<ITag> = {};

  if (query) {
    filterQuery.$or = [{ title: { $regex: new RegExp(`^${query}$`, "i") } }];
  }

  let sortCriteria = {};

  switch (filter) {
    case "recent":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { questions: -1 };
      break;
    case "name":
      sortCriteria = { name: 1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
  }

  try {
    const totalTags = await Tag.countDocuments(filterQuery);

    const tags = await Tag.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalTags > skip + tags.length;

    return {
      success: true,
      data: {
        tags: JSON.parse(JSON.stringify(tags)),
        isNext,
      },
    };
  } catch (err) {
    return handleError(err) as ErrorResponse;
  }
};

export const getTagQuestions = async (
  params: GetTagQuestionsParams,
): Promise<
  ActionResponse<{ tags: ITag; questions: IQuestion[]; isNext: boolean }>
> => {
  const validationResult = await action({
    params,
    schema: GetTagQuestionsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { tagId, page = 1, pageSize = 10, query } = params;
  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  try {
    const tag = await Tag.findById(tagId);

    if (!tag) {
    }

    const filterQuery: FilterQuery<ITag> = {};

    if (query) {
      filterQuery.$or = [{ title: { $regex: new RegExp(`^${query}$`, "i") } }];
    }

    const totalTags = await Tag.countDocuments(filterQuery);

    const tags = await Tag.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalTags > skip + tags.length;

    return {
      success: true,
      data: {
        tags: JSON.parse(JSON.stringify(tags)),
        isNext,
      },
    };
  } catch (err) {
    return handleError(err) as ErrorResponse;
  }
};
