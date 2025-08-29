"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
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
  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-10"></form>
    </Form>
  );
};
export default QuestionForm;
