import { Input } from "@repo/ui/components/input";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TopHeader from "../general_components/TopHeader";
import ViewAllComentarios from "./ViewAllComentarios";
import ViewPerPostComentarios from "./ViewPerPostComentarios";

type ViewMode = "all" | "post";

function ComentariosListView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prev_view = searchParams.get("view");
  const view = prev_view === null || !["all", "post"].includes(prev_view) ? "all" : prev_view;
  const [searchValue, setSearchValues] = useState<string>("");

  useEffect(() => {
    setSearchValues("");
  }, [view]);

  return (
    <>
      <TopHeader>
        <Input
          placeholder="Buscar..."
          className="flex-1 lg:w-fit"
          value={searchValue}
          onChange={(e) => setSearchValues(e.target.value)}
        />
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

      {view === "all" ? (
        <ViewAllComentarios searchValue={searchValue} />
      ) : (
        <ViewPerPostComentarios searchValue={searchValue} />
      )}
    </>
  );
}

export default ComentariosListView;
