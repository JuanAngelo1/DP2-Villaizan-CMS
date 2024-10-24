import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb";
import { Input } from "@repo/ui/components/input";
import { Separator } from "@repo/ui/components/separator";
import SectionWrapper from "../contenido/_components/general_components/SectionWrapper";
import TopHeader from "../contenido/_components/general_components/TopHeader";
import Usuarios from "../contenido/_components/usuarios";

function Page() {
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
            <BreadcrumbPage>Usuarios</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <main className="flex h-full flex-col gap-2 overflow-y-hidden lg:flex-row lg:gap-6">
        <Usuarios />
      </main>
    </div>
  );
}
export default Page;
