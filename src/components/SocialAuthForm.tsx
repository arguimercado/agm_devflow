import Image from "next/image";
import React from "react";

import { Button } from "./ui/button";

const SocialAuthForm = () => {
  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button
        variant={"theme"}
        className="body-medium min-h-12 flex-1 rounded-2 px-4 py-3"
      >
        <Image
          src="/icons/github.svg"
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with Github</span>
      </Button>
      <Button
        variant={"theme"}
        className="body-medium min-h-12 flex-1 rounded-2 px-4 py-3"
      >
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
          className=" mr-2.5 object-contain"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
