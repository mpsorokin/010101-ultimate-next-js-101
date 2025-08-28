interface ITagCardProps {
  _id: string;
  name: string;
  questions: number;
  showCount?: boolean;
  compact?: boolean;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
}: ITagCardProps) => {
  return <p>Tag</p>;
};

export default TagCard;
