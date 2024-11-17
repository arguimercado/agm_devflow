"use client";
import { url } from "inspector";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import ROUTES from "@/contstants/route";

import NavLinks from "../NavLinks";

const menu = [
  {
    title: "Home",
    url: "/",
    icon: "/icons/home.svg",
  },
  {
    title: "Community",
    url: "/community",
    icon: "/icons/users.svg",
  },
];

const LeftSidebar = () => {
  const selectedPath = usePathname();

  return (
    <section className="background-light900_dark200 custom-scrollbar">
      <div className="light-border sticky left-0 top-0 flex h-screen flex-1 flex-col justify-between gap-6 overflow-y-auto border-r p-6 pt-36 shadow-light-400 dark:shadow-none max-sm:hidden lg:w-[266px]">
        <div className="flex flex-1 flex-col gap-6">
          <NavLinks isMobileNav={false} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <Button
              className="small-medium btn-secondary text-dark400_light900  
              flex min-h-[41px] w-full items-center gap-2 rounded-lg px-4 py-3 shadow-none"
              asChild
            >
              <Link href={ROUTES.SIGNIN} className="flex items-center gap-2">
                <Image
                  src="/icons/account.svg"
                  alt="account"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="primary-text-gradient max-lg:hidden">
                  Sign In
                </span>
              </Link>
            </Button>
            <Button
              className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg shadow-none"
              asChild
            >
              <Link href={ROUTES.SIGNUP} className="flex items-center gap-2">
                <Image
                  src="/icons/sign-up.svg"
                  alt="signup"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="max-lg:hidden">Sign Up</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeftSidebar;
