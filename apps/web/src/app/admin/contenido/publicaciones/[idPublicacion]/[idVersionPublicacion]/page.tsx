"use client";

import TextEditor from "@web/src/app/_components/TextEditor";
import { Response } from "@web/types";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
import DateTimePicker from "@repo/ui/components/date-time-picker";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Separator } from "@repo/ui/components/separator";
import { Skeleton } from "@repo/ui/components/skeleton";
import { useToast } from "@repo/ui/hooks/use-toast";
import MainContent from "../../../_components/general_components/MainContent";
import Image from "next/image";

interface VersionPublicacion {
  id: number;
  fechaultimamodificacion: string;
  titulo: string;
  urlimagen: string;
  descripcion: string;
  slug: string;
  richtext: string;
  fechapublicacion: string;
  estaactivo: boolean;
  estado: string;
  imagenes: string[];
  categorias: string[];
  etiquetas: string[];
}

function NuevoVersionPage() {
  const { toast } = useToast();
  const { idPublicacion, idVersionPublicacion } = useParams();
  const router = useRouter();
  const [version, setVersion] = useState<VersionPublicacion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchVersion = async () => {
      try {
        const response: Response<VersionPublicacion> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/version/${idVersionPublicacion}`
        );
        setVersion(response.data.result);
      } catch (error) {
        toast({
          title: "Error",
          description: "Hubo un error al obtener la información de la versión de la publicación.",
          variant: "destructive",
        });
        router.push(`/admin/contenido/publicaciones/${idPublicacion}`);
      } finally {
        setLoading(false);
      }
    };

    fetchVersion();
  }, []);

  const handleUpdateVersion = async () => {
    try {
      const response: Response<VersionPublicacion> = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/actualizarVersion/${idVersionPublicacion}`,
        version
      );
      toast({
        title: "Versión actualizada",
        description: "La versión de la publicación ha sido actualizada con éxito.",
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al actualizar la versión de la publicación.",
        variant: "destructive",
      });
    }
  }

  const handlePublishVersion = async () => {
    try {
      const response: Response<VersionPublicacion> = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/publicar/${idPublicacion}/${idVersionPublicacion}`
      );
      if(response.data.status == "Error") {
        throw new Error(response.data.message);
      }
      toast({
        title: "Versión publicada",
        description: "La versión de la publicación ha sido publicada con éxito.",
      });
      window.location.reload();
    } catch (error : any) {
      toast({
        title: "Error",
        description: error.message || "Hubo un error al publicar la versión de la publicación.",
        variant: "destructive",
      });
    }
  }

  console.log(version);

  const handleUnpublishVersion = async () => {
    try {
      const response: Response<VersionPublicacion> = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/despublicar/${idPublicacion}/${idVersionPublicacion}`
      );
      if(response.data.status == "Error") {
        throw new Error(response.data.message);
      }
      toast({
        title: "Versión despublicada",
        description: "La versión de la publicación ha sido despublicada con éxito.",
      });
      window.location.reload();
    } catch (error : any) {
      toast({
        title: "Error",
        description: error.message || "Hubo un error al despublicar la versión de la publicación.",
        variant: "destructive",
      });
    }
  }

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
        version && (
          <MainContent title={version?.titulo || "[Titulo de publicacion]"}>
            <Separator />
            <section className="flex h-full w-full flex-row gap-8 overflow-y-auto py-4">
              {/* Información del Contenido */}
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto *:flex *:flex-col *:gap-2">
                <h3 className="text-lg font-semibold">Información del contenido</h3>
                {/* Título */}
                <div>
                  <Label className="flex flex-row gap-1" htmlFor="titulo">
                    Título <p className="text-red-500">*</p>
                  </Label>
                  <Input
                    id="titulo"
                    placeholder="Ej. Nuevo sabor de helado"
                    value={version.titulo}
                    onChange={(e) => setVersion({ ...version, titulo: e.target.value })}
                  />
                </div>
                {/* Slug */}
                <div>
                  <Label className="flex flex-row gap-1" htmlFor="slug">
                    Slug <p className="text-red-500">*</p>
                  </Label>
                  <Input
                    id="slug"
                    placeholder="Ej. nuevo-sabor-helado"
                    value={version?.slug}
                    onChange={(e) => setVersion({ ...version, slug: e.target.value })}
                  />
                </div>
                {/* Descripción */}
                <div>
                  <Label className="flex flex-row gap-1" htmlFor="descripcion">
                    Descripción <p className='text-red-500'>*</p>
                  </Label>
                  <Input
                    id="descripcion"
                    placeholder="Ej. Descubre nuestro nuevo sabor de helado"
                    value={version?.descripcion}
                    onChange={(e) => setVersion({ ...version, descripcion: e.target.value })}
                  />
                </div>
                {/* Imagen de portada */}
                {version.urlimagen && (
                  <div className="flex flex-col gap-2">
                    <AspectRatio ratio={16 / 9} >
                      <Image
                        src={version.urlimagen}
                        alt="Imagen de portada"
                        fill
                        className="rounded-md object-cover"
                      />
                    </AspectRatio>
                  </div>  
                )}
                {/* Texto Enriquecido */}
                <div>
                  <Label className="flex flex-row gap-1" htmlFor="richtext">
                    Texto enriquecido <p className="text-red-500">*</p>
                  </Label>
                  <TextEditor
                    content={version?.richtext}
                    onContentChange={(content: string) => setVersion({ ...version, richtext: content })}
                  />
                </div>
              </div>

              <Separator orientation="vertical" />

              {/* Información Adicional */}
              <div className="flex w-full flex-col gap-8 lg:w-1/4">
                <div className="flex flex-col gap-4 *:gap-2">
                  {/* Estado */}
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                      <Label>Estado</Label>
                      <Badge variant={"default"} className="w-fit">
                        {version?.estado || "Borrador"}
                      </Badge>
                    </div>
                    <Button 
                      variant={"secondary"}
                      onClick={() => version?.estado == "Borrador" ? handlePublishVersion() : handleUnpublishVersion()}
                      className="w-fit self-end"
                    >
                      {version?.estado == "Borrador" ? "Publicar" : "Despublicar"}
                    </Button>
                  </div>
                  {/* Categorías */}
                  {/* <div className="flex flex-col">
                    <Label>Categorías</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"}>
                          {pub?.categorias.length > 0 ? pub.categorias.join(", ") : "Elegir categorías"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-72">
                        <Command>
                          <CommandInput placeholder="Buscar categorías..." />
                          <CommandList>
                            <CommandEmpty>No se encontraron categorías.</CommandEmpty>
                            <CommandGroup>
                              {["Noticias", "Eventos", "Blog", "Productos"].map((categoria) => (
                                <CommandItem
                                  key={categoria}
                                  onSelect={() => {
                                    const updatedCategorias = pub?.categorias.includes(categoria)
                                      ? pub.categorias.filter((cat) => cat !== categoria)
                                      : [...(pub?.categorias || []), categoria];
                                    setPub({ ...pub, categorias: updatedCategorias });
                                  }}
                                >
                                  {categoria}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div> */}
                  {/* Etiquetas */}
                  {/* <div className="flex flex-col">
                    <Label>Etiquetas</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"}>
                          {pub?.etiquetas.length > 0 ? pub.etiquetas.join(", ") : "Elegir etiquetas"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-72">
                        <Command>
                          <CommandInput placeholder="Buscar etiquetas..." />
                          <CommandList>
                            <CommandEmpty>No se encontraron etiquetas.</CommandEmpty>
                            <CommandGroup>
                              {["Etiqueta 1", "Etiqueta 2", "Etiqueta 3"].map((etiqueta) => (
                                <CommandItem
                                  key={etiqueta}
                                  onSelect={() => {
                                    const updatedEtiquetas = pub?.etiquetas.includes(etiqueta)
                                      ? pub.etiquetas.filter((tag) => tag !== etiqueta)
                                      : [...(pub?.etiquetas || []), etiqueta];
                                    setPub({ ...pub, etiquetas: updatedEtiquetas });
                                  }}
                                >
                                  {etiqueta}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div> */}
                  {/* Fecha de Publicación */}
                  <div className="flex flex-col">
                    <Label>Fecha de publicación</Label>
                    <DateTimePicker
                      date={version?.fechapublicacion}
                      setDate={(newDate: string) => setVersion({ ...version, fechapublicacion: newDate })}
                      placeholder="Seleccionar fecha y hora"
                    />
                  </div>
                  {/* Última Actualización (Deshabilitada) */}
                  <div className="flex flex-col">
                    <Label>Última actualización</Label>
                    <DateTimePicker
                      date={version?.fechaultimamodificacion}
                      setDate={(newDate: string) => setVersion({ ...version, fechaultimamodificacion: newDate })}
                      placeholder="Fecha de actualización"
                      disabled
                    />
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="mt-auto flex flex-wrap items-end justify-end gap-2">
                  <Button variant={"ghost"} onClick={() => router.push(`/admin/contenido/publicaciones/${idPublicacion}`)}>
                    Cancelar edición
                  </Button>
                  <Button variant={"default"} onClick={() => handleUpdateVersion()}>
                    Guardar cambios
                  </Button>
                </div>
              </div>
            </section>
          </MainContent>
        )
      )}
    </>
  );
}

export default NuevoVersionPage;
