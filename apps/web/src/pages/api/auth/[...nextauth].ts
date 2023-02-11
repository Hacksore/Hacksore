import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

const {
  GITHUB_CLIENT_ID = "",
  GITHUB_CLIENT_SECRET = "",
  FACEBOOK_CLIENT_ID = "",
  FACEBOOK_CLIENT_SECRET = "",
  GOOGLE_CLIENT_ID = "",
  GOOGLE_CLIENT_SECRET = "",
} = process.env;

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      const sessionData = {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
        expires: session.expires,
      };

      return sessionData;
    },
  },
};
export default NextAuth(authOptions);
