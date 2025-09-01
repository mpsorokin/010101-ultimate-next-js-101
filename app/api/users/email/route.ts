import { ValidationError } from "ajv";
import { NextResponse } from "next/server";

import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";

export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    dbConnect();

    const validatedData = UserSchema.partial().safeParse({ email });
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const user = await User.findOne({ email });

    if (!user) throw new NotFoundError("User does not exist");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (e) {
    return handleError(e, "api") as APIErrorResponse;
  }
}
