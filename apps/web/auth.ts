import axios, { Axios } from "axios";
import NextAuth, { AuthError, CredentialsSignin, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { Response, Usuario } from "./types";

class CustomError extends CredentialsSignin {
  code: string;

  constructor(code: string) {
    super();
    this.code = code;
    this.name = "CustomError";

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

function getCookieHostname() {
  const hostname = new URL(process.env.NEXT_PUBLIC_APP_URL!).hostname;
  const [subDomain] = hostname.split(".");

  const cookieDomain = hostname.replace(`${subDomain}.`, "");
  return cookieDomain;
}

const domain = getCookieHostname();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = credentials;

        try {
          const response: Response<Usuario> = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth`, {
            email: email,
            password: password,
          });

          const data = response.data;

          if (data.status !== "Success") {
            throw new CustomError(data.message);
          }

          return {
            db_info: data.result,
          };
        } catch (error) {
          if (error instanceof CustomError) {
            throw new CustomError(error.code);
          }
          console.log("See the error: ", error);
          return null;
        }
      },
    }),
    Google({}),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (user && account?.provider === "google") {
          const response: Response<Usuario> = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/usuario/loginGoogle`,
            {
              email: user.email,
              nombre: profile?.given_name || user.name || "",
              apellido: profile?.family_name || "",
              imagenperfil: profile?.picture || user.image || "",
            }
          );

          if (response.data.status !== "Success") {
            return `/login?error=SigninError&code=${response.data.message}`;
          }

          user.db_info = response.data.result;
        }

        return true;
      } catch (error) {
        console.log("See the error: ", error);
        return `/login?error=SigninError&code=Ups, algo salio mal. Intenta de nuevo.`;
      }
    },
    async jwt({ token, user }) {
      try {
        if (token) {
          token.sub = user?.db_info?.id || token.sub
          const user_id = token.sub;

          const response: Response<Usuario> = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/usuario/${user_id}`
          );

          if (response.data.status !== "Success") {
            console.log(`Error: ${response.data.message}`);
            return null;
          }

          token.db_info = response.data.result;
        }

        return token;
      } catch (error: any) {
        console.log("Error when fetching user data in JWT token: ", error.response);
        return null;
      }
    },
    async session({ token, session }) {
      //@ts-ignore
      session.user.id = token.db_info.id;
      //@ts-ignore
      session.user.email = token.db_info.email;
      //@ts-ignore
      session.user.name = token.db_info.nombre;
      //@ts-ignore
      session.user.db_info = token.db_info;

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/",
  },
  cookies: {
    sessionToken: {
      name: domain === "localhost" ? 'authjs.session-token' : `__Secure-next-auth.session-token`,
      options: {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        path: "/",
        domain,
      },
    },
    callbackUrl: {
      name: domain === "localhost" ? 'authjs.callback-url' : `__Secure-next-auth.callback-url`,
      options: {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        path: "/",
        domain,
      },
    },
    csrfToken: {
      name: domain === "localhost" ? 'authjs.csrf-token' : `next-auth.csrf-token`,
      options: {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        path: "/",
        domain,
      },
    },
  },
});
