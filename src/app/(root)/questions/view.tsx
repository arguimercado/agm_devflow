"use client";
import React, { useCallback, useEffect } from "react";

import { toast } from "@/hooks/use-toast";
import { incrementView } from "@/lib/actions/question.action";

const View = ({ questionId }: { questionId: string }) => {
  const handleIncrement = useCallback(async () => {
    const result = await incrementView({ questionId });

    if (result.success) {
      toast({
        title: "Success",
        description: "Views incremented",
      });
    } else {
      toast({
        title: "Error",
        description: result?.error?.message,
        variant: "destructive",
      });
    }
  }, [questionId]);

  useEffect(() => {
    console.log("incremented");
  }, []);

  return null;
};

export default View;
