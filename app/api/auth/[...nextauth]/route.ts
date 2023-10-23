import prisma from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
// import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: { avatar: true },
          });

          if (!user) return null;

          const match = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!match) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.avatar?.url,
            username: user.username,
            bio: user.bio,
          };
        } catch (error) {
          console.log(error, "error");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
  pages: {
    signIn: "/signin",
    newUser: "/signup",
  },
  // events: {
  //   signOut: async () => {

  //   }
  // }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
