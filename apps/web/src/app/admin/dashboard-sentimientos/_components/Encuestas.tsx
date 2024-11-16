import usePagination from "@web/hooks/usePagination";
import { ControlledError, Encuesta, Response, ResponseModuloRedes } from "@web/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { buttonVariants } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Skeleton } from "@repo/ui/components/skeleton";
import { toast } from "@repo/ui/hooks/use-toast";
import { cn } from "@repo/ui/lib/utils";
import ContentFooter from "../../contenido/_components/general_components/ContentFooter";
import DialogDelete from "../../contenido/_components/general_components/DialogDelete";
import MainContent from "../../contenido/_components/general_components/MainContent";
import SectionWrapper from "../../contenido/_components/general_components/SectionWrapper";
import TopHeader from "../../contenido/_components/general_components/TopHeader";
import EncuestaTableRow from "./encuestas_components/EncuestaTableRow";
import EncuestasTableHeader from "./encuestas_components/EncuestasTableHeader";

const initEncuesta: Encuesta = {
  id: 0,
  title: "",
  description: "",
  status: "",
  start_date: new Date(),
  end_date: new Date(),
};

function Encuestas() {
  const [isLoading, setIsLoading] = useState(true);
  const [encuestas, setEncuestas] = useState<Encuesta[]>([]);
  const [currentEncuesta, setCurrentEncuesta] = useState<Encuesta>(initEncuesta);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState<boolean>(false);
  const [delEncuesta, setDelEncuesta] = useState<Encuesta | null>(null);
  const [search, setSearch] = useState<string>("");

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        console.log(`${process.env.NEXT_PUBLIC_REDES_SOCIALES_SERVER_URL}/encuestas/listar`);
        const response: ResponseModuloRedes<Encuesta[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_REDES_SOCIALES_SERVER_URL}/encuestas/listar`
        );
        if (response.status !== 200)
          throw new ControlledError("Error en la llamada a la api del módulo de redes sociales");

        setEncuestas(response.data);
      } catch (error) {
        if (error instanceof ControlledError) {
          toast({ title: "Error al obtener las encuestas", description: error.message });
        } else {
          console.error("Error al obtener las encuestas", error);
          toast({ title: "Ups! Algo salió mal.", description: "Error al obtener las encuestas" });
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const openEditSheet = useCallback((encuesta: Encuesta) => {
    setCurrentEncuesta(encuesta);
    setIsEditSheetOpen(true);
  }, []);

  const deleteEncuesta = async (encuesta: Encuesta | null) => {
    if (!encuesta) return;
    try {
      const response: ResponseModuloRedes<Encuesta> = await axios.delete(
        `${process.env.NEXT_PUBLIC_REDES_SOCIALES_SERVER_URL}/encuestas/eliminar/${encuesta.id}`
      );
      if (response.status !== 200)
        throw new ControlledError("Error en la llamada a la api del módulo de redes sociales");

      const newEncuestas = encuestas.filter((_encuesta) => _encuesta.id !== encuesta.id);
      setEncuestas(newEncuestas);

      setDelEncuesta(null);
      toast({ title: "Encuesta eliminada", description: "La encuesta ha sido eliminada exitosamente" });
    } catch (error) {
      if (error instanceof ControlledError) {
        toast({ title: "Error al eliminar la encuesta", description: error.message });
      } else {
        console.error("Error al eliminar la encuesta", error);
        toast({ title: "Ups! Algo salió mal.", description: "Error al eliminar la encuesta" });
      }
    }
  };

  const filteredEncuestas = useMemo(() => {
    return encuestas.filter((encuesta) => encuesta.title?.toLowerCase().includes(search.toLowerCase()));
  }, [encuestas, search]);

  const {
    page,
    entriesPerPage,
    setEntriesPerPage,
    currentPageItems,
    totalPages,
    prevPage,
    nextPage,
    allFilteredItems,
    indexOfFirstItemOfCurrentPage,
    indexOfLastItemOfCurrentPage,
  } = usePagination<Encuesta>({
    items: filteredEncuestas,
    startingEntriesPerPage: 10,
  });
  return (
    <>
      <SectionWrapper>
        <TopHeader>
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 lg:w-fit"
          />
          <div className={cn(buttonVariants({ variant: "outline" }), "hover:bg-background gap-2")}>
            <p>Mostrando</p>
            <Input
              className="h-[30px] w-[40px] px-0 text-center"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(e.target.value)}
            />
            <p>por página</p>
          </div>
        </TopHeader>

        <MainContent title="Encuestas" description="Administra las encuestas del sistema">
          <EncuestasTableHeader />
          {isLoading ? (
            <section className="flex items-center gap-3 rounded-md border px-4 py-3 pr-8">
              <div className="hidden flex-1 lg:block">
                <Skeleton className="max-w-[200px] flex-1 rounded-3xl py-1 text-base font-normal text-transparent">
                  .
                </Skeleton>
              </div>
              <div className="flex-1">
                <Skeleton className="max-w-[200px] flex-1 rounded-3xl py-1 text-xs font-normal text-transparent md:text-base">
                  .
                </Skeleton>
              </div>
              <div className="flex-1">
                <Skeleton className="w-[180px] flex-1 rounded-3xl py-1 text-xs font-normal text-transparent md:text-base">
                  .
                </Skeleton>
              </div>

              <div className="h-[10px] w-6 shrink-0" />
            </section>
          ) : (
            <>
              <section className="h-full space-y-2 overflow-y-scroll">
                {currentPageItems.map((encuesta) => (
                  <EncuestaTableRow
                    key={encuesta.id}
                    encuesta={encuesta}
                    openEditSheet={openEditSheet}
                    setDelEncuesta={setDelEncuesta}
                    setDeleteModalOpen={setDeleteModalOpen}
                    onEdit={() => router.push(`/admin/dashboard-sentimientos/encuestas/${encuesta.id}`)}
                  />
                ))}
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
            </>
          )}
        </MainContent>

        <DialogDelete
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onAction={() => deleteEncuesta(delEncuesta)}
          title="¿Estás absolutamente seguro?"
          description="Esta acción no se puede deshacer. Esto eliminará la encuesta permanentemente."
        />
      </SectionWrapper>
    </>
  );
}

export default Encuestas;
