import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
// import FacebookProvider from "next-auth/providers/facebook";
// import GoogleProvider from "next-auth/providers/google";

const {
  GITHUB_CLIENT_ID = "",
  GITHUB_CLIENT_SECRET = "",
  // FACEBOOK_CLIENT_ID = "",
  // FACEBOOK_CLIENT_SECRET = "",
  // GOOGLE_CLIENT_ID = "",
  // GOOGLE_CLIENT_SECRET = "",
} = process.env;

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    // FacebookProvider({
    //   clientId: FACEBOOK_CLIENT_ID,
    //   clientSecret: FACEBOOK_CLIENT_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: GOOGLE_CLIENT_ID,
    //   clientSecret: GOOGLE_CLIENT_SECRET,
    // }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.testing = "ok";

      return session;
    },
  },
};
export default NextAuth(authOptions);
