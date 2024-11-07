// /apps/web/src/admin/contenido/_components/PublicacionesListView.tsx
import usePagination from "@web/hooks/usePagination";
import usePublicaciones from "@web/src/app/services/api/publicaciones/hooks/usePublicaciones";
import { Publicacion } from "@web/types";
import { formatDate } from "@web/utils/date";
import { Ellipsis, Plus } from "lucide-react";
import React from "react";
import { Button } from "@repo/ui/components/button";
import { buttonVariants } from "@repo/ui/components/button";
import { CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Skeleton } from "@repo/ui/components/skeleton";
import { cn } from "@repo/ui/lib/utils";
import ContentFooter from "../general_components/ContentFooter";
import MainContent from "../general_components/MainContent";
import TopHeader from "../general_components/TopHeader";
import PublicacionItem from "../../publicaciones/_components/PublicacionItem";

interface PublicacionesListViewProps {
  changeType: (type: string | null, id?: string | null) => void;
}

const PublicacionesListView: React.FC<PublicacionesListViewProps> = ({ changeType }) => {
  const { publicaciones, isLoading, error } = usePublicaciones();
  const {
    page,
    entriesPerPage,
    setEntriesPerPage,
    currentPageItems,
    allFilteredItems,
    indexOfFirstItemOfCurrentPage,
    indexOfLastItemOfCurrentPage,
    totalPages,
    prevPage,
    nextPage,
  } = usePagination<Publicacion>({ items: publicaciones, startingEntriesPerPage: 10 });

  return (
    <>
      <TopHeader>
        <Input placeholder="Buscar..." className="flex-1 lg:w-fit" />
        <Button className="w-10 gap-2 sm:w-auto" onClick={() => changeType("create")}>
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
                onChange={(e) => setEntriesPerPage(e.target.value)}
              />
              <p className="">por página</p>
            </div>
          </CardHeader>
        }
      >
        <section className="h-full space-y-2 overflow-y-auto">
          {isLoading ? (
            // Renderiza skeletons mientras se cargan las publicaciones
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center rounded-md border px-4 py-3 text-sm">
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
              </div>
            ))
          ) : publicaciones.length > 0 ? (
            // Renderiza la lista de publicaciones
            publicaciones.map((publicacion) => (
              <PublicacionItem
                key={publicacion.id}
                publicacion={publicacion}
                onEdit={() => changeType("edit", publicacion.id)}
              />
            ))
          ) : (
            // Renderiza el mensaje cuando no hay publicaciones
            <CardDescription className="flex h-full items-center justify-center">
              No se han encontrado publicaciones.
            </CardDescription>
          )}
        </section>
        <ContentFooter
          page={page}
          totalPages={totalPages}
          allFilteredItems={allFilteredItems}
          indexOfFirstItemOfCurrentPage={indexOfFirstItemOfCurrentPage}
          indexOfLastItemOfCurrentPage={indexOfLastItemOfCurrentPage}
          prevPage={prevPage}
          nextPage={nextPage}
          itemName="categorías"
        />
      </MainContent>
    </>
  );
};

export default PublicacionesListView;
