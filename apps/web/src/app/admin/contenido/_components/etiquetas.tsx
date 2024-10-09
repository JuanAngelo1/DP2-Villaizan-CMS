"use client";

import usePagination from "@web/hooks/usePagination";
import InputWithLabel from "@web/src/app/(auth)/_components/InputWithLabel";
import { Etiqueta, Response } from "@web/types";
import axios from "axios";
import { Delete, Ellipsis, FilePenLine, ListFilter, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { ColorPicker } from "@repo/ui/components/color-picker";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/components/sheet";
import { Skeleton } from "@repo/ui/components/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import { cn } from "@repo/ui/lib/utils";
import ChipEtiqueta from "./etiquetas_components/ChipEtiqueta";
import DialogDelete from "./etiquetas_components/DialogDelete";
import SheetEtiqueta from "./etiquetas_components/SheetEtiqueta";

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

  const { page, entriesPerPage, setEntriesPerPage, currentPageItems, totalPages, prevPage, nextPage } =
    usePagination<Etiqueta>({ items: etiquetas, startingEntriesPerPage: 10 });

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
      <div className="flex w-full flex-col gap-2 overflow-y-hidden">
        <section className="flex flex-row justify-between">
          <Tabs defaultValue="account" className="">
            <TabsList>
              <TabsTrigger value="account">Activos</TabsTrigger>
              <TabsTrigger value="password">Archivados</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex flex-row justify-end gap-2">
            <Input placeholder="Buscar..." />
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
              <p>por página</p>
            </div>
            <Button className="gap-2" onClick={openNewSheet}>
              <Plus className="h-4 w-4" />
              <p>Agregar</p>
            </Button>
          </div>
        </section>

        <Card className="flex h-auto min-h-[100px] flex-1 flex-col overflow-y-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Etiquetas</CardTitle>
            <CardDescription>
              Administra las etiquetas de las publicaciones para que tengan una identificacion a mayor
              detalle.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col gap-2 overflow-y-hidden pt-0">
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
                        <div className="flex-1 text-sm font-light">{etiqueta.descripcion}</div>
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
                <section className="flex flex-row items-center justify-between">
                  <p className="text-sm">
                    Mostrando{" "}
                    <span className="font-bold">{`${(page - 1) * entriesPerPage + 1}-${page * entriesPerPage > etiquetas.length ? etiquetas.length : page * entriesPerPage}`}</span>{" "}
                    de <span className="font-bold">{etiquetas.length}</span> etiquetas
                  </p>
                  <div className="space-x-2">
                    <Button variant={"secondary"} onClick={prevPage} disabled={page === 1}>
                      Anterior
                    </Button>
                    <Button variant={"secondary"} onClick={nextPage} disabled={page === totalPages}>
                      Siguiente
                    </Button>
                  </div>
                </section>
              </>
            )}
          </CardContent>
        </Card>
      </div>

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
      />
    </>
  );
}

export default Etiquetas;
