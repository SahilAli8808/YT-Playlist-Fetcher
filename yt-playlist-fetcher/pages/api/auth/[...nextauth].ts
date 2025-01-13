// [...nextauth].ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'openid profile email https://www.googleapis.com/auth/youtube.readonly', // Added YouTube scope
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Attach accessToken to JWT token
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    // Attach accessToken to the session
    async session({ session, token }) {
      session.accessToken = token.accessToken as string; // Ensure proper typing
      return session;
    },
  },
});
