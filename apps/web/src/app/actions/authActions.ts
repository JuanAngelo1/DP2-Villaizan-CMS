"use client";

import { signIn, signOut } from "next-auth/react";
import { AuthError } from "next-auth";

export async function handleCredentialsSignIn({ email, password }: { email: string; password: string }) {
  try {
    await signIn("credentials", { email, password, redirect: true, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
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
  await signOut();
}
