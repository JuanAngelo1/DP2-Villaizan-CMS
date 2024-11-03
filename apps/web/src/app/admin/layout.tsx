import { auth } from "@web/auth";
import Sidebar from "./_components/sidebar";
import { redirect } from "next/navigation";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/login?callbackUrl=/admin");
  }

  //! If user doesnt have admin role, redirect to home

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-primary-foreground">
      <Sidebar />
      <div className="pt-[57px] flex w-full flex-1 h-full lg:ml-[67px] lg:pt-0">{children}</div>
    </div>
  );
}
export default AdminLayout;
