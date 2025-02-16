"use server";

import { getUserSession } from "@web/actions/userActions";
import { redirect } from "next/navigation";
import React from "react";
import LandingContent from "./_components/LandingContent";
import Header from "./_sections/Header";
import "./landing.css";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUserSession();

  if (user && (user.vi_persona.sexo === null || user.vi_persona.edad === null)) {
    redirect("/ultimo-paso");
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Header user={user}/>
      <LandingContent>{children}</LandingContent>
    </div>
  );
}
