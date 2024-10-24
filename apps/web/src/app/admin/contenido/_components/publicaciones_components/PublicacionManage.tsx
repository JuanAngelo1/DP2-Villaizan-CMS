// PublicacionManage.tsx
import { Info } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Button, buttonVariants } from "@repo/ui/components/button";
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
import { Publicacion } from "@web/types";

interface PublicationManageProps {
  type: "create" | "edit";
  id?: string | null;
  changeType?: (type: string | null) => void;
}

const createPub = async () => {
  // createPublicacion
}

const createVersionPub = async () => {
  // createVersionPublicacion
}

function PublicacionManage({ type, id, changeType }: PublicationManageProps) {
  const searchParams = useSearchParams();
  const pub_action = searchParams.get('publication_action');
  const pub_id = searchParams.get('publication_id');
  const { publicacion, isLoading, error, fetchPublicacion } = usePublicacion();
  const [pub, setPub] = React.useState<Publicacion | null>(null);

  useEffect(() => {
    if (pub_action == "edit") {
      if (!pub_id && changeType) {
        changeType("list");
      } else if (pub_id) {
        fetchPublicacion(pub_id);
        setPub(publicacion);
      }
    }

    if (pub_action == "create") {
      setPub(null);
    }
  }, []);

  console.log(publicacion);

  return (
    <MainContent title={"[Titulo de publicacion]"}>
      <Separator />
      <section className="flex h-full flex-row gap-4 overflow-y-auto py-4 *:flex *:flex-col *:gap-4 w-full">
        {isLoading && <Skeleton />}
        <div className="flex-[4] *:flex *:flex-col *:gap-2">
          <h3 className="text-lg font-semibold">Información del contenido</h3>
          <div>
            <Label>Titulo <Asterisk /></Label>
            <Input placeholder="Ej. Anuncio de nuevo sabor" />
          </div>
          <div>
            <Label className="flex flex-row">
              Slug  <Asterisk /> <Info size={16} /> 
            </Label>
            <Input placeholder="Ej. anuncio-nuevo-sabor" />
          </div>
          <div>
            <Label>Texto enriquecido <Asterisk /></Label>
            <TextEditor />
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="w-1/5 *:flex *:gap-2 *:w-fit">
          <div className="flex-col">
            <Label>Estado</Label>
            <Badge variant={"default"} className="w-fit">Publicado</Badge>
          </div>
          <div className="flex-col">
            <Label>Categorías</Label>
            <Popover>
              <PopoverTrigger>
                Elegir categoría
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
              <PopoverTrigger>
                Elegir etiquetas
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
            <Label>Fecha de publicación</Label>
            <Input type="date" />
          </div>
          <div className="flex-col">
            <Label>Fecha de creación</Label>
            <Input type="date" disabled />
          </div>
          <div className="flex-col">
            <Label>Última actualización</Label>
            <Input type="date" disabled />
          </div>
          <div className="w-full flex flex-wrap jusify-around align-bottom items-end">
            <Button variant={"ghost"} onClick={() => changeType && changeType("list")}>Cancelar</Button>
            <Button variant={"default"} onClick={() => {}}>Guardar</Button>
          </div>
        </div>
      </section>
    </MainContent>
  );
}

export default PublicacionManage;

function Asterisk() {
  return <span className="text-red-500">*</span>;
}