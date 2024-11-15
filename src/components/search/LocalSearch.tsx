"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { Input } from "../ui/input";

interface SearchProps {
  icon: string;
  placeholder: string;
  baseClassName: string;
  route: string;
}

const LocalSearch = ({
  icon,
  placeholder,
  baseClassName,
  route,
}: SearchProps) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] w-full grow items-center gap-4 rounded-[10px] px-4 ${baseClassName}`}
    >
      <Image
        src={icon}
        alt="Search"
        width={20}
        height={20}
        className="cursor-pointer"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearch;
