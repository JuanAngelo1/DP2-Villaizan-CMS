import axios, { Axios } from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        console.log("See the credentials: ", credentials);

        try {
          const response = await axios.post("http://localhost:5000/auth", {
            email: "dibujitos@gmail.com",
            password: "password123",
          });

          const data = response.data;
          console.log("See API response: ", data);

          if (data.statusCode !== 200) {
            console.log("Invalid credentials");
            return null;
          }

          return data.user;
        } catch (error) {
          console.log("See the error: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      if (pathname.startsWith("/login") && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return !!auth;
    },
  },
  //   pages: {
  //     signIn: "/login",
  //   },
});
