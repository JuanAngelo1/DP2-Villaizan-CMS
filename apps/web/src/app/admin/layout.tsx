import Sidebar from "./_components/sidebar";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      <div className="ml-[67px] p-5">{children}</div>
    </div>
  );
}
export default AdminLayout;
