"use client";

import { Response } from "@web/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Separator } from "@repo/ui/components/separator";
import { Skeleton } from "@repo/ui/components/skeleton";
import { Textarea } from "@repo/ui/components/textarea";
import { useToast } from "@repo/ui/hooks/use-toast";
import MainContent from "../../_components/general_components/MainContent";
import { CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import usePagination from "@web/hooks/usePagination";
import { cn } from "@repo/ui/lib/utils";
import VersionItem from "../_components/VersionItem";
import ContentFooter from "../../_components/general_components/ContentFooter";
import { PlusIcon } from "lucide-react";

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
  versiones_publicacion: VersionPublicacion[];
}

interface VersionPublicacion {
  id: number;
  fechaultimamodificacion: Date;
  titulo: string;
  descripcion: string;
  slug: string;
  fechapublicacion: Date;
  estaactivo: boolean;
  estado: string;
}

function PublicacionPage() {
  const { idPublicacion } = useParams();
  const { toast } = useToast();
  const router = useRouter();
  const [publicacionInicial, setPublicacionInicial] = useState<Publicacion | null>(null);
  const [publicacion, setPublicacion] = useState<Publicacion | null>(null);
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(true);

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
  } = usePagination<VersionPublicacion>({ items: publicacion?.versiones_publicacion || [], startingEntriesPerPage: 10 });

  useEffect(() => {
    const fetchPublicacion = async (id: string) => {
      setLoading(true);
      try {
        const responsePublicacion: Response<Publicacion> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/${id}`
        );
        const responseVersiones: Response<VersionPublicacion[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/versiones/${id}`
        );
        setPublicacion({
          ...responsePublicacion.data.result,
          versiones_publicacion: responseVersiones.data.result,
        });
        setPublicacionInicial({
          ...responsePublicacion.data.result,
          versiones_publicacion: responseVersiones.data.result,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Hubo un error al obtener la publicación o sus versiones.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
        setChange(false);
      }
    };

    if (typeof idPublicacion === "string") {
      fetchPublicacion(idPublicacion);
    } else {
      toast({
        title: "Error",
        description: "No se ha proporcionado un ID de publicación válido.", // Ocurre cuando hay mas de un string en el parametro recuperado
        variant: "destructive",
      });
      router.push("/admin/contenido/publicaciones");
    }
  }, [idPublicacion]);

  useEffect(() => {
    if (publicacion && publicacionInicial) {
      setChange(JSON.stringify(publicacion) !== JSON.stringify(publicacionInicial));
    }
  }, [publicacion, publicacionInicial]);

  const restartPublicacion = () => {
    setPublicacion(publicacionInicial);
    setChange(false);
  };

  const handleUpdatePublicacion = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/actualizarPublicacion/${idPublicacion}`, publicacion);
      toast({
        title: "Publicación actualizada",
        description: "La publicación ha sido actualizada exitosamente.",
      });
      setChange(false);
    } catch (error) {
      toast({
        title: "Error de actualización",
        description: "Hubo un error al actualizar la publicación.",
        variant: "destructive",
      });
    }
  };

  const handleDuplicateVersion = async (idVersion: number) => {
    setLoading(true);
    const id = idVersion.toString();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/duplicar/${idPublicacion}/${id}`);
      toast({
        title: "Versión duplicada",
        description: "La versión ha sido duplicada exitosamente.",
      });
      router.push(`/admin/contenido/publicaciones/${idPublicacion}`);
    } catch (error) {
      toast({
        title: "Error de duplicación",
        description: "Hubo un error al duplicar la versión.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {loading ? (
        <MainContent>
          <div className="flex flex-col gap-8">
            <Skeleton className="h-8 w-full" />
            <Separator className="w-full" />
            <div className="flex w-full flex-row justify-between gap-4">
              <Skeleton className="h-8 w-full" />
              <Separator orientation="vertical" />
              <Skeleton className="h-8 w-2/3" />
            </div>
          </div>
        </MainContent>
      ) : (
        publicacion && (
          <MainContent title={publicacion.nombrereferencia || "[Sin nombre]"}>
            <Separator orientation="horizontal" className="mb-4" />
            <div className="flex h-full w-full flex-col justify-start overflow-y-auto">
              {/* Información de la publicación */}
              <div className="w-full flex flex-row justify-between gap-8">
                  {/* Formulario */}
                <form className="flex flex-col gap-4 *:flex *:flex-col *:gap-2 w-full">
                  {/* Campos del formulario */}
                  <div>
                    {/* Nombre de referencia */}
                    <Label>Nombre de referencia</Label>
                    <Input
                      placeholder="Nombre de referencia"
                      value={publicacion.nombrereferencia}
                      onChange={(e) => setPublicacion({ ...publicacion, nombrereferencia: e.target.value })}
                    />
                  </div>
                  {/* Descripcion de referencia */}
                  <div>
                    <Label>Descripción de referencia</Label>
                    <Textarea
                      placeholder="Descripción de referencia"
                      value={publicacion.descripcion}
                      onChange={(e) => setPublicacion({ ...publicacion, descripcion: e.target.value })}
                    />
                  </div>
                </form>
                {/* Botones de acción */}
                <div className="mt-8 flex flex-col gap-2 self-end">
                  <Button variant={"ghost"} onClick={() => restartPublicacion()} disabled={!change}>
                    Cancelar cambios
                  </Button>
                  <Button
                    variant={"default"}
                    onClick={() => {
                      handleUpdatePublicacion();
                    }}
                    isLoading={loading}
                    disabled={!change}
                  >
                    Actualizar cambios
                  </Button>
                </div>
              </div>

              <Separator orientation="horizontal" className="mt-8" />
            
              {/* Versiones de la publicación */}
              <CardHeader className="flex flex-row justify-between px-0">
                <div className="flex flex-col items-start space-y-1.5">
                  <CardTitle className="text-xl">Versiones</CardTitle>
                  <CardDescription>
                    Administra las versiones de la publicación actual (borradores y publicación activa)
                  </CardDescription>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <div className={cn(buttonVariants({ variant: "outline" }), "hover:bg-background gap-2")}>
                    <p>Mostrando</p>
                    <Input
                      className="h-[30px] w-[40px] px-0 text-center"
                      value={entriesPerPage}
                      onChange={(e) => setEntriesPerPage(e.target.value)}
                    />
                    <p className="">por página</p>
                  </div>
                  <Button className="w-10 gap-2 sm:w-auto" onClick={() => router.push(`/admin/contenido/publicaciones/${idPublicacion}/nuevo`)}>
                    <PlusIcon className="h-4 w-4 shrink-0" />
                    <p className="hidden sm:block">Crear</p>
                  </Button>
                </div>
              </CardHeader>

              <section className="h-full space-y-2 overflow-y-auto min-h-80">
                {publicacion.versiones_publicacion && publicacion.versiones_publicacion.length > 0 ? (
                  publicacion.versiones_publicacion.map((version) => (
                    <VersionItem
                      key={publicacion.id}
                      version_publicacion={version}
                      onEdit={() => router.push(`/admin/contenido/publicaciones/${publicacion.id}/${version.id}`)}
                      onDuplicate={() => handleDuplicateVersion(version.id)}
                    />
                  ))
                ) : (
                  // Renderiza el mensaje cuando no hay publicaciones
                  <CardDescription className="flex h-full items-center justify-center">
                    No se han encontrado versiones.
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
                itemName="versiones"
              />
            </div>
          </MainContent>
        )
      )}
    </>
  );
}

export default PublicacionPage;
