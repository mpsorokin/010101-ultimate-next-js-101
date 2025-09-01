import mongoose from "mongoose";

import User from "@/database/user.model";
import action from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { SignUpSchema } from "@/lib/validations";
import { ActionResponse, ErrorResponse } from "@/types/global";

export async function signUpWithCredentials(
  params: AuthCredentials,
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignUpSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, username, email, password } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser) {
      throw new Error("User email already exists");
    }
    const existingUsername = await User.findOne({ username }).session(session);

    if (existingUsername) {
      throw new Error("Username already exists");
    }
  } catch (err) {
    await session.abortTransaction();

    return handleError(err) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}
