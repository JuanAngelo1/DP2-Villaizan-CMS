import { Comentario, Response } from "@web/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@repo/ui/components/badge";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Skeleton } from "@repo/ui/components/skeleton";
import { cn } from "@repo/ui/lib/utils";
import MainContent from "../general_components/MainContent";
import TopHeader from "../general_components/TopHeader";
import ChipEstadoAprobacion from "./ChipEstadoAprobacion";

function ComentariosListView() {
  const [isLoading, setIsLoading] = useState(true);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response: Response<Comentario[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/comentario/obtenerTodos`
        );
        if (response.data.status === "Error") throw new Error(response.data.message);

        console.log("Mira los comentarios", response);
        setComentarios(response.data.result);
      } catch (error) {
        console.error("Ups! Algo salio mal -> ", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <TopHeader>
        <Input placeholder="Buscar..." className="flex-1 lg:w-fit" />
        <div className={cn(buttonVariants({ variant: "outline" }), "hover:bg-background gap-2")}>
          <p>Mostrando</p>
          <Input
            className="h-[30px] w-[40px] px-0 text-center"
            // value={entriesPerPage}
            onChange={(e) => {
              // if (e.target.value === "") {
              //   setEntriesPerPage(0);
              //   return;
              // }
              // if (isNaN(parseInt(e.target.value))) return;
              // if (parseInt(e.target.value) < 1 || parseInt(e.target.value) > 20) return;
              // setEntriesPerPage(parseInt(e.target.value));
            }}
          />
          <p className="">por página</p>
        </div>
        <Button
          className="w-10 gap-2 sm:w-auto"
          // onClick={openNewSheet}
        >
          <p className="hidden sm:block">Filtrar</p>
        </Button>
      </TopHeader>

      <MainContent
        title="Comentarios"
        description="Visualiza los comentarios realizados por los usuarios a través de las publicaciones de la plataforma."
      >
        {isLoading
          ? [1, 2, 3, 4].map((i) => {
              return (
                <section key={i} className="flex items-center rounded-md border px-4 py-3 text-sm">
                  <div className="flex-1">
                    <Skeleton className="w-[200px] rounded-3xl font-normal text-transparent">.</Skeleton>
                  </div>
                  <div className="flex-1">
                    <Skeleton className="w-[200px] rounded-3xl font-normal text-transparent">.</Skeleton>
                  </div>
                  <div className="flex-1">
                    <Skeleton className="w-[200px] rounded-3xl font-normal text-transparent">.</Skeleton>
                  </div>
                  <div className="flex-1">
                    <Skeleton className="w-[200px] rounded-3xl font-normal text-transparent">.</Skeleton>
                  </div>
                </section>
              );
            })
          : comentarios.map((comentario) => {
              return <ComentarioCard comentario={comentario} key={comentario.id} />;
            })}
      </MainContent>
    </>
  );
}

function ComentarioCard({ comentario }: { comentario: Comentario }) {
  const Cell = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex-1">{children}</div>;
  };

  return (
    <Link
      href={{
        query: { content: "comentarios", id: comentario.id },
      }}
      className="hover:bg-secondary flex cursor-pointer items-center rounded-md border px-4 py-3 text-sm transition-colors"
    >
      <Cell>{comentario.comentario}</Cell>
      <Cell>{comentario.publicacion.titulo}</Cell>
      <Cell>
        <ChipEstadoAprobacion comentario={comentario} />
      </Cell>
      <Cell>24 marzo, 2024 - 12:34</Cell>
    </Link>
  );
}

export default ComentariosListView;
