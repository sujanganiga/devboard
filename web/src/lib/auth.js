import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.githubUsername = profile.login;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.githubUsername = token.githubUsername;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};