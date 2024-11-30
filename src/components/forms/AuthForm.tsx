"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/route";
import { toast } from "@/hooks/use-toast";
import { ConvertAuthLabel } from "@/lib/helper";
import { ActionResponse } from "@/types/global";

interface AuthFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues: T;
  formType: "SIGN_IN" | "SIGN_UP";
  onSubmit: (data: T) => Promise<ActionResponse>;
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;

    if (result?.success) {
      toast({
        title: "Success",
        description:
          formType === "SIGN_IN"
            ? "Signed In Successfully"
            : "Signed Up Successfully",
      });

      router.push(ROUTES.HOME);
    } else {
      toast({
        title: `Error ${result?.statusCode}`,
        description: result?.error?.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-10 space-y-6"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel className="paragraph-medium text-dark400_light700">
                  {ConvertAuthLabel(field.name)}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type={field.name === "password" ? "password" : "text"}
                    placeholder={`Enter  ${ConvertAuthLabel(field.name)}`}
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
          type="submit"
        >
          {form.formState.isSubmitting
            ? formType === "SIGN_IN"
              ? "Signing In"
              : "Signing Up"
            : buttonText}
        </Button>

        {formType === "SIGN_IN" ? (
          <p>
            Don&apos;t have an Account?{" "}
            <Link
              className="paragraph-semibold primary-text-gradient"
              href={ROUTES.SIGNUP}
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an Account?{" "}
            <Link
              className="paragraph-semibold primary-text-gradient"
              href={ROUTES.SIGNIN}
            >
              Sign In
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
