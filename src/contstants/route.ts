const ROUTES = {
  HOME: "/",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
  QUESTION: (id: string) => `/questions/${id}`,
  ASK_QUESTION: "/ask-question",
  PROFILE: (username: string) => `/profile/${username}`,
  TAGS: (id: string) => `/tags/${id}`,
};

export default ROUTES;
