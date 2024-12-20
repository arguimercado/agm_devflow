import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/route";
import { getDevIconClassName } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface IProps {
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
}: IProps) => {
  const iconClassName = getDevIconClassName(name);
  const Content = (
    <>
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 flex flex-row gap-2 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <i className={`${iconClassName} text-sm`}></i>
          <span>{name}</span>
        </div>

        {remove && (
          <Image
            src="/icons/close.svg"
            alt="close"
            width={12}
            height={12}
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={handleRemove}
          />
        )}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button type="button" className="flex justify-between gap-2">
        {Content}
      </button>
    ) : (
      <Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
        {Content}
      </Link>
    );
  }

  return (
    <Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
      {Content}
    </Link>
  );
};

export default TagCard;
