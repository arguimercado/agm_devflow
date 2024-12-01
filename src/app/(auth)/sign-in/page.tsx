"use client";
import React from "react";

import AuthForm from "@/components/forms/AuthForm";
import { SignInWithCredentials } from "@/lib/actions/auth.action";
import { SignInSchema } from "@/lib/validation";

const SignIn = () => {
  return (
    <AuthForm
      formType="SIGN_IN"
      schema={SignInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={SignInWithCredentials}
    />
  );
};

export default SignIn;
