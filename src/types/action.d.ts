export interface SignInWithOAuthParams {
  provider: "github" | "google";
  providerAccountId: string;
  user: {
    email: string;
    image: string;
    name: string;
    username: string;
  };
}

export interface AuthCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
}
