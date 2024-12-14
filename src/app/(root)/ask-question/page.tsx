import React from "react";

import QuestionForm from "@/components/forms/QuestionForm";
import { auth } from "@/auth";

import ROUTES from "@/constants/route";
import { redirect } from "next/navigation";

const AskQuestion = async () => {
  const session = await auth();
  if (!session) return redirect(ROUTES.SIGNIN);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask Question</h1>
      <QuestionForm />
    </div>
  );
};

export default AskQuestion;
