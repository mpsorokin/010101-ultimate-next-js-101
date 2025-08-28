import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import ROUTES from "@/constants/routes";

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
  return (
    <Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
      <Badge className="background-light800_dark300 text-dark400_light500 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <i>ICON</i>
          <span>{name}</span>
        </div>
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </Link>
  );
};

export default TagCard;
