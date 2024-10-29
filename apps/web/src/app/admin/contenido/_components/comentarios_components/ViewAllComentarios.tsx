import usePagination from "@web/hooks/usePagination";
import { Comentario, Response } from "@web/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { buttonVariants } from "@repo/ui/components/button";
import { CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Skeleton } from "@repo/ui/components/skeleton";
import { cn } from "@repo/ui/lib/utils";
import ContentFooter from "../general_components/ContentFooter";
import MainContent from "../general_components/MainContent";
import ComentarioCard from "./ComentarioCard";

function ViewAllComentarios({ searchValue }: { searchValue: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

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
  } = usePagination<Comentario>({
    items: comentarios,
    startingEntriesPerPage: 10,
    filters: [searchValue],
    filterFunction: (item: Comentario) => {
      return item.comentario.toLowerCase().includes(searchValue.toLowerCase());
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response: Response<Comentario[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/comentario/obtenerTodos`
        );
        if (response.data.status === "Error") throw new Error(response.data.message);

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
    <MainContent
      titleSlot={
        <CardHeader className="flex flex-row justify-between pb-4">
          <div className="flex flex-col items-start space-y-1.5">
            <CardTitle className="text-xl">Comentarios (Todos)</CardTitle>
            <CardDescription>
              Visualiza los comentarios realizados por los usuarios a través de las publicaciones de la
              plataforma.
            </CardDescription>
          </div>
          {/* <Button>Seleccionar</Button> */}
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
          : currentPageItems.map((comentario) => {
              return <ComentarioCard comentario={comentario} key={comentario.id} showPublicacionData />;
            })}
      </section>
      <ContentFooter
        page={page}
        totalPages={totalPages}
        allFilteredItems={allFilteredItems}
        indexOfFirstItemOfCurrentPage={indexOfFirstItemOfCurrentPage}
        indexOfLastItemOfCurrentPage={indexOfLastItemOfCurrentPage}
        prevPage={prevPage}
        nextPage={nextPage}
        itemName="comentarios"
      />
    </MainContent>
  );
}
export default ViewAllComentarios;
