"use client"

import { Suspense } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
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

type contentSections = "publicaciones" | "comentarios" | "categorias" | "etiquetas";

type contentSidebarItem = {
  label: string;
  param: string;
};

const contentSidebarItems: contentSidebarItem[] = [
  {
    label: "Publicaciones",
    param: "publicaciones",
  },
  {
    label: "Categorías",
    param: "categorias",
  },
  {
    label: "Etiquetas",
    param: "etiquetas",
  },
  {
    label: "Comentarios",
    param: "comentarios",
  },
];


function ContentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentContent = pathname.split('/').pop();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
                    currentContent === item.param ? "bg-secondary text-primary-background" : ""
                  )}
                  href={`/admin/contenido/${item.param}`}
                >
                  <div className="flex w-full flex-row items-center justify-between">
                    {item.label}
                    {currentContent === item.param && <ChevronRight className="h-4 w-4" />}
                  </div>
                </Link>
              );
            })}
          </ul>
        </section>

        <div className="flex items-center gap-2 px-1 lg:hidden">
          <h1 className="text-2xl font-bold">Contenido</h1>
          <ChevronRight className="h-4 w-4" />
          <h1 className="text-2xl font-bold">
            {contentSidebarItems.find((item) => item.param === currentContent)?.label}
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
                      currentContent === item.param ? "bg-secondary text-primary-background" : ""
                    )}
                    href={`/admin/contenido/${item.param}`}
                    onClick={() => setIsPopoverOpen(false)}
                  >
                    <div className="flex w-full flex-row items-center justify-between">
                      {item.label}
                      {currentContent === item.param && <ChevronRight className="h-4 w-4" />}
                    </div>
                  </Link>
                );
              })}
            </PopoverContent>
          </Popover>
        </div>

        {children}
      </main>
    </div>
  );
}

export default ContentLayout;
