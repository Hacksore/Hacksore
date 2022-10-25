import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const { GITHUB_CLIENT_ID = "", GITHUB_CLIENT_SECRET = "" } = process.env;

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
        expires: session.expires,
      };
    },
  },
};
export default NextAuth(authOptions);
