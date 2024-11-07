'use client';

import TextEditor from "@web/src/app/_components/TextEditor";
import { Response } from "@web/types";
import axios from "axios";
import { AsteriskIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import DateTimePicker from "@repo/ui/components/date-time-picker";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Separator } from "@repo/ui/components/separator";
import { Skeleton } from "@repo/ui/components/skeleton";
import { useToast } from "@repo/ui/hooks/use-toast";
import MainContent from "../../../_components/general_components/MainContent";

interface VersionPublicacion {
  titulo: string;
  urlimagen?: string;
  descripcion?: string;
  fechapublicacion: string;
  slug?: string;
  richtext: string;
  categorias: string[];
  etiquetas: string[];
  imagenes: string[];
}

interface VersionPublicacionReponse {
  id: number;
}

function NuevoVersionPage() {
  const { toast } = useToast();
  const { idPublicacion } = useParams();
  const router = useRouter();
  const [version, setVersion] = useState<VersionPublicacion>({
    titulo: "",
    urlimagen: "",
    descripcion: "",
    fechapublicacion: "",
    slug: "",
    richtext: "",
    categorias: [],
    etiquetas: [],
    imagenes: [],
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response: Response<VersionPublicacionReponse> = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/crearVersion`,
        version
      );
      toast({
        title: "Versión creada",
        description: "La versión de la publicación se creó correctamente.",
      });
      router.push(`/admin/contenido/publicaciones/${idPublicacion}/${response.data.result.id}`);
    } catch (error) {
      toast({
        title: "Error en creación",
        description: "Hubo un error al crear la versión de la publicación.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContent title={version?.titulo || "[Titulo de publicacion]"}>
      <Separator />
      <section className="flex w-full h-full gap-8 overflow-y-auto py-4 flex-row">
        {/* Información del Contenido */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto *:flex *:flex-col *:gap-2">
          <h3 className="text-lg font-semibold">Información del contenido</h3>
          {/* Título */}
          <div>
            <Label className="flex flex-row gap-1">
              Título <p className='text-red-500'>*</p>
            </Label>
            <Input
              placeholder="Ej. Nuevo sabor de helado"
              value={version?.titulo}
              onChange={(e) => setVersion({ ...version, titulo: e.target.value })}
            />
          </div>
          {/* Slug */}
          <div>
            <Label className="flex flex-row gap-1">
              Slug <p className='text-red-500'>*</p>
            </Label>
            <Input
              placeholder="Ej. nuevo-sabor-helado"
              value={version?.slug}
              onChange={(e) => setVersion({ ...version, slug: e.target.value })}
            />
          </div>
          {/* Descripción */}
          <div>
            <Label className="flex flex-row gap-1">
              Descripción <p className='text-red-500'>*</p>
            </Label>
            <Input
              placeholder="Ej. Descubre nuestro nuevo sabor de helado"
              value={version?.descripcion}
              onChange={(e) => setVersion({ ...version, descripcion: e.target.value })}
            />
          </div>
          {/* Texto Enriquecido */}
          <div>
            <Label className="flex flex-row gap-1">
              Texto enriquecido <p className='text-red-500'>*</p>
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
            {/* <div className="flex flex-col">
                    <Label>Estado</Label>
                    <Badge variant={"secondary"} className="w-fit">
                      {version?.estado || "Borrador"}
                    </Badge>
                  </div> */}
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
            {/* Fecha de Creación (Deshabilitada) */}
            {/* <div className="flex flex-col">
                    <Label>Fecha de creación</Label>
                    <DateTimePicker
                      date={version?.fecha_creacion}
                      setDate={(newDate: string) => setVersion({ ...version, fecha_creacion: newDate })}
                      placeholder="Fecha de creación"
                      disabled
                    />
                  </div> */}
            {/* Última Actualización (Deshabilitada) */}
            {/* <div className="flex flex-col">
                    <Label>Última actualización</Label>
                    <DateTimePicker
                      date={version?.fecha_actualizacion}
                      setDate={(newDate: string) => setVersion({ ...version, fecha_actualizacion: newDate })}
                      placeholder="Fecha de actualización"
                      disabled
                    />
                  </div> */}
          </div>

          {/* Botones de Acción */}
          <div className="mt-auto flex flex-wrap items-end justify-end gap-2">
            <Button variant={"ghost"} onClick={() => router.back()}>
              Cancelar edición
            </Button>
            <Button variant={"default"} onClick={() => handleSave()} disabled={loading}>
              Crear publicación
            </Button>
          </div>
        </div>
      </section>
    </MainContent>
  );
}

export default NuevoVersionPage;
