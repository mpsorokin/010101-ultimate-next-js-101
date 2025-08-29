import { IQuestion } from "@/types/global";

interface IQuestionCardProps {
  question: IQuestion;
}

const QuestionCard = ({
  question: { _id, title, tags, author, createdAt, upvotes, answers, views },
}: IQuestionCardProps) => {
  return <p>qc</p>;
};

export default QuestionCard;
