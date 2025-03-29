import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by useSession, getSession and received as a prop in getServerSideProps
   */
  interface Session {
    user: {
      /** The user's id */
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
} 