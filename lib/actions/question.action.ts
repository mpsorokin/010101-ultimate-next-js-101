"use server";

import mongoose from "mongoose";

import Question from "@/database/question.model";
import action from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { AskQuestionSchema } from "@/lib/validations";
import { ActionResponse, ErrorResponse } from "@/types/global";

export async function createQuestion(
  params: CreateQuestionParams,
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: AskQuestionSchema,
    // only auth users can make a request
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { title, content, tags } = validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [qqq] = await Question.create([{ title, content, author: userId }], {
      session,
    });
  } catch (err) {
    await session.abortTransaction();
    return handleError(err) as ErrorResponse;
  } finally {
    session.endSession();
  }
}
