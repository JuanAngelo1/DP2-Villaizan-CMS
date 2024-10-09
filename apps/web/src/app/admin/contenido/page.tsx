"use client";

import { ChevronRight } from "lucide-react";
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
import { buttonVariants } from "@repo/ui/components/button";
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

  useEffect(() => {
    const currentHash = window.location.href.split("#")[1];
    if (!["publicaciones", "comentarios", "categorias", "etiquetas"].includes(currentHash as string)) {
      router.push("/admin/contenido#publicaciones");
    }
    setSelectedSection(currentHash as contentSections);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col gap-[24px] p-[32px] min-h-[600px]">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Gestión de contenido</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Publicaciones</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <main className="flex h-full flex-row gap-6 overflow-y-hidden">
        <section className="flex w-[170px] flex-col gap-4">
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
                  <div className="flex w-full flex-row justify-between">
                    {item.label}
                    {selectedSection === item.hash && <ChevronRight className="h-4 w-4" />}
                  </div>
                </Link>
              );
            })}
          </ul>
        </section>
        {selectedSection === "publicaciones" && <Publicaciones />}
        {selectedSection === "categorias" && <Categorias />}
        {selectedSection === "etiquetas" && <Etiquetas />}
        {selectedSection === "comentarios" && <Comentarios />}
      </main>
    </div>
  );
}
export default Page;
