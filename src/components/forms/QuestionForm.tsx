"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import React, { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AskQuestionSchema } from "@/lib/validation";

import TagCard from "../cards/TagCard";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/route";
import { ReloadIcon } from "@radix-ui/react-icons";
import { QuestionProps } from "@/types/global";
import CustomFormItem from "../controls/CustomFormItem";

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

interface IProps {
  question?: QuestionProps;
  isEdit?: boolean;
}

const QuestionForm = ({ question, isEdit = false }: IProps) => {
  const router = useRouter();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: question?.tags.map((tag) => tag.name) || [],
    },
  });

  const handleCreateQuestion = async (
    data: z.infer<typeof AskQuestionSchema>
  ) => {
    startTransition(async () => {
      if (isEdit && question) {
        const result = await editQuestion({
          questionId: question?._id,
          ...data,
        });

        if (result.success) {
          toast({
            title: "Success",
            description: "Question updated successfully",
          });
          if (result.data) router.push(ROUTES.QUESTION(result.data._id));
        } else {
          toast({
            title: "Error",
            description: result.error?.message || "Failed to create question",
            variant: "destructive",
          });
        }

        return;
      }

      const result = await createQuestion(data);

      if (result.success) {
        toast({
          title: "Success",
          description: "Question created successfully",
        });
        if (result.data) router.push(ROUTES.QUESTION(result.data._id));
      } else {
        toast({
          title: "Error",
          description: result.error?.message || "Failed to create question",
          variant: "destructive",
        });
      }
    });
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "maxLength",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "duplicate",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", newTags);

    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "Tags are required",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <CustomFormItem
              field={field}
              label="Question Title"
              placeholder="Enter your question title"
              isRequired
              formDescription="Be specific and imagine you’re asking a question to another person"
            />
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <CustomFormItem
              field={field}
              label="Detailed explanation of your problem"
              placeholder="Introduce the problem you're experiencing, how you're trying to solve it, and what you've tried so far"
              isRequired
              formDescription="Introduce the problem you're experiencing, how you're trying to solve it, and what you've tried so far"
            >
              {(field) => (
                <Editor
                  value={field.value}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
              )}
            </CustomFormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <CustomFormItem
              field={field}
              label="Tags"
              isRequired
              formDescription="Add up to 3 tags to describe what your question is about you need to press enter to add a tag"
              placeholder="Add Tags"
            >
              {(field) => (
                <div>
                  <Input
                    placeholder="Add Tags"
                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                      {field.value.map((tag: string) => (
                        <TagCard
                          key={tag}
                          _id={tag}
                          name={tag}
                          compact
                          remove
                          isButton
                          handleRemove={() => handleRemove(tag, field)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CustomFormItem>
          )}
        />

        <div className="mt-16 flex justify-end">
          <Button className="primary-gradient w-fit !text-light-900">
            {isPending ? (
              <>
                <ReloadIcon className="mr-2  size-4 animate-spin" />
                <span>Submitting</span>
              </>
            ) : (
              <>{isEdit ? "Edit" : "Ask A Question"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
