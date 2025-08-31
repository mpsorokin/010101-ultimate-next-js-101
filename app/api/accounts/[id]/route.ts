import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import {
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("id is required");

  try {
    await dbConnect();

    const account = await Account.findById(id);

    if (!account) throw new NotFoundError("Account does not exist");

    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      { status: 200 },
    );
  } catch (e) {
    return handleError(e, "api") as APIErrorResponse;
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("id is required");

  try {
    await dbConnect();

    const account = await Account.findByIdAndDelete(id);

    if (!account) throw new NotFoundError("Account does not exist");

    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      { status: 200 },
    );
  } catch (e) {
    return handleError(e, "api") as APIErrorResponse;
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("id is required");

  try {
    await dbConnect();

    const user = await User.findById(id);

    if (!user) throw new NotFoundError("User does not exist");

    const body = await request.json();

    const validatedData = AccountSchema.partial().safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const updatedAccount = await Account.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!updatedAccount) throw new NotFoundError("Account does not exist");

    return NextResponse.json(
      {
        success: true,
        data: updatedAccount,
      },
      { status: 200 },
    );
  } catch (e) {
    return handleError(e, "api") as APIErrorResponse;
  }
}
