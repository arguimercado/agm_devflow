const ROUTES = {
  HOME: "/",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
  ASK_QUESTION: "/ask-question",
  PROFILE: (username: string) => `/profile/${username}`,
  TAGS: (id: string) => `/tags/${id}`,
};

export default ROUTES;
