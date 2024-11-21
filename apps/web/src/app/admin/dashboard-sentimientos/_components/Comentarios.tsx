import usePagination from "@web/hooks/usePagination";
import { Comentario, ControlledError, DateRange, Response, Sentimiento } from "@web/types";
import axios from "axios";
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
import ComentarioTableRow from "./comentarios_components/ComentarioTableRow";
import ComentariosFilters from "./comentarios_components/ComentariosFilters";
import ComentariosTableHeader from "./comentarios_components/ComentariosTableHeader";
import FechasFilters from "./comentarios_components/FechasFilters";
import SheetComentario from "./comentarios_components/SheetComentario";

const initComentario: Comentario = {
  id: 0,
  comentario: "",
  estadoaprobacion: true,
  fechacreacion: "",
  id_publicacion: 0,
  id_usuario: "",
  usuario: {
    id: "",
    nombre: "",
    apellido: "",
    correo: "",
    imagenperfil: "",
    id_rol: "",
    id_persona: "",
    creadoen: new Date(),
  },
  id_sentimiento: 0,
};

function Comentarios() {
  const [isLoading, setIsLoading] = useState(true);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [sentimientos, setSentimientos] = useState<Sentimiento[]>([]);
  const [currentComentario, setCurrentComentario] = useState<Comentario>(initComentario);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState<boolean>(false);
  const [delComentario, setDelComentario] = useState<Comentario | null>(null);

  const [search, setSearch] = useState<string>("");
  const [selectedSentimientos, setSelectedSentimientos] = useState<Sentimiento[]>([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(new Date().setDate(new Date().getDate() - 7)), // 7 días atrás
    end: new Date(),
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response: Response<Comentario[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/comentario`
        );
        if (response.data.status === "Error") throw new ControlledError(response.data.message);
        setComentarios(response.data.result);

        const responseSentimientos: Response<Sentimiento[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/sentimientos`
        );
        if (responseSentimientos.data.status === "Error") throw new Error(responseSentimientos.data.message);
        setSentimientos(responseSentimientos.data.result);
        setSelectedSentimientos(responseSentimientos.data.result);
      } catch (error) {
        if (error instanceof ControlledError) {
          toast({ title: "Error al obtener los comentarios", description: error.message });
        } else {
          console.error("Error al obtener los comentarios", error);
          toast({
            title: "Ups! Algo salió mal.",
            description: "Error al obtener los comentarios y sentimientos",
          });
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const updateSentimientoComentario = async (comentario: Comentario) => {
    try {
      const response: Response<null> = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comentario/sentimiento/${comentario.id}`,
        {
          id_sentimiento: comentario.id_sentimiento,
        }
      );

      if (response.data.status === "Error") throw new ControlledError(response.data.message);

      const newComentarios = comentarios.map((_comentario) => {
        if (_comentario.id === comentario.id) {
          return comentario;
        }
        return _comentario;
      });

      setComentarios(newComentarios);
      toast({
        title: "Sentimiento actualizado",
        description: `Sentimiento del usuario ${comentario.usuario.nombre + comentario.usuario.apellido} ha sido actualizado exitosamente`,
      });
    } catch (error) {
      if (error instanceof ControlledError) {
        toast({ title: "Error al actualizar el sentimiento", description: error.message });
      } else {
        console.error("Error al actualizar el sentimiento", error);
        toast({ title: "Ups! Algo salió mal.", description: "Error al actualizar el sentimiento" });
      }
    }
  };

  const sentimientoMap = useMemo(() => {
    return sentimientos.reduce(
      (map, sentimiento) => {
        map[sentimiento.id] = sentimiento.nombre;
        return map;
      },
      {} as Record<string, string>
    );
  }, [sentimientos]);

  const openEditSheet = useCallback((comentario: Comentario) => {
    setCurrentComentario(comentario);
    setIsEditSheetOpen(true);
  }, []);

  const deleteComentario = async (comentario: Comentario | null) => {
    if (!comentario) return;

    const response: Response<null> = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/comentario/${comentario.id}`
    );

    if (response.data.status === "Error") throw new ControlledError(response.data.message);

    const newComentarios = comentarios.filter((_comentario) => _comentario.id !== comentario.id);
    setComentarios(newComentarios);

    setDelComentario(null);

    toast({
      title: "Comentario eliminado",
      description: `El comentario ha sido eliminado exitosamente.`,
    });
  };

  const filteredComentarios = useMemo(() => {
    return comentarios.filter((comentario) => {
      const fechaComentario = new Date(comentario.fechacreacion);

      const inRange =
        fechaComentario >= new Date(dateRange.start) && fechaComentario <= new Date(dateRange.end);
      return (
        inRange &&
        (comentario.comentario?.toLowerCase().includes(search.toLowerCase()) ||
          comentario.usuario.nombre.toLowerCase().includes(search.toLowerCase()) ||
          comentario.usuario.apellido.toLowerCase().includes(search.toLowerCase()) ||
          sentimientoMap[comentario.id_sentimiento].toLowerCase().includes(search.toLowerCase()))
      );
    });
  }, [comentarios, search, sentimientoMap, dateRange]);

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
  } = usePagination<Comentario>({
    items: filteredComentarios,
    startingEntriesPerPage: 10,
    filters: [selectedSentimientos],
    filterFunction: (comentario) => {
      if (selectedSentimientos.length === sentimientos.length) return true;
      return selectedSentimientos.some((sentimiento) => sentimiento.id === comentario.id_sentimiento);
    },
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

          <FechasFilters dateRange={dateRange} setDateRange={setDateRange} />

          <ComentariosFilters
            sentimientos={sentimientos}
            selectedSentimientos={selectedSentimientos}
            setSelectedSentimientos={setSelectedSentimientos}
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

        <MainContent title="Comentarios" description="Administra los comentarios de los usuarios">
          <ComentariosTableHeader />
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
              <div className="hidden flex-1 xl:block">
                <Skeleton className="max-w-[200px] rounded-3xl py-1 text-xs font-normal text-transparent md:text-base">
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
                {currentPageItems.map((comentario) => (
                  <ComentarioTableRow
                    key={comentario.id}
                    _comentario={comentario}
                    openEditSheet={openEditSheet}
                    sentimientoName={sentimientoMap[comentario.id_sentimiento]}
                    setComentarios={(newComentario) => {
                      const newComentarios = comentarios.map((comentario) => {
                        if (comentario.id === newComentario.id) {
                          return newComentario;
                        }
                        return comentario;
                      });
                      setComentarios(newComentarios);
                    }}
                    updateSentimiento={(updatedSentimiento) =>
                      updateSentimientoComentario(updatedSentimiento)
                    }
                    sentimientos={sentimientos}
                    setDelComentario={setDelComentario}
                    setDeleteModalOpen={setDeleteModalOpen}
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

        <SheetComentario
          open={isEditSheetOpen}
          onOpenChange={setIsEditSheetOpen}
          comentario={currentComentario}
          setComentario={setCurrentComentario}
          title="Editar comentario"
          onAction={() => updateSentimientoComentario(currentComentario)}
          sentimientos={sentimientos}
          sentimientoMap={sentimientoMap}
        />

        <DialogDelete
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onAction={() => deleteComentario(delComentario)}
          title="¿Estás absolutamente seguro?"
          description="Esta acción no se puede deshacer. Esto eliminará el comentario permanentemente."
        />
      </SectionWrapper>
    </>
  );
}

export default Comentarios;
