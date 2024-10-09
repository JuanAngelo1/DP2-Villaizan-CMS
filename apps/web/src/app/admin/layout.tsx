import Sidebar from "./_components/sidebar";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      <div className="ml-[67px] bg-primary-foreground flex">{children}</div>
    </div>
  );
}
export default AdminLayout;