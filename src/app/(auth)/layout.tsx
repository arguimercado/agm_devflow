import Image from "next/image";
import React from "react";

import SocialAuthForm from "@/components/forms/SocialAuthForm";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex  min-h-screen items-center justify-center bg-auth-light bg-cover bg-center bg-no-repeat px-4 py-10 dark:bg-auth-dark">
      <section className="light-border background-light800_dark200 shadow-light100_dark100 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8">
        <div className="flex-between gap-2">
          <div className="space-y-2.5">
            <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
              PhilDev <span className="text-primary-500">Stack</span>
            </p>
            <p className="paragraph-regular text-dark500_light400 ">
              Get your questions answered
            </p>
          </div>
          <Image
            src="images/site-logo.svg"
            alt="PhilDevStack Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
        {children}
        <SocialAuthForm />
      </section>
    </main>
  );
};

export default AuthLayout;
