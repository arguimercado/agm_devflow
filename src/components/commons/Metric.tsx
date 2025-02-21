import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  imgUrl?: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  imgStyles?: string;
  isAuthor?: boolean;
  titleStyles?: string;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  imgStyles,
  isAuthor = false,
  titleStyles,
}: Props) => {
  const metricContent = (
    <>
      {imgUrl && (
        <Image
          src={imgUrl}
          alt={alt}
          width={20}
          height={20}
          className={`rounded-full object-contain ${imgStyles}`}
        />
      )}
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}{" "}
        {title ? (
          <span
            className={cn(`small-regular line-clamp-1`, titleStyles)}
          >
            {title}
          </span>
        ) : null}
      </p>
    </>
  );

  return href ? (
    <Link href={href} className="flex-center gap-1">
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
};

export default Metric;
