import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user?: {
      email?: string | null;
      image?: string | null;
      name?: string | null;
    };
    expires: string;
  }
}