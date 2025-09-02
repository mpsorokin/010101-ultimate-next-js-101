import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ROUTES from "@/constants/routes";

interface IUserAvatarProps {
  id: string;
  name: string;
  image?: string;
}

const userAvatar = ({
  user: { id, name, image },
  className = "h-9 w-9",
}: {
  user: IUserAvatarProps;
  className?: string;
}) => {
  const initials = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase()
    .splice(0, 2);

  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={className}>
        {image !== "no image" ? (
          <Image
            src={image}
            alt={name}
            className="object-cover"
            width={36}
            height={36}
            quality={90}
          />
        ) : (
          <AvatarFallback className="primary-gradient font-space-grotesk font-bold tracking-wide text-white">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};
export default userAvatar;
