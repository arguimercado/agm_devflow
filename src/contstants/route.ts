const ROUTES = {
  HOME: "/",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
  PROFILE: (username: string) => `/profile/${username}`,
  TAGS: (id: string) => `/tags/${id}`,
};

export default ROUTES;
