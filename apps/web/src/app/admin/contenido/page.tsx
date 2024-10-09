"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { Separator } from "@repo/ui/components/separator";
import { cn } from "@repo/ui/lib/utils";
import Categorias from "./_components/categorias";
import Comentarios from "./_components/comentarios";
import Etiquetas from "./_components/etiquetas";
import Publicaciones from "./_components/publicaciones";

type contentSections = "publicaciones" | "comentarios" | "categorias" | "etiquetas";

type contentSidebarItem = {
  label: string;
  href: string;
  hash: string;
};

const contentSidebarItems: contentSidebarItem[] = [
  {
    label: "Publicaciones",
    href: "/admin/contenido#publicaciones",
    hash: "publicaciones",
  },
  {
    label: "Categorías",
    href: "/admin/contenido#categorias",
    hash: "categorias",
  },
  {
    label: "Etiquetas",
    href: "/admin/contenido#etiquetas",
    hash: "etiquetas",
  },
  {
    label: "Comentarios",
    href: "/admin/contenido#comentarios",
    hash: "comentarios",
  },
];

function Page() {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState<contentSections>("publicaciones");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    const currentHash = window.location.href.split("#")[1];
    console.log("See current hash -> ", currentHash);
    if (currentHash === undefined) return;
    if (!["publicaciones", "comentarios", "categorias", "etiquetas"].includes(currentHash as string)) {
      router.push("/admin/contenido#publicaciones");
    }
    setSelectedSection(currentHash as contentSections);
  }, []);

  return (
    <div className="bg-primary-foreground flex h-full min-h-[600px] w-full flex-1 flex-col gap-2 p-6 lg:gap-[24px] lg:p-[32px]">
      <Breadcrumb className="px-1 lg:px-0">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Gestión de contenido</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Contenido</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <main className="flex h-full flex-col gap-2 overflow-y-hidden lg:flex-row lg:gap-6">
        <section className="hidden w-[185px] gap-4 lg:flex lg:flex-col">
          <h1 className="text-2xl font-bold">Contenido</h1>
          <Separator orientation="horizontal" />

          <ul className="flex flex-col gap-2">
            {contentSidebarItems.map((item, index) => {
              return (
                <Link
                  key={index}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start",
                    selectedSection === item.hash ? "bg-secondary text-primary-background" : ""
                  )}
                  href={item.href}
                  onClick={() => setSelectedSection(item.hash as contentSections)}
                >
                  <div className="flex w-full flex-row justify-between items-center">
                    {item.label}
                    {selectedSection === item.hash && <ChevronRight className="h-4 w-4" />}
                  </div>
                </Link>
              );
            })}
          </ul>
        </section>

        <div className="flex items-center gap-2 lg:hidden px-1">
          <h1 className="text-2xl font-bold">Contenido</h1>
          <ChevronRight className="h-4 w-4" />
          <h1 className="text-2xl font-bold">
            {contentSidebarItems.find((item) => item.hash === selectedSection)?.label}
          </h1>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant={"outline"} className="h-8 w-8">
                <ChevronDown className="h-5 w-5 shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="end" className="w-[190px]">
              {contentSidebarItems.map((item, index) => {
                return (
                  <Link
                    key={index}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-start",
                      selectedSection === item.hash ? "bg-secondary text-primary-background" : ""
                    )}
                    href={item.href}
                    onClick={() => {
                      setIsPopoverOpen(false);
                      setTimeout(() => {
                        setSelectedSection(item.hash as contentSections);
                      }, 100);
                    }}
                  >
                    <div className="flex w-full flex-row justify-between items-center">
                      {item.label}
                      {selectedSection === item.hash && <ChevronRight className="h-4 w-4" />}
                    </div>
                  </Link>
                );
              })}
            </PopoverContent>
          </Popover>
        </div>

        {selectedSection === "publicaciones" && <Publicaciones />}
        {selectedSection === "categorias" && <Categorias />}
        {selectedSection === "etiquetas" && <Etiquetas />}
        {selectedSection === "comentarios" && <Comentarios />}
      </main>
    </div>
  );
}
export default Page;
