// PublicacionManage.tsx
import { Calendar as CalendarIcon, Info } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@repo/ui/hooks/use-toast";
import React, { useEffect } from "react";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Calendar } from "@repo/ui/components/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Separator } from "@repo/ui/components/separator";
import { cn } from "@repo/ui/lib/utils";
import TextEditor from "@web/src/app/_components/TextEditor";
import MainContent from "../general_components/MainContent";
import { Badge } from "@repo/ui/components/badge";
import usePublicacion from "@web/src/app/services/api/publicaciones/hooks/usePublicacion";
import { Skeleton } from "@repo/ui/components/skeleton";
import { Publicacion, TipoPublicacion, VersionPublicacion } from "@web/types";
import { createPublicacion } from "@web/src/app/services/api/publicaciones";
import axiosInstance from "@web/src/app/services/axiosInstance";
import useCreatePublicacion from "@web/src/app/services/api/publicaciones/hooks/useCreatePublicacion";

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
  vi_version_publicacion: VersionPublicacion[];
  fechapublicacion?: string;
  fechacreacion?: string;
  fechaactualizacion?: string;
}

function PublicacionManage({ type, id, changeType }: PublicationManageProps) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const pub_action = searchParams.get('publication_action');
  const pub_id = searchParams.get('publication_id');
  const { publicacion, isLoading, error, fetchPublicacion } = usePublicacion();
  const { isLoading: isCreating, error: errorCreating, createPub: create } = useCreatePublicacion();
  const [pub, setPub] = React.useState<PublicacionInfoProps>({
    fecha_creacion: "",
    id_usuario: "us-cb74a272",
    vi_version_publicacion: [],
    titulo: "",
    slug: "",
    richtext: "",
    estado: "",
    categorias: [],
    etiquetas: [],
    fecha_publicacion: "",
    fecha_actualizacion: "",
    id_tipopublicacion: 1,
  });

  useEffect(() => {
    if (pub_action == "edit") {
      if (!pub_id && changeType) {
        changeType("list");
      } else if (pub_id) {
        fetchPublicacion(pub_id);
      }
    }
  }, []);

  useEffect(() => {
    if (publicacion) {
      setPub({
        fecha_creacion: publicacion?.fecha_creacion || "",
        id_usuario: "us-cb74a272",
        vi_version_publicacion: publicacion?.vi_version_publicacion || [],
        titulo: publicacion?.vi_version_publicacion[0]?.titulo || "",
        slug: publicacion?.vi_version_publicacion[0]?.slug || "",
        richtext: publicacion?.vi_version_publicacion[0]?.richtext || "",
        estado: publicacion?.vi_version_publicacion[0]?.estado_version?.nombre || "",
        categorias: publicacion?.vi_version_publicacion[0]?.categorias || [],
        etiquetas: publicacion?.vi_version_publicacion[0]?.etiquetas || [],
        fecha_publicacion: publicacion?.vi_version_publicacion[0]?.fechacreacion || "",
        fecha_actualizacion: publicacion?.vi_version_publicacion[0]?.fechaultimamodificacion || "",
        id_tipopublicacion: publicacion?.tipo_publicacion?.id ?? 0,
      })
    }
  }, [publicacion]);

  const manageCreation = async (pub: PublicacionInfoProps) => {
    try {
      const response = await create({
        ...pub,
        fechapublicacion: pub?.fechapublicacion || "",
        fechacreacion: pub?.fechacreacion || "",
        fechaactualizacion: pub?.fechaactualizacion || ""
      })
      toast({
        title: "Publicación creada",
        description: "La publicación ha sido creada exitosamente",
      });
      if (changeType) {
        changeType("edit", response?.data?.result?.id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {isLoading ? (
        <MainContent>
          <div className="flex flex-col gap-8">
            <Skeleton className="w-full h-8" />
            <Separator className="w-full"/>
            <div className="w-full flex flex-row justify-between gap-4">
              <Skeleton className="w-full h-8" />
              <Separator orientation="vertical" />
              <Skeleton className="w-2/3 h-8" />
            </div>
          </div>
        </MainContent>
      ) : (
        <MainContent title={pub?.titulo || "[Titulo de publicacion]"}>
          <Separator />
          <section className="flex h-full flex-row gap-4 overflow-y-auto py-4 *:flex *:flex-col *:gap-4 w-full">
              <div className="flex-[3] *:flex *:flex-col *:gap-2">
                <h3 className="text-lg font-semibold">Información del contenido</h3>
                <div>
                  <Label>Titulo <Asterisk /></Label>
                  <Input placeholder="Ej. Anuncio de nuevo sabor" onChange={(e) => setPub({...pub, id: pub?.id || '', titulo: e.target.value})} value={pub?.titulo} />
                </div>
                <div>
                  <Label className="flex flex-row">
                    Slug  <Asterisk /> <Info size={16} /> 
                  </Label>
                  <Input placeholder="Ej. anuncio-nuevo-sabor" onChange={(e) => setPub({...pub, id: pub?.id || '', slug: e.target.value})} value={pub?.slug} />
                </div>
                <div>
                  <Label>Texto enriquecido <Asterisk /></Label>
                  {type === "edit" && pub?.vi_version_publicacion[0]?.richtext && (
                    <TextEditor content={pub?.vi_version_publicacion[0]?.richtext || ""} onContentChange={(content: string) => setPub({...pub, id: pub?.id || '', richtext: content})} />
                  )}
                  {type === "create" && (
                    <TextEditor content={pub?.vi_version_publicacion[0]?.richtext || ""} onContentChange={(content: string) => setPub({...pub, id: pub?.id || '', richtext: content})} />
                  )}
                </div>
              </div>
              <Separator orientation="vertical" />
              <div className="w-3/12 flex flex-col justify-between h-full">
                <div className="*:flex *:gap-2 *:w-fit flex flex-col gap-4">
                  <div className="flex-col">
                    <Label>Estado</Label>
                    <Badge variant={"secondary"} className="w-fit">Borrador</Badge>
                  </div>
                  {/* <div className="flex-col">
                    <Label>Categorías</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"}>Elegir categorías</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Command>
                          <CommandGroup>
                            <CommandInput placeholder="Buscar..." />
                            <CommandList>
                              <CommandItem>Noticias</CommandItem>
                              <CommandItem>Eventos</CommandItem>
                              <CommandItem>Blog</CommandItem>
                              <CommandItem>Productos</CommandItem>
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex-col">
                    <Label>Etiquetas</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"}>Elegir etiquetas</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Command>
                          <CommandGroup>
                            <CommandInput placeholder="Buscar..." />
                            <CommandList>
                              <CommandItem>Noticias</CommandItem>
                              <CommandItem>Eventos</CommandItem>
                              <CommandItem>Blog</CommandItem>
                              <CommandItem>Productos</CommandItem>
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div> */}
                  <div className="flex-col">
                    <Label>Fecha de publicación</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !pub?.fecha_publicacion && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {pub?.fecha_publicacion ? format(pub?.fecha_publicacion, "PPP", {locale: es}) : <span>Seleccionar una fecha</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={pub?.fecha_publicacion ? new Date(pub?.fecha_publicacion) : undefined}
                          onSelect={(date) => setPub({...pub, fecha_publicacion: date ? format(date, "yyyy-MM-dd", {locale: es}) : "", titulo: pub?.titulo || "", slug: pub?.slug || "", richtext: pub?.richtext || "", estado: pub?.estado || "", categorias: pub?.categorias || [], etiquetas: pub?.etiquetas || [], fecha_creacion: pub?.fecha_creacion || "", fecha_actualizacion: pub?.fecha_actualizacion || "", id_usuario: pub?.id_usuario || "", vi_version_publicacion: pub?.vi_version_publicacion || []})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex-col">
                    <Label>Fecha de creación</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          disabled
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !pub?.fecha_creacion && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {pub?.fecha_creacion ? format(pub?.fecha_creacion, "PPP", {locale: es}) : <span>Seleccionar una fecha</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={pub?.fecha_creacion ? new Date(pub?.fecha_creacion) : undefined}
                          onSelect={(date) => setPub({...pub, fecha_creacion: date ? format(date, "yyyy-MM-dd") : "", titulo: pub?.titulo || "", slug: pub?.slug || "", richtext: pub?.richtext || "", estado: pub?.estado || "", categorias: pub?.categorias || [], etiquetas: pub?.etiquetas || [], fecha_publicacion: pub?.fecha_publicacion || "", fecha_actualizacion: pub?.fecha_actualizacion || "", id_usuario: pub?.id_usuario || "", vi_version_publicacion: pub?.vi_version_publicacion || []})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>  
                  <div className="flex-col">
                    <Label>Última actualización</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          disabled
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !pub?.fecha_actualizacion && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {pub?.fecha_actualizacion ? format(pub?.fecha_actualizacion, "PPP", {locale: es}) : <span>Seleccionar una fecha</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={pub?.fecha_actualizacion ? new Date(pub?.fecha_actualizacion) : undefined}
                          onSelect={(date) => setPub({...pub, fecha_actualizacion: date ? format(date, "yyyy-MM-dd") : "", titulo: pub?.titulo || "", slug: pub?.slug || "", richtext: pub?.richtext || "", estado: pub?.estado || "", categorias: pub?.categorias || [], etiquetas: pub?.etiquetas || [], fecha_publicacion: pub?.fecha_publicacion || "", fecha_creacion: pub?.fecha_creacion || "", id_usuario: pub?.id_usuario || "", vi_version_publicacion: pub?.vi_version_publicacion || []})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="w-full flex flex-wrap justify-end items-end gap-2">
                  <Button variant={"ghost"} onClick={() => changeType && changeType("list")}>Cancelar edición</Button>
                  <Button variant={"default"} onClick={() => pub && manageCreation(pub)}>Guardar cambios</Button>
                </div>
              </div>
          </section>
        </MainContent>
      )}
    </>
  );
}

export default PublicacionManage;

function Asterisk() {
  return <span className="text-red-500">*</span>;
}

function decodeUnicode(str: string) {
  return str.replace(/\\u[\dA-F]{4}/gi, 
    function (match) {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });
}