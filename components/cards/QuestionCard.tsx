import { IQuestion } from "@/types/global";

interface IQuestionCardProps {
  question: IQuestion;
}

const QuestionCard = ({
  question: { _id, title, tags, author, createdAt, upvotes, answers, views },
}: IQuestionCardProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span>{createdAt.toString()}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
