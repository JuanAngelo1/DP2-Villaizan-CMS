"use client";

import usePagination from "@web/hooks/usePagination";
import { Etiqueta, Response } from "@web/types";
import axios from "axios";
import { Delete, Ellipsis, FilePenLine, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { Skeleton } from "@repo/ui/components/skeleton";
import { cn } from "@repo/ui/lib/utils";
import ChipEtiqueta from "./etiquetas_components/ChipEtiqueta";
import SheetEtiqueta from "./etiquetas_components/SheetEtiqueta";
import ContentFooter from "./general_components/ContentFooter";
import DialogDelete from "./general_components/DialogDelete";
import MainContent from "./general_components/MainContent";
import SectionWrapper from "./general_components/SectionWrapper";
import TopHeader from "./general_components/TopHeader";

const initEtiqueta: Etiqueta = {
  id: "000-init",
  nombre: "",
  descripcion: "",
  colorfondo: "#000000",
  colortexto: "#ffffff",
};

function Etiquetas() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);

  const [isNewSheetOpen, setIsNewSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const [currEtiqueta, setCurrEtiqueta] = useState<Etiqueta>(initEtiqueta);
  const [newEtiqueta, setNewEtiqueta] = useState<Etiqueta>(initEtiqueta);
  const [delEtiqueta, setDelEtiqueta] = useState<Etiqueta | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [searchValue, setSearchValue] = useState<string>("");
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
  } = usePagination<Etiqueta>({
    items: etiquetas,
    startingEntriesPerPage: 10,
    filters: [searchValue],
    filterFunction: (item: Etiqueta) => {
      return (
        item.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(searchValue.toLowerCase())
      );
    },
  });

  const openEditSheet = (etiqueta: Etiqueta) => {
    setCurrEtiqueta(etiqueta);
    setIsEditSheetOpen(true);
  };

  const openNewSheet = () => {
    setNewEtiqueta(initEtiqueta);
    setIsNewSheetOpen(true);
  };

  const createNewEtiqueta = async (etiqueta: Etiqueta) => {
    const response: Response<Etiqueta> = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/etiqueta`, {
      nombre: etiqueta.nombre,
      descripcion: etiqueta.descripcion,
      colorfondo: etiqueta.colorfondo,
      colortexto: etiqueta.colortexto,
    });

    if (response.data.status === "Error") throw new Error(response.data.message);

    setEtiquetas([...etiquetas, response.data.result]);
  };

  const updateEtiqueta = async (etiqueta: Etiqueta) => {
    const response: Response<null> = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/etiqueta/${etiqueta.id}`,
      {
        nombre: etiqueta.nombre,
        descripcion: etiqueta.descripcion,
        colorfondo: etiqueta.colorfondo,
        colortexto: etiqueta.colortexto,
      }
    );

    if (response.data.status === "Error") throw new Error(response.data.message);

    const newEtiquetas = etiquetas.map((_etiqueta) => {
      if (_etiqueta.id === etiqueta.id) {
        return etiqueta;
      }
      return _etiqueta;
    });

    setEtiquetas(newEtiquetas);
  };

  const deleteEtiqueta = async (etiqueta: Etiqueta | null) => {
    if (!etiqueta) return;

    const response: Response<null> = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/etiqueta/${etiqueta.id}`
    );

    if (response.data.status === "Error") throw new Error(response.data.message);

    const newEtiquetas = etiquetas.filter((_etiqueta) => _etiqueta.id !== etiqueta.id);
    setEtiquetas(newEtiquetas);

    setDelEtiqueta(null);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response: Response<Etiqueta[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/etiqueta`
        );
        if (response.data.status === "Error") throw new Error(response.data.message);

        console.log("Mira las etiquetas", response);
        setEtiquetas(response.data.result);
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
      <SectionWrapper>
        <TopHeader>
          <Input
            placeholder="Buscar..."
            className="flex-1 lg:w-fit"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
          <Button className="w-10 gap-2 sm:w-auto" onClick={openNewSheet}>
            <Plus className="h-4 w-4 shrink-0" />
            <p className="hidden sm:block">Agregar</p>
          </Button>
        </TopHeader>

        <MainContent
          title="Etiquetas"
          description="Administra las etiquetas de las publicaciones para que tengan una identificacion a mayor detalle."
        >
          {isLoading ? (
            <section className="flex items-center rounded-md border px-4 py-3">
              <div className="flex-1">
                <Skeleton className="w-[300px] rounded-3xl px-3 py-1 text-sm font-normal text-transparent">
                  .
                </Skeleton>
              </div>
              <div className="flex-1">
                <Skeleton className="w-[200px] rounded-3xl px-3 py-1 text-sm font-normal text-transparent">
                  .
                </Skeleton>
              </div>
            </section>
          ) : (
            <>
              <section className="h-full space-y-2 overflow-y-auto">
                {currentPageItems.map((etiqueta) => {
                  return (
                    <section key={etiqueta.id} className="flex items-center rounded-md border px-4 py-3">
                      <div className="flex-1">
                        <ChipEtiqueta
                          etiqueta={etiqueta}
                          className="cursor-pointer"
                          onClick={() => openEditSheet(etiqueta)}
                        />
                      </div>
                      <div className="flex-1 text-sm font-light"> {etiqueta.descripcion}</div>
                      <Popover>
                        <PopoverTrigger>
                          <Ellipsis />
                        </PopoverTrigger>
                        <PopoverContent className="flex w-fit flex-col gap-0 p-1" side="left" align="start">
                          <Button
                            variant={"ghost"}
                            className="justify-start"
                            onClick={() => openEditSheet(etiqueta)}
                          >
                            <FilePenLine className="h-4 w-4" />
                            <p>Editar</p>
                          </Button>
                          <Button
                            variant={"ghost"}
                            className="justify-start hover:bg-red-100/50"
                            onClick={() => {
                              setDelEtiqueta(etiqueta);
                              setDeleteModalOpen(true);
                            }}
                          >
                            <Delete className="h-4 w-4 stroke-red-500" />
                            <p className="text-red-500">Eliminar</p>
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </section>
                  );
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
                itemName="etiquetas"
              />
            </>
          )}
        </MainContent>
      </SectionWrapper>

      <SheetEtiqueta
        open={isNewSheetOpen}
        onOpenChange={setIsNewSheetOpen}
        etiqueta={newEtiqueta}
        setEtiqueta={setNewEtiqueta}
        title="Agregar etiqueta"
        onAction={() => createNewEtiqueta(newEtiqueta)}
      />

      <SheetEtiqueta
        open={isEditSheetOpen}
        onOpenChange={setIsEditSheetOpen}
        etiqueta={currEtiqueta}
        setEtiqueta={setCurrEtiqueta}
        title="Editar etiqueta"
        onAction={() => updateEtiqueta(currEtiqueta)}
      />

      <DialogDelete
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onAction={() => deleteEtiqueta(delEtiqueta)}
        title="¿Estás absolutamente seguro?"
        description="Esta acción no se puede deshacer. Esto eliminará permanentemente la etiqueta."
      />
    </>
  );
}

export default Etiquetas;
