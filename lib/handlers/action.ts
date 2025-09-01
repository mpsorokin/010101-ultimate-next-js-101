"use server";

import { Session } from "next-auth";
import { ZodError, ZodSchema } from "zod";

import { auth } from "@/auth";
import { ValidationError, UnauthorizedError } from "@/lib/http-errors";

type ActionOptions<T> = {
  params?: T;
  schema?: ZodSchema<T>;
  authorize?: boolean;
};

async function action<T>({
  params,
  schema,
  authorize = false,
}: ActionOptions<T>) {
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (err) {
      if (err instanceof ZodError) {
        return new ValidationError(
          err.flatten().fieldErrors as Record<string, string[]>,
        );
      } else {
        return new Error("Schema validation failed");
      }
    }
  }

  const session: Session | null = null;

  if (authorize) {
    session = await auth();

    if (!session) {
      throw new UnauthorizedError("Unauthorized");
    }
  }
}
