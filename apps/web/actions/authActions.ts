"use client";

import { AuthError } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export async function handleCredentialsSignIn({
  email,
  password,
  redirectTo,
}: {
  email: string;
  password: string;
  redirectTo?: string | null;
}) {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: true,
    redirectTo: redirectTo || "/",
  });

  // return result;

  // if (result?.error === "CredentialsSignin") {
  //   return {
  //     error: result.code,
  //   };
  // }

  // console.log("Redireccionando a -> ", redirectTo);
  // window.location.replace(redirectTo || "/");
  // return {
  //   success: "Inicio de sesión exitoso.",
  // };
}

export async function handleGoogleSignIn({ redirectTo }: { redirectTo?: string | null }) {
  try {
    const result = await signIn(
      "google",
      {
        redirect: true,
        redirectTo: redirectTo || "/",
      },
      { prompt: "login" }
    );

    // console.log("Resultado desde el cliente -> ", result);
    // window.location.replace(redirectTo || "/");
    // console.log(result)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        default:
          return {
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}
