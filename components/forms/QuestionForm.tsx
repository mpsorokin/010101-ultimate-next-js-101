"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AskQuestionSchema } from "@/lib/validations";

const QuestionForm = () => {
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = () => {};

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="capitalize paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  required
                  type={"text"}
                  {...field}
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700
                   no-focus min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Be specific
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="capitalize paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  required
                  type={"text"}
                  {...field}
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700
                   no-focus min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Be specific
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="capitalize paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  required
                  type={"text"}
                  {...field}
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700
                   no-focus min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Be specific
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default QuestionForm;
