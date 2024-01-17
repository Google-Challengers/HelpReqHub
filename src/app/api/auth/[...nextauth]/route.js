import NextAuth from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { handleSignIn } from "@/lib/user/handleSignIn";

export const authOptions = {
  providers: [
    InstagramProvider({
      id: "instagram",
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
    FacebookProvider({
      id: "facebook",
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "user_credentials",
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Karan Yadav" },
        email: { label: "Email", type: "email", placeholder: "abc@xyz.ky" },
        contact: {
          label: "Contact Number",
          type: "number",
          placeholder: "1029384756",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "########",
        },
      },
      async authorize(credentials, req) {
        try {
          const res = await handleSignIn({
            name: credentials.name,
            email: credentials.email,
            contact: credentials.contact,
            password: credentials.password,
            image: undefined,
            method: "credentials",
          });

          if (res.success) {
            const user = res.userData;
            return user;
          } else {
            throw new Error(`Error`);
          }
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider == "user_credentials") {
        return true;
      }
      if (
        account?.provider == "instagram" ||
        account?.provider == "google" ||
        account?.provider == "facebook"
      ) {
        const res = await handleSignIn({
          username: user.name,
          email: user.email,
          contact: user.contact,
          password: "",
          image: user.image,
          method: "oauthprovider",
        });

        if (res?.success) {
          return true;
        } else {
          return false;
        }
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token, user }) {
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
