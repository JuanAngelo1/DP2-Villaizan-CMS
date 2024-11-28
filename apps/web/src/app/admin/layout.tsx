import { auth } from "@web/auth";
import { redirect } from "next/navigation";
import Sidebar from "./_components/sidebar";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/login?callbackUrl=/admin");
  }

  if (user.db_info.vi_rol?.nombre !== "Administrador") {
    redirect("/");
  }

  if (user.db_info.vi_persona?.sexo === null || user.db_info.vi_persona?.edad === null) {
    redirect("/ultimo-paso");
  }
  
  return (
    <div className="bg-primary-foreground flex h-screen flex-col lg:flex-row">
      <Sidebar />
      <div className="flex h-full w-full flex-1 pt-[57px] lg:ml-[67px] lg:pt-0">{children}</div>
    </div>
  );
}
export default AdminLayout;
