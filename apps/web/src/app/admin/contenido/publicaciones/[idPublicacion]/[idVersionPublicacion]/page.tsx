"use client";

import React, { useEffect, useState, useRef } from "react";
import { Categoria, Etiqueta, Response } from "@web/types";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
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
import { MultiSelect } from "@repo/ui/components/multi-select";
import RichTextEditor from "@web/src/app/_components/RichTextEditor";
import { type Editor } from 'reactjs-tiptap-editor';

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
  categorias: number[];
  etiquetas: number[];
}

function NuevoVersionPage() {
  const { toast } = useToast();
  const { idPublicacion, idVersionPublicacion } = useParams();
  const router = useRouter();
  const [version, setVersion] = useState<VersionPublicacion | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
  const [loading, setLoading] = useState(true);
  const editorRef = useRef<{ editor: Editor | null }>(null);

  useEffect(() => {
    setLoading(true);
    const fetchVersion = async () => {
      try {
        const response: Response<VersionPublicacion> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/version/${idVersionPublicacion}`
        );
        const responseEtiquetas: Response<Etiqueta[]> = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/etiqueta`);
        if (responseEtiquetas.data.status == "Error") {
          throw new Error(responseEtiquetas.data.message);
        }
        const responseCategorias: Response<Categoria[]> = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/categoria`);
        if (responseCategorias.data.status == "Error") {
          throw new Error(responseCategorias.data.message);
        }
        setCategorias(responseCategorias.data.result);
        setEtiquetas(responseEtiquetas.data.result);
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
      let updatedVersion = { ...version };
      if (editorRef.current?.editor && version) {
        const richtext = editorRef.current.editor.getHTML();
        setVersion({ ...version, richtext });
        updatedVersion = { ...version, richtext };
      }
      const response: Response<VersionPublicacion> = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/actualizarVersion/${idVersionPublicacion}`,
        updatedVersion
      );
      if (response.data.status == "Error") {
        throw new Error(response.data.message);
      }
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

  console.log(version);

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
                    <Label>Imagen de portada</Label>
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
                  <RichTextEditor
                    editorContent={version.richtext}
                    refEditor={editorRef}
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
                  {version?.categorias && categorias && (
                    <div className="flex flex-col">
                      <Label>Categorías</Label>
                      <MultiSelect
                        options={categorias.map((categoria) => ({ value: categoria.id.toString(), label: categoria.nombre })) || []}
                        onValueChange={(values) => setVersion({ ...version, categorias : values.map((value) => Number(value)) }) }
                        defaultValue={version.categorias.map((id) => id.toString())}
                        placeholder="Selecciona categorias"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                      />
                    </div>
                  )}
                  
                  {/* Etiquetas */}
                  <div className="flex flex-col">
                    <Label>Etiquetas</Label>
                    <MultiSelect
                      options={etiquetas.map((etiqueta) => ({ value: etiqueta.id.toString(), label: etiqueta.nombre })) || []}
                      onValueChange={(values) => setVersion({ ...version, etiquetas: values.map((value) => Number(value)) })}
                      defaultValue={version.etiquetas.map((id) => id.toString())}
                      placeholder="Selecciona etiquetas"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
                    />
                  </div>

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
