import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import ROUTES from "@/constants/routes";
import { getDeviconClassName } from "@/lib/utils";

interface ITagCardProps {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  remove,
  isButton,
  handleRemove,
}: ITagCardProps) => {
  const iconClass = getDeviconClassName(name);

  const Content = (
    <>
      <Badge className="background-light800_dark300 text-dark400_light500 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <i className={`${iconClass} text-sm`}></i>
          <span>{name}</span>
        </div>
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
      {remove && (
        <Image src="/icons/close.svg" width={12} height={12} alt="close icon" />
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button className="flex justify-between gap-2">{Content}</button>
    ) : (
      <Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
        {Content}
      </Link>
    );
  }
};

export default TagCard;
