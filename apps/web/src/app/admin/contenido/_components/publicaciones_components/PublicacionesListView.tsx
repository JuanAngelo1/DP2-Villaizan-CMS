// PublicacionesListView.tsx
import usePagination from "@web/hooks/usePagination";
import { Publicacion, Response } from "@web/types";
import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Skeleton } from "@repo/ui/components/skeleton";
import { cn } from "@repo/ui/lib/utils";
import ContentFooter from "../general_components/ContentFooter";
import MainContent from "../general_components/MainContent";
import TopHeader from "../general_components/TopHeader";

function PublicacionesListView() {
  const [isLoading, setIsLoading] = useState(true);
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const { page, entriesPerPage, setEntriesPerPage, currentPageItems, totalPages, prevPage, nextPage } =
    usePagination<Publicacion>({ items: publicaciones, startingEntriesPerPage: 10 });

  useEffect(() => {
    async function getPublicaciones() {
      try {
        setIsLoading(true);
        const response: Response<Publicacion[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/comentario/obtenerTodos`
        );
        if (response.data.status === "Error") throw new Error(response.data.message);

        setPublicaciones(response.data.result);
      } catch (error) {
        console.error("Error en la obtencion de listado de publicaciones: ", error);
      } finally {
        setIsLoading(false);
      }
    }

    getPublicaciones();
  }, []);

  return (
    <>
      <TopHeader>
        <Input placeholder="Buscar..." className="flex-1 lg:w-fit" />
        <Button className="w-10 gap-2 sm:w-auto">
          <Plus className="h-4 w-4 shrink-0" />
          <p className="hidden sm:block">Agregar</p>
        </Button>
      </TopHeader>
      <MainContent
        titleSlot={
          <CardHeader className="flex flex-row justify-between pb-4">
            <div className="flex flex-col items-start space-y-1.5">
              <CardTitle className="text-xl">Publicaciones</CardTitle>
              <CardDescription>
                Administra las noticias y blogs más recientes relacionados a la empresa, productos, eventos,
                etc.
              </CardDescription>
            </div>
            <div className={cn(buttonVariants({ variant: "outline" }), "hover:bg-background gap-2")}>
              <p>Mostrando</p>
              <Input
                className="h-[30px] w-[40px] px-0 text-center"
                value={entriesPerPage}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setEntriesPerPage(0);
                    return;
                  }
                  if (isNaN(parseInt(e.target.value))) return;
                  if (parseInt(e.target.value) < 1 || parseInt(e.target.value) > 20) return;
                  setEntriesPerPage(parseInt(e.target.value));
                }}
              />
              <p className="">por página</p>
            </div>
          </CardHeader>
        }
      >
        <section className="h-full space-y-2 overflow-y-auto">
          {isLoading
            ? [1, 2, 3, 4].map((i) => {
                return (
                  <section key={i} className="flex items-center rounded-md border px-4 py-3 text-sm">
                    <div className="flex-1">
                      <Skeleton className="w-[200px] rounded-3xl font-normal text-transparent">.</Skeleton>
                    </div>
                    <div className="flex flex-1">
                      <Skeleton className="mx-auto w-[200px] rounded-3xl font-normal text-transparent">
                        .
                      </Skeleton>
                    </div>
                    <div className="flex flex-1">
                      <Skeleton className="mx-auto w-[200px] rounded-3xl font-normal text-transparent">
                        .
                      </Skeleton>
                    </div>
                    <div className="flex flex-1">
                      <Skeleton className="ml-auto w-[200px] rounded-3xl font-normal text-transparent">
                        .
                      </Skeleton>
                    </div>
                  </section>
                );
              })
            : currentPageItems.map((publicacion) => {
                return <div></div>;
              })}
        </section>
        <ContentFooter
          page={page}
          entriesPerPage={entriesPerPage}
          totalPages={totalPages}
          items={publicaciones}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </MainContent>
    </>
  );
}

export default PublicacionesListView;
