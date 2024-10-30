import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/contstants/route";

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className=" size-4 text-black dark:text-white sm:hidden" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href={ROUTES.HOME} className="flex items-center gap-1">
          <Image
            src="/images/site-logo.svg"
            alt="dev logo"
            width={23}
            height={23}
          />
          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
            Dev <span className="text-primary-500">Flow</span>
          </p>
        </Link>
        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-6 pt-16">
              <p>Nav Links</p>
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3">
            <SheetClose asChild>
              <Link href={ROUTES.SIGNIN}>
                <Button className="small-medium btn-secondary text-dark400_light900  min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Sign In</span>
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={ROUTES.SIGNIN}>
                <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg shadow-none">
                  <span>Sign Up</span>
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
