import { ITag } from "@/database/tag.model";
import action from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { PaginatedSearchParamsSchema } from "@/lib/validations";
import {
  ActionResponse,
  ErrorResponse,
  IPaginatedSearchParams,
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
};
