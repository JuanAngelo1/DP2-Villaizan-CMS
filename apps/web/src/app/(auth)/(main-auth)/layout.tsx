"use server";

import { auth } from "@web/auth";
import { redirect } from "next/navigation";

async function MainAuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = session?.user;

  if (user && (user.db_info.vi_persona?.sexo === null || user.db_info.vi_persona?.edad === null)) {
    redirect("/ultimo-paso");
  }
  
  return <>{children}</>;
}
export default MainAuthLayout;
