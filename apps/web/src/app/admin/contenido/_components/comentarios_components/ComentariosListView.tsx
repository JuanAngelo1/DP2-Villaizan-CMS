import usePagination from "@web/hooks/usePagination";
import { Comentario, Response } from "@web/types";
import { formatDate } from "@web/utils/date";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Skeleton } from "@repo/ui/components/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import { cn } from "@repo/ui/lib/utils";
import ContentFooter from "../general_components/ContentFooter";
import MainContent from "../general_components/MainContent";
import TopHeader from "../general_components/TopHeader";
import ChipEstadoAprobacion from "./ChipEstadoAprobacion";
import ViewAllComentarios from "./ViewAllComentarios";
import ViewPerPostComentarios from "./ViewPerPostComentarios";

type ViewMode = "all" | "post";

function ComentariosListView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prev_view = searchParams.get("view");
  const view = prev_view === null || !["all", "post"].includes(prev_view) ? "all" : prev_view;

  return (
    <>
      <TopHeader>
        <Input placeholder="Buscar..." className="flex-1 lg:w-fit" />
        <Tabs value={view}>
          <TabsList>
            <Link
              href={{
                query: {
                  content: "comentarios",
                  view: "all",
                },
              }}
            >
              <TabsTrigger value="all">Ver todos</TabsTrigger>
            </Link>
            <Link
              href={{
                query: {
                  content: "comentarios",
                  view: "post",
                },
              }}
            >
              <TabsTrigger value="post">Por publicación</TabsTrigger>
            </Link>
          </TabsList>
        </Tabs>
      </TopHeader>

      {view === "all" ? <ViewAllComentarios /> : <ViewPerPostComentarios />}
    </>
  );
}

export default ComentariosListView;
