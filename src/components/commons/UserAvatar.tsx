import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/route";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "../ui/avatar";

interface IProps {
  id: string;
  name: string;
  image?: string;
  className?: string;
  fallbackClassName?: string;
}

const UserAvatar = ({
  id,
  name,
  image,
  className = "h-10 w-10",
  fallbackClassName,
}: IProps) => {
  const initial = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={` ${className}`}>
        {image ? (
          <Image
            src={image}
            alt={name}
            className="object-cover"
            width={36}
            height={36}
            quality={100}
          />
        ) : (
          <AvatarFallback
            className={cn(
              "primary-gradient font-space-grotesk font-bold tracking-wider text-white",
              fallbackClassName
            )}
          >
            {initial}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
