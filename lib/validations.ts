import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email address is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password cannot be more than 100 characters" }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),

  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces.",
    }),

  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title is required, at least 5 characters long." })
    .max(200, { message: "Title must not exceed 200 characters." }),

  content: z
    .string()
    .min(5, { message: "Title is required, at least 5 characters long." }),

  tags: z
    .array(
      z
        .string()
        .min(0, { message: "Tag is required" })
        .max(30, { message: "Title must not exceed 30 characters." }),
    )
    .min(1, { message: "At least 1 Tag is required" })
    .max(5, { message: "Cannot add more than 5 Tags" }),
});

export const UserSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  username: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long." }),
  email: z.email({ message: "Email is required." }),
  bio: z.string().optional(),
  image: z.string().optional(),
  location: z.string().optional(),
  portfolio: z.string().optional(),
  reputation: z.number().optional(),
});

export const AccountSchema = z.object({
  userId: z.string(),
  name: z.string().min(1, "Name is required"),
  image: z.string().optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .optional(),
  provider: z.string().min(1, "Provider is required"),
  providerAccountId: z.string().optional(),
});

export const EditQuestionSchema = AskQuestionSchema.extend({
  questionId: z.string().min(1, { message: "Question is required" }),
});

export const GetQuestionSchema = z.object({
  questionId: z.string().min(1, { message: "Question is required" }),
});
