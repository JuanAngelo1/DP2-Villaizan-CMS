"use client";

import usePagination from "@web/hooks/usePagination";
import axios from "axios";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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

  const router = useRouter();
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
  } = usePagination<Publicacion>({ items: publicaciones || [], startingEntriesPerPage: 10 });

  useEffect(() => {
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

    fetchPublicaciones();
  }, []);

  return (
    <>
      <TopHeader>
        <Input placeholder="Buscar..." className="flex-1 lg:w-fit" />
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
          ) : publicaciones && publicaciones.length > 0 ? (
            // Renderiza la lista de publicaciones
            publicaciones.map((publicacion) => (
              <PublicacionItem
                key={publicacion.id}
                publicacion={publicacion}
                onEdit={() => router.push(`/admin/contenido/publicaciones/${publicacion.id}`)}
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
