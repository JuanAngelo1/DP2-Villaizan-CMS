import Sidebar from "./_components/sidebar";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      <div className="ml-[67px] p-[32px] h-screen bg-primary-foreground">{children}</div>
    </div>
  );
}
export default AdminLayout;
