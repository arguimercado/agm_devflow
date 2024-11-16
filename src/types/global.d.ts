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
