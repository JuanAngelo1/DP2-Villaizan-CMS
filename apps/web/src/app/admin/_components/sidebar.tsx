"use client"
import { LayoutDashboard, LogOut, Newspaper, Sun, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

type sidebarItem = {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
};

const iconStyle = "shrink-0 w-[19px] h-[19px] stroke-white";
const sidebarItems: sidebarItem[] = [
  {
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    path: "/admin/contenido",
    icon: Newspaper,
  },
  {
    path: "/admin/usuarios",
    icon: User,
  },
];

function Sidebar() {
  const pathname = usePathname();
  const buttonStyle = [buttonVariants({ variant: "ghost" }), "w-10 h-10 hover:bg-red-900"];

  return (
    <div className="h-screen fixed flex flex-col items-center justify-between rounded-br-xl rounded-tr-xl border bg-red-700 py-4 w-[67px]">
      <div className="flex flex-col items-center">
        <img src={"VillaizanLogoV.png"} alt="Logo" className="mb-4 w-[35px]" />
        <div className="flex flex-col items-center gap-1">
          {sidebarItems.map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <Link
                key={idx}
                className={cn(buttonStyle, pathname === item.path ? "bg-red-800" : "")}
                href={item.path}
              >
                <ItemIcon className={iconStyle} />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <Button variant="ghost" className={buttonStyle[1]}>
          <Sun className={iconStyle} />
        </Button>
        <Button variant="ghost" className={buttonStyle[1]}>
          <LogOut className={iconStyle} />
        </Button>
      </div>
    </div>
  );
}
export default Sidebar;
