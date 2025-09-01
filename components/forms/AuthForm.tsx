"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
  Path,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { toast } from "@/hooks/use-toast";
import { ActionResponse } from "@/types/global";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;

    if (result?.success) {
      toast({
        title: "success",
        description: formType === "SIGN_IN" ? "Sign in" : "Sign up",
      });
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign in" : "Sign up";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-10 space-y-6"
      >
        {Object.keys(defaultValues).map((field) => {
          return (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-2.5">
                  <FormLabel className="capitalize paragraph-medium text-dark400_light700">
                    {field.name === "email" ? "Email Address" : field.name}
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      type={field.name === "password" ? "password" : "text"}
                      {...field}
                      className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
          type="submit"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign in"
              ? "Signin in ..."
              : "Signin up..."
            : buttonText}
        </Button>

        {formType === "SIGN_IN" ? (
          <p>
            Don&#39;t have an acocunt?{" "}
            <Link
              href={ROUTES.SIGN_UP}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an acocunt?{" "}
            <Link
              href={ROUTES.SIGN_IN}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign In
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
