"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

import { sidebarLinks } from "../../../../../constants";

const NavLinks = ({ isMobileNav = false }: { isMobileNav: boolean }) => {
  const currentPath = usePathname();
  const userId = 1;

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (currentPath.includes(item.route) && item.route.length > 1) ||
          currentPath === item.route;

        if (item.route === "/profile") {
          if (userId) item.route = `${item.route}/${userId}`;
          else return null;
        }

        const LinkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              "flex w-full items-center gap-4 bg-transparent p-3",
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900 "
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ "invert-colors": !isActive })}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        return LinkComponent;
      })}
    </>
  );
};

export default NavLinks;
