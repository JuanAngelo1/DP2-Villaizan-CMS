"use server";

import { auth } from "@web/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = session?.user;

  console.log(user);

  if (user && user.db_info.vi_persona?.sexo !== null && user.db_info.vi_persona?.edad !== null) {
    redirect("/");
  }

  return (
    <Suspense>
      <div className="bg-primary-foreground">{children}</div>
    </Suspense>
  );
}
export default AuthLayout;
