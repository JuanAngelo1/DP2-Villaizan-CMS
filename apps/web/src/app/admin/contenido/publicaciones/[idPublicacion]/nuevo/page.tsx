"use client";

import RichTextEditor from "@web/src/app/_components/RichTextEditor";
import TextEditor from "@web/src/app/_components/TextEditor";
import { Categoria, Etiqueta, Response } from "@web/types";
import axios from "axios";
import { AsteriskIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { type Editor } from "reactjs-tiptap-editor";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import DateTimePicker from "@repo/ui/components/date-time-picker";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { MultiSelect } from "@repo/ui/components/multi-select";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
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
  categorias: number[];
  etiquetas: number[];
  imagenes: string[];
}

interface VersionPublicacionReponse {
  id: number;
}

interface Imagen {
  file: Blob | null;
  urlimagen?: string;
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
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef<{ editor: Editor | null }>(null);

  useEffect(() => {
    const fetchEtiquetasCategorias = async () => {
      try {
        const responseEtiquetas: Response<Etiqueta[]> = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/etiqueta`);
        if (responseEtiquetas.data.status == "Error") {
          throw new Error(responseEtiquetas.data.message);
        }
        const responseCategorias: Response<Categoria[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/categoria`
        );
        if (responseCategorias.data.status == "Error") {
          throw new Error(responseCategorias.data.message);
        }
        setCategorias(responseCategorias.data.result);
        setEtiquetas(responseEtiquetas.data.result);
      } catch (error: any) {
        toast({
          title: "Error en carga",
          description: error.message || "Ocurrió un error al cargar las etiquetas y categorías.",
          variant: "destructive",
        });
      }
    };

    fetchEtiquetasCategorias();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Logica para guardar y obtener la url de la imagen de portada
      // para categorias y etiquetas, se envia un array de ids
      let updatedVersion = { ...version };
      if (updatedVersion.urlimagen === null || updatedVersion.urlimagen === "") {
        throw new Error("La imagen de portada es requerida");
      }

      // logica para botener la informacion de richtext
      if (editorRef.current?.editor) {
        updatedVersion.richtext = editorRef.current.editor.getHTML();
      }

      const response: Response<VersionPublicacionReponse> = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/crearVersion/${idPublicacion}`,
        updatedVersion
      );
      if (response.data.status == "Error") {
        throw new Error(response.data.message);
      }
      toast({
        title: "Versión creada",
        description: `La versión de la publicación se creó con éxito`,
      });
      router.push(`/admin/contenido/publicaciones/${idPublicacion}/${response.data.result.id}`);
    } catch (error: any) {
      toast({
        title: "Error en creación",
        description: error.message || "Ocurrió un error al crear la versión de la publicación.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContent title={version?.titulo || "[Titulo de publicacion]"}>
      <Separator />
      <section className="flex h-full w-full flex-row gap-8 overflow-y-auto py-4">
        {/* Información del Contenido */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto *:flex *:flex-col *:gap-2">
          <h3 className="text-lg font-semibold">Información del contenido</h3>
          {/* Título */}
          <div>
            <Label className="flex flex-row gap-1">
              Título <p className="text-red-500">*</p>
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
              Slug <p className="text-red-500">*</p>
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
              Descripción <p className="text-red-500">*</p>
            </Label>
            <Input
              placeholder="Ej. Descubre nuestro nuevo sabor de helado"
              value={version?.descripcion}
              onChange={(e) => setVersion({ ...version, descripcion: e.target.value })}
            />
          </div>
          {/* Imagen */}
          <div className="flex flex-col gap-2">
            <div className="flex w-full flex-row items-center justify-start gap-2">
              <Label className="flex flex-row gap-1">
                Imagen de portada <p className="text-red-500">*</p>
              </Label>
              <Popover>
                <PopoverTrigger asChild className="flex flex-row items-center gap-2">
                  <Button variant={"default"}>
                    Cambiar imagen <ImageIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-2">
                  <Label>Enlace de imagen</Label>
                  <Input
                    id="urlimagen"
                    placeholder="Ej. https://www.example.com/imagen.jpg"
                    defaultValue={version.urlimagen}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <Button
                    variant={"secondary"}
                    onClick={() => {
                      if (imageUrl) setVersion({ ...version, urlimagen: imageUrl });
                    }}
                  >
                    Cambiar imagen
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
            {version.urlimagen && (
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={version.urlimagen || ""}
                  alt="Imagen de portada"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            )}
          </div>
          {/* Texto Enriquecido */}
          <div className="w-full">
            <Label className="flex flex-row gap-1">
              Texto enriquecido <p className="text-red-500">*</p>
            </Label>
            <RichTextEditor refEditor={editorRef} />
          </div>
        </div>

        <Separator orientation="vertical" />

        {/* Información Adicional */}
        <div className="flex w-full flex-col gap-8 lg:w-1/4">
          <div className="flex flex-col gap-4 *:gap-2">
            {/* Categorías */}
            <div className="flex flex-col">
              <Label>Categorías</Label>
              <MultiSelect
                options={
                  categorias.map((categoria) => ({ value: categoria.id, label: categoria.nombre })) || []
                }
                onValueChange={(values) =>
                  setVersion({ ...version, categorias: values.map((value) => Number(value)) })
                }
                placeholder="Selecciona categorias"
                variant="inverted"
                animation={2}
                maxCount={3}
              />
            </div>

            {/* Etiquetas */}
            <div className="flex flex-col">
              <Label>Etiquetas</Label>
              <MultiSelect
                options={etiquetas.map((etiqueta) => ({ value: etiqueta.id, label: etiqueta.nombre })) || []}
                onValueChange={(values) =>
                  setVersion({ ...version, etiquetas: values.map((value) => Number(value)) })
                }
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
          </div>

          {/* Botones de Acción */}
          <div className="mt-auto flex flex-wrap items-end justify-end gap-2">
            <Button variant={"ghost"} onClick={() => router.back()}>
              Cancelar edición
            </Button>
            <Button variant={"default"} onClick={() => handleSave()} disabled={loading} isLoading={loading}>
              Crear publicación
            </Button>
          </div>
        </div>
      </section>
    </MainContent>
  );
}

export default NuevoVersionPage;
