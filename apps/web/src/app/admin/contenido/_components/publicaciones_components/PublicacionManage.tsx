// /apps/web/src/components/PublicacionManage.tsx
import TextEditor from "@web/src/app/_components/TextEditor";
import useCreatePublicacion from "@web/src/app/services/api/publicaciones/hooks/useCreatePublicacion";
import usePublicacion from "@web/src/app/services/api/publicaciones/hooks/usePublicacion";
import { TipoPublicacion, VersionPublicacion } from "@web/types";
import { Calendar as CalendarIcon, Info } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";
import DateTimePicker from "@repo/ui/components/date-time-picker";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { Separator } from "@repo/ui/components/separator";
import { Skeleton } from "@repo/ui/components/skeleton";
import { useToast } from "@repo/ui/hooks/use-toast";
import { cn } from "@repo/ui/lib/utils";
import MainContent from "../general_components/MainContent";

interface PublicationManageProps {
  type: "create" | "edit";
  id?: string | null;
  changeType?: (type: string | null, id?: string | null) => void;
}

interface PublicacionInfoProps {
  titulo: string;
  slug: string;
  richtext: string;
  estado: string;
  categorias: string[];
  etiquetas: string[];
  fecha_publicacion: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  id_tipopublicacion: TipoPublicacion["id"];
  id_usuario: string;
  fechapublicacion: string;
  fechacreacion: string;
  fechaactualizacion: string;
  vi_version_publicacion: VersionPublicacion[];
}

const PublicacionManage: React.FC<PublicationManageProps> = ({ type, id, changeType }) => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pub_action = searchParams.get("publication_action");
  const pub_id = searchParams.get("publication_id");

  const { publicacion, isLoading, error, fetchPublicacion } = usePublicacion();
  const { isLoading: isCreating, error: errorCreating, createPub: create } = useCreatePublicacion();

  const [pub, setPub] = React.useState<PublicacionInfoProps | null>(null);

  // Manejar la carga de la publicación en modo edición
  useEffect(() => {
    if (type === "edit" && pub_id) {
      fetchPublicacion(pub_id);
    }
  }, [type, pub_id, fetchPublicacion]);

  // Actualizar el estado `pub` cuando `publicacion` cambia
  useEffect(() => {
    if (publicacion) {
      const version = publicacion.vi_version_publicacion[0];
      setPub({
        titulo: version?.titulo || "",
        slug: version?.slug || "",
        richtext: version?.richtext || "",
        estado: version?.estado_version?.nombre || "Borrador",
        categorias: publicacion.categorias || [],
        etiquetas: publicacion.etiquetas || [],
        fecha_publicacion: version?.fechacreacion || "",
        fecha_creacion: publicacion.fechacreacion || "",
        fecha_actualizacion: version?.fechaultimamodificacion || "",
        id_tipopublicacion: publicacion.tipo_publicacion?.id ?? 1,
        id_usuario: publicacion.id_usuario || "us-cb74a272",
        fechapublicacion: publicacion.fechapublicacion || "",
        fechacreacion: publicacion.fechacreacion || "",
        fechaactualizacion: version?.fechaultimamodificacion || "",
        vi_version_publicacion: publicacion.vi_version_publicacion || [],
      });
    }
  }, [publicacion]);

  useEffect(() => {
    if (type == 'create') {
      setPub({
        titulo: '',
        slug: '',
        richtext: '',
        estado: 'Borrador',
        categorias: [],
        etiquetas: [],
        fecha_publicacion: '',
        fecha_creacion: '',
        fecha_actualizacion: '',
        id_tipopublicacion: 1,
        id_usuario: 'us-cb74a272',
        fechapublicacion: '',
        fechacreacion: '',
        fechaactualizacion: '',
        vi_version_publicacion: [],
      });
    }
  }, [type]);

  // Manejar la creación de una nueva publicación
  const handleCreate = async () => {
    try {
      if(!pub) throw Error("No se ha podido crear la publicación");
      const response = await create(pub);
      toast({
        title: "Publicación creada",
        description: "La publicación ha sido creada exitosamente",
      });
      if (changeType) {
        changeType("edit", response?.data?.result?.id);
      } else {
        // Redirigir o realizar otra acción según sea necesario
        router.push(`/publicaciones/${response?.data?.result?.id}`);
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Hubo un error al crear la publicación.",
        variant: "destructive",
      });
    }
  };

  // Manejar la actualización de una publicación existente
  const handleUpdate = async () => {
    // Implementa la lógica de actualización según tu API
    // Por ejemplo, podrías tener un hook `useUpdatePublicacion`
    // Similar al `useCreatePublicacion`
    // Aquí proporciono una estructura básica:
    /*
    try {
      const response = await updatePub(pub_id, pub);
      toast({
        title: "Publicación actualizada",
        description: "La publicación ha sido actualizada exitosamente",
      });
      if (changeType) {
        changeType("edit", response?.data?.result?.id);
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Hubo un error al actualizar la publicación.",
        variant: "destructive",
      });
    }
    */
    toast({
      title: "Funcionalidad no implementada",
      description: "La actualización de publicaciones aún no está implementada.",
      variant: "default",
    });
  };

  // Determinar si se está en modo creación o edición
  const isEditMode = type === "edit";

  // Evitar bucles de renderizado al establecer el estado `pub`
  // Asegurarse de que `setPub` no se llame de manera condicional que podría desencadenar renders
  // Ya está manejado en el useEffect anterior

  // Debugging: Verificar el estado `pub`
  useEffect(() => {
    console.log("Estado de Publicación:", pub);
  }, [pub]);

  return (
    <>
      {isLoading ? (
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
        <MainContent title={pub?.titulo || "[Titulo de publicacion]"}>
          <Separator />

          {isLoading || !pub ? (
            <div className="flex flex-col gap-8">
              <Skeleton className="h-8 w-full" />
              <Separator className="w-full" />
              <div className="flex w-full flex-row justify-between gap-4">
                <Skeleton className="h-8 w-full" />
                <Separator orientation="vertical" />
                <Skeleton className="h-8 w-2/3" />
              </div>
            </div>
          ) : (
            <section className="flex w-full flex-col gap-8 overflow-y-auto py-4 lg:flex-row">
              {/* Información del Contenido */}
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
                <h3 className="text-lg font-semibold">Información del contenido</h3>
                {/* Título */}
                <div>
                  <Label>
                    Título <Asterisk />
                  </Label>
                  <Input
                    placeholder="Ej. Anuncio de nuevo sabor"
                    onChange={(e) => setPub({ ...pub, titulo: e.target.value })}
                    value={pub?.titulo}
                  />
                </div>
                {/* Slug */}
                <div>
                  <Label className="flex items-center">
                    Slug <Asterisk /> <Info size={16} className="ml-1 cursor-pointer" />
                  </Label>
                  <Input
                    placeholder="Ej. anuncio-nuevo-sabor"
                    onChange={(e) => setPub({ ...pub, slug: e.target.value })}
                    value={pub?.slug}
                  />
                </div>
                {/* Texto Enriquecido */}
                <div>
                  <Label>
                    Texto enriquecido <Asterisk />
                  </Label>
                  <TextEditor
                      content={pub?.richtext || ""}
                      onContentChange={(content: string) => setPub({ ...pub, richtext: content })}
                  />
                </div>
              </div>

              {/* Información Adicional */}
              <div className="flex w-full flex-col gap-8 lg:w-1/4">
                <div className="flex flex-col gap-4 *:gap-2">
                  {/* Estado */}
                  <div className="flex flex-col">
                    <Label>Estado</Label>
                    <Badge variant={"secondary"} className="w-fit">
                      {pub?.estado || "Borrador"}
                    </Badge>
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
                      date={pub?.fecha_publicacion}
                      setDate={(newDate: string) => setPub({ ...pub, fecha_publicacion: newDate })}
                      placeholder="Seleccionar fecha y hora"
                    />
                  </div>
                  {/* Fecha de Creación (Deshabilitada) */}
                  <div className="flex flex-col">
                    <Label>Fecha de creación</Label>
                    <DateTimePicker
                      date={pub?.fecha_creacion}
                      setDate={(newDate: string) => setPub({ ...pub, fecha_creacion: newDate })}
                      placeholder="Seleccionar fecha y hora"
                      disabled
                    />
                  </div>
                  {/* Última Actualización (Deshabilitada) */}
                  <div className="flex flex-col">
                    <Label>Última actualización</Label>
                    <DateTimePicker
                      date={pub?.fecha_actualizacion}
                      setDate={(newDate: string) => setPub({ ...pub, fecha_actualizacion: newDate })}
                      placeholder="Seleccionar fecha y hora"
                      disabled
                    />
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="mt-auto flex flex-wrap items-end justify-end gap-2">
                  <Button variant={"ghost"} onClick={() => changeType && changeType("list")}>
                    Cancelar edición
                  </Button>
                  <Button
                    variant={"default"}
                    onClick={isEditMode ? handleUpdate : handleCreate}
                    disabled={isCreating}
                  >
                    {isEditMode ? "Guardar nueva versión" : "Crear publicación"}
                  </Button>
                </div>
              </div>
            </section>
          )}
        </MainContent>
      )}
    </>
  );
};

export default PublicacionManage;

// Componente Asterisk
const Asterisk: React.FC = () => {
  return <span className="text-red-500">*</span>;
};
