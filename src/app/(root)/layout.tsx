import React from "react";

import Navbar from "@/app/(root)/_components/navigation/navbar";
import { auth } from "@/auth";

import LeftSidebar from "./_components/navigation/navbar/sidebar/LeftSidebar";
import RightSidebar from "./_components/navigation/navbar/sidebar/RightSidebar";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen w-full flex-col px-6 pb-6 pt-36 max-md:px-14 sm:px-4">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </div>
  );
};

export default RootLayout;
