import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

type GithubAuth = {
  clientId: string;
  clientSecret: string;
  scope: string;
};

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    } as GithubAuth),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
}
export default NextAuth(authOptions);