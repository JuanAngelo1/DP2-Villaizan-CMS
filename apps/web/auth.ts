import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        console.log("See the credentials: ", credentials);
        let user = {
          name: "John Doe",
          email: "ascascscs",
        };

        try {
          type AuthResponseType = {
            message: string;
            statusCode: number;
          };

          const response: AuthResponseType = await axios.post("http://localhost:5000/auth", {
            email: "lalalla@asc.com",
            password: "asca",
          });

          console.log("See API response: ", response);

          if (response.statusCode !== 200) {
            console.log("Invalid credentials");
            return null;
          }

          return user;
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
