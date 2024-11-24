import {NextResponse} from "next/server";

interface TagProps {
  _id: string;
  name: string;
}

interface AuthorProps {
  _id: string;
  name: string;
  image?: string;
}

export declare interface QuestionProps {
  _id: string;
  title: string;
  description: string;
  tags: TagProps[];
  author: AuthorProps;
  createdAt: Date;
  upvotes: number;
  answers: number;
  views: number;
}


type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  },
  statusCode?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & {success: true; }

type ErrorResponse = ActionResponse<T> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T>> | ErrorResponse;
