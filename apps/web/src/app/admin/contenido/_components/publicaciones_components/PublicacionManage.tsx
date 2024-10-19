// PublicacionManage.tsx
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { cn } from "@repo/ui/lib/utils";
import { Input } from "@repo/ui/components/input";
import { buttonVariants } from "@repo/ui/components/button";
import MainContent from "../general_components/MainContent";
import { CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";

interface PublicationManageProps {
  type: "create" | "edit";
  id?: string | null;
  changeType?: (type: string | null) => void;
}

function PublicacionManage({ type, id, changeType }: PublicationManageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if(type === "edit" && !id && changeType) {
      changeType("list");
    }
  }, [type, id, changeType]);

  return (
    <MainContent
      title={"[Titulo de publicacion]"}
    >
      <Separator />
      <section className="flex flex-row h-full gap-4 py-4 overflow-y-auto">
        <div className="flex-[4]"><p>infomation</p></div>
        <Separator orientation="vertical" />
        <div className="flex-[2]"></div>
      </section>
    </MainContent>
  );
}

export default PublicacionManage;