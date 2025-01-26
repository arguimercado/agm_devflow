const ROUTES = {
  HOME: "/",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
  QUESTION: (id: string) => `/questions/${id}`,
  ASK_QUESTION: "/ask-question",
  PROFILE: (username: string) => `/profile/${username}`,
  TAG: (id: string) => `/tags/${id}`,
  TAGS: "tags",
  JOBS: "/jobs",
  COMMUNITY: "/community",
  COLLECTION: "/collection",
};

export default ROUTES;
