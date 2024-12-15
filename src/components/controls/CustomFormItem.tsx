import React from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface IProps {
  label: string;
  field: any;
  placeholder: string;
  isRequired?: boolean;
  formDescription?: string;
  children?: (field: any) => React.ReactNode;
}

const CustomFormItem = ({
  label,
  field,
  placeholder,
  children,
  isRequired = false,
  formDescription,
}: IProps) => {
  return (
    <FormItem className="flex w-full flex-col">
      <FormLabel className="paragraph-medium text-dark400_light700">
        {label}{" "}
        <span className="text-primary-500">{isRequired ? "*" : ""}</span>
      </FormLabel>
      <FormControl>
        {children ? (
          children(field)
        ) : (
          <Input
            {...field}
            placeholder="Enter your question title"
            className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
          />
        )}
      </FormControl>
      {formDescription && (
        <FormDescription className="body-regular mt-2.5 text-light-500">
          Be specific and imagine you’re asking a question to another person
        </FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
};

export default CustomFormItem;
