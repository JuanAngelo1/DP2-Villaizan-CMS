import Sidebar from "./_components/sidebar";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-primary-foreground">
      <Sidebar />
      <div className="pt-[57px] flex w-full flex-1 h-full lg:ml-[67px] lg:pt-0">{children}</div>
    </div>
  );
}
export default AdminLayout;
