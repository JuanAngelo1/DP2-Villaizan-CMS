"use server";

// layout.tsx
import { auth } from "@web/auth";
import { redirect } from "next/navigation";
import React from "react";
import LandingContent from "./_components/LandingContent";
import Header from "./_sections/Header";
import "./landing.css";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = session?.user;

  if (user && (user.db_info.vi_persona?.sexo === null || user.db_info.vi_persona?.edad === null)) {
    redirect("/ultimo-paso");
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <LandingContent>{children}</LandingContent>
    </div>
  );
}
