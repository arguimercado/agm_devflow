import {QuestionProps} from "@/types/global";

export const questions: QuestionProps[] = [
    {
        _id: "1",
        title: "How to learn React?",
        description: "I want to learn React, can anyone help me?",
        tags: [{ _id: "1", name: "React" }],
        author: {
            _id: "1",
            name: "John Doe",
            image:
                "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
        },
        upvotes: 10,
        answers: 5,
        views: 100,
        createdAt: new Date("2021-09-01"),
    },
    {
        _id: "2",
        title: "How to learn JavaScript?",
        description: "I want to learn JavaScript, can anyone help me?",
        tags: [{ _id: "2", name: "JavaScript" }],
        author: {
            _id: "1",
            name: "John Doe",
            image:
                "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
        },
        upvotes: 10,
        answers: 5,
        views: 100,
        createdAt: new Date("2023-09-01"),
    },
];
