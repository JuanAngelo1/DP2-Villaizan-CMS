"use client";

import { LayoutDashboard, LogOut, MapPin, Newspaper, Sun, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { handleSignOut } from "../../actions/authActions";

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
  {
    path: "/admin/puntos-venta",
    icon: MapPin,
  },
];

function Sidebar() {
  const pathname = usePathname();
  const buttonStyle = [buttonVariants({ variant: "ghost" }), "w-10 h-10 hover:bg-red-900"];

  return (
    <div className="fixed flex w-full items-center justify-between border bg-red-700 px-2 py-2 lg:h-screen lg:w-[67px] lg:flex-col lg:rounded-br-xl lg:rounded-tr-xl lg:py-3">
      <div className="flex items-center gap-4 lg:flex-col">
        <img src={"VillaizanLogoV.png"} alt="Logo" className="w-[35px]" />
        <div className="flex items-center gap-1 lg:flex-col">
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

      <div className="flex items-center gap-1 lg:flex-col">
        <Button variant="ghost" className={buttonStyle[1]}>
          <Sun className={iconStyle} />
        </Button>
        <Button variant={"ghost"} className={buttonStyle[1]} onClick={handleSignOut}>
          <LogOut className={iconStyle} />
        </Button>
      </div>
    </div>
  );
}
export default Sidebar;
