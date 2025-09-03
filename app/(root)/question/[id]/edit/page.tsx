import { redirect } from "next/navigation";

import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import ROUTES from "@/constants/routes";
import { RouteParams } from "@/types/global";

const EditQuestionPage = async ({ params }: RouteParams) => {
  const { id } = await params;

  if (!id) throw new Error("id not found");

  const session = await auth();
  if (!session) {
    return redirect(ROUTES.SIGN_IN);
  }

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <QuestionForm />
      </div>
    </>
  );
};

export default EditQuestionPage;
