"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import usePagination from "@web/hooks/usePagination";
import axios from "axios";
import { EraserIcon, ListFilterIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Skeleton } from "@repo/ui/components/skeleton";
import { cn } from "@repo/ui/lib/utils";
import { useToast } from "@repo/ui/hooks/use-toast";
import ContentFooter from "../_components/general_components/ContentFooter";
import MainContent from "../_components/general_components/MainContent";
import TopHeader from "../_components/general_components/TopHeader";
import PublicacionItem from "./_components/PublicacionItem";
import { Response } from "@web/types";
import { Switch } from "@repo/ui/components/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@repo/ui/components/dropdown-menu";
import { Label } from "@repo/ui/components/label";
import DateTimePicker from "@repo/ui/components/date-time-picker";
import { Separator } from "@repo/ui/components/separator";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/tabs";

interface Publicacion {
  id: number;
  fechacreacion: Date;
  estaactivo: boolean;
  archivado: boolean;
  id_tipo_publicacion: number;
  id_usuario: string;
  nombrereferencia: string;
  descripcion: string;
  fechamodificacion: Date;
}

function PublicacionesPage() {
  const { toast } = useToast();
  const [publicaciones, setPublicaciones] = useState<Publicacion[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    dateStart: "",
    dateEnd: "",
    archivado: false,
  });

  const router = useRouter();

  // Funciones para actualizar los filtros, memorizadas con useCallback
  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const setDateStart = useCallback((date: string) => {
    setFilters((prev) => ({ ...prev, dateStart: date }));
  }, []);

  const setDateEnd = useCallback((date: string) => {
    setFilters((prev) => ({ ...prev, dateEnd: date }));
  }, []);

  const setArchivado = useCallback((archivado: boolean) => {
    setFilters((prev) => ({ ...prev, archivado: archivado }));
  }, []);

  const onClearFilters = useCallback(() => {
    setFilters({
      search: "",
      dateStart: "",
      dateEnd: "",
      archivado: false,
    });
  }, []);

  // Filtrado de publicaciones basado en los filtros aplicados
  const filteredPublicaciones = useMemo(() => {
    if (!publicaciones) return [];

    return publicaciones.filter((p) => {
      // Filtrar por estado
      if (filters.archivado && !p.archivado) return false;
      if (!filters.archivado && p.archivado) return false;

      // Filtrar por fechas de modificación
      const modDate = new Date(p.fechamodificacion);

      if (filters.dateStart) {
        const startDate = new Date(filters.dateStart);
        if (modDate < startDate) return false;
      }

      if (filters.dateEnd) {
        const endDate = new Date(filters.dateEnd);
        if (modDate > endDate) return false;
      }

      // Filtrar por búsqueda
      if (filters.search) {
        const search = filters.search.toLowerCase();
        if (
          !p.nombrereferencia.toLowerCase().includes(search) &&
          !p.descripcion.toLowerCase().includes(search)
        )
          return false;
      }

      return true;
    });
  }, [publicaciones, filters]);

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
  } = usePagination<Publicacion>({ items: filteredPublicaciones || [], startingEntriesPerPage: 10 });
  
  const fetchPublicaciones = async () => {
    try {
      const response: Response<Publicacion[]> = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones`);
      setPublicaciones(response.data.result);
    } catch (error) {
      console.error("Error fetching publicaciones", error);
      toast({
        title: "Error",
        description: "Hubo un error al obtener la información de las publicaciones.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const onArchivePublicacion = async (id: number) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/archivar/${id}`);
      toast({
        title: "Publicación archivada",
        description: "La publicación ha sido archivada correctamente.",
        variant: "default",
      });
      fetchPublicaciones();
    } catch (error) {
      console.error("Error archiving publicacion", error);
      toast({
        title: "Error",
        description: "Hubo un error al archivar la publicación.",
        variant: "destructive",
      });
    }
  }

  const onUnarchivePublicacion = async (id: number) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/desarchivar/${id}`);
      toast({
        title: "Publicación desarchivada",
        description: "La publicación ha sido desarchivada correctamente.",
        variant: "default",
      });
      fetchPublicaciones();
    } catch (error) {
      console.error("Error unarchiving publicacion", error);
      toast({
        title: "Error",
        description: "Hubo un error al desarchivar la publicación.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  return (
    <>
      <TopHeader>
        <Input placeholder="Buscar..." className="flex-1 lg:w-fit" onChange={(e) => setSearch(e.target.value)} />
        <Tabs defaultValue="activo" className="w-fit">
          <TabsList>
            <TabsTrigger value="activo" onClick={() => setArchivado(false)}>Activos</TabsTrigger>
            <TabsTrigger value="archivo" onClick={() => setArchivado(true)}>Archivados</TabsTrigger> 
          </TabsList>
        </Tabs>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant={"outline"}><ListFilterIcon className="h-4 w-4"/> Filtros</Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ult. fecha de modificación</DropdownMenuLabel>
            <div className="flex flex-col gap-2 justify-start p-2 items-start">
              <Label>Inicio</Label>
              <DateTimePicker date={filters.dateStart} setDate={setDateStart} />
              <Label>Fin</Label>
              <DateTimePicker date={filters.dateEnd} setDate={setDateEnd} />  
            </div>
            <Separator className="my-2"/> 
            <div className="flex flex-col items-end w-full mb-2">
              <Button variant={"ghost"} onClick={onClearFilters}><EraserIcon className="h-4 w-4" />Limpiar filtros</Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className="w-10 gap-2 sm:w-auto" onClick={() => router.push("/admin/contenido/publicaciones/nuevo")}>
          <PlusIcon className="h-4 w-4 shrink-0" />
          <p className="hidden sm:block">Crear</p>
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
          {loading ? (
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
          ) : filteredPublicaciones && filteredPublicaciones.length > 0 ? (
            // Renderiza la lista de publicaciones
            filteredPublicaciones.map((publicacion) => (
              <PublicacionItem
                key={publicacion.id}
                publicacion={publicacion}
                onEdit={() => router.push(`/admin/contenido/publicaciones/${publicacion.id}`)}
                onArchive={!publicacion.archivado ? onArchivePublicacion : undefined}
                onUnarchive={publicacion.archivado ? onUnarchivePublicacion : undefined}
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
          itemName="publicaciones"
        />
      </MainContent>
    </>
  );
}

export default PublicacionesPage;
