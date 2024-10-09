"use client";

import usePagination from "@web/hooks/usePagination";
import { Categoria, Response } from "@web/types";
import axios from "axios";
import { Delete, Ellipsis, FilePenLine, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { Skeleton } from "@repo/ui/components/skeleton";
import { cn } from "@repo/ui/lib/utils";
import SheetCategoria from "./categorias_components/SheetCategoria";
import DialogDelete from "./general_components/DialogDelete";

const initCategoria: Categoria = {
  id: "000-init",
  nombre: "",
  descripcion: "",
  colorfondo: "#000000",
  colortexto: "#ffffff",
};

function Categorias() {
  const [isLoading, setIsLoading] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { page, entriesPerPage, setEntriesPerPage, currentPageItems, totalPages, prevPage, nextPage } =
    usePagination<Categoria>({ items: categorias, startingEntriesPerPage: 10 });

  const [isNewSheetOpen, setIsNewSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const [currCategoria, setCurrCategoria] = useState<Categoria>(initCategoria);
  const [newCategoria, setNewCategoria] = useState<Categoria>(initCategoria);
  const [delCategoria, setDelCategoria] = useState<Categoria | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openEditSheet = (categoria: Categoria) => {
    setCurrCategoria(categoria);
    setIsEditSheetOpen(true);
  };

  const openNewSheet = () => {
    setNewCategoria(initCategoria);
    setIsNewSheetOpen(true);
  };

  async function createNewCategoria(categoria: Categoria) {
    const response: Response<Categoria> = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/categoria`,
      {
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
        colorfondo: categoria.colorfondo,
        colortexto: categoria.colortexto,
      }
    );

    console.log(response);

    if (response.data.status === "Error") throw new Error(response.data.message);

    setCategorias([...categorias, response.data.result]);
  }

  async function updateCategoria(categoria: Categoria) {
    const response: Response<null> = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/categoria/${categoria.id}`,
      {
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
        colorfondo: categoria.colorfondo,
        colortexto: categoria.colortexto,
      }
    );

    console.log(response);

    if (response.data.status === "Error") throw new Error(response.data.message);

    const newCategoria = categorias.map((_categoria) => {
      if (_categoria.id === categoria.id) {
        return categoria;
      }
      return _categoria;
    });

    setCategorias(newCategoria);
  }

  async function deleteCategoria(categoria: Categoria | null) {
    if (!categoria) return;

    const response: Response<null> = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/categoria/${categoria.id}`
    );

    console.log(response);

    if (response.data.status === "Error") throw new Error(response.data.message);

    const newCategoria = categorias.filter((_categoria) => _categoria.id !== categoria.id);
    setCategorias(newCategoria);

    setDelCategoria(null);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response: Response<Categoria[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/etiqueta`
        );
        if (response.data.status === "Error") throw new Error(response.data.message);

        console.log("Mira las categorias", response);
        setCategorias(response.data.result);
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
      <div className="flex h-full w-full flex-col gap-2 overflow-y-hidden p-1">
        <div className="flex flex-row justify-end gap-2">
          <Input placeholder="Buscar..." className="flex-1 lg:w-fit" />
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
          <Button className="w-10 gap-2 sm:w-auto" onClick={openNewSheet}>
            <Plus className="h-4 w-4 shrink-0" />
            <p className="hidden sm:block">Agregar</p>
          </Button>
        </div>

        <Card className="flex h-auto flex-1 flex-col overflow-y-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Categorías</CardTitle>
            <CardDescription>Categoriza las publicaciones en diferentes áreas y temas.</CardDescription>
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
                  {currentPageItems.map((categoria) => {
                    return (
                      <section key={categoria.id} className="flex items-center rounded-md border px-4 py-3">
                        <div className="flex-1">
                          <p>{categoria.nombre}</p>
                        </div>
                        <div className="flex-1 text-sm font-light">{categoria.descripcion}</div>
                        <Popover>
                          <PopoverTrigger>
                            <Ellipsis />
                          </PopoverTrigger>
                          <PopoverContent className="flex w-fit flex-col gap-0 p-1" side="left" align="start">
                            <Button
                              variant={"ghost"}
                              className="justify-start"
                              onClick={() => openEditSheet(categoria)}
                            >
                              <FilePenLine className="h-4 w-4" />
                              <p>Editar</p>
                            </Button>
                            <Button
                              variant={"ghost"}
                              className="justify-start hover:bg-red-100/50"
                              onClick={() => {
                                setDelCategoria(categoria);
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
                  <div className="flex items-center gap-1 text-sm">
                    <span className="hidden sm:flex">Mostrando </span>
                    <span className="font-bold">{`${(page - 1) * entriesPerPage + 1}-${page * entriesPerPage > categorias.length ? categorias.length : page * entriesPerPage}`}</span>{" "}
                    de <span className="font-bold">{categorias.length}</span> categorías
                  </div>
                  <div className="space-x-2">
                    <Button variant={"secondary"} onClick={prevPage} disabled={page === 1}>
                      Anterior
                    </Button>
                    <Button
                      variant={"secondary"}
                      onClick={nextPage}
                      disabled={page === totalPages || totalPages === 0}
                    >
                      Siguiente
                    </Button>
                  </div>
                </section>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <SheetCategoria
        open={isNewSheetOpen}
        onOpenChange={setIsNewSheetOpen}
        categoria={newCategoria}
        setCategoria={setNewCategoria}
        title="Agregar categoría"
        onAction={() => createNewCategoria(newCategoria)}
      />

      <SheetCategoria
        open={isEditSheetOpen}
        onOpenChange={setIsEditSheetOpen}
        categoria={currCategoria}
        setCategoria={setCurrCategoria}
        title="Editar categoría"
        onAction={() => updateCategoria(currCategoria)}
      />

      <DialogDelete
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onAction={() => deleteCategoria(delCategoria)}
        title="¿Estás absolutamente seguro?"
        description="Esta acción no se puede deshacer. Esto eliminará permanentemente la categoría."
      />
    </>
  );
}
export default Categorias;
