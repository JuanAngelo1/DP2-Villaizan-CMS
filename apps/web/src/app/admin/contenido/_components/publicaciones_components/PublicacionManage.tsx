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

interface PublicationManageProps {
  type: "create" | "edit";
  id?: string | null;
  changeType?: (type: string | null) => void;
}

function PublicacionManage({ type, id, changeType }: PublicationManageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (type === "edit" && !id && changeType) {
      changeType("list");
    }
  }, [type, id, changeType]);

  return (
    <MainContent title={"[Titulo de publicacion]"}>
      <Separator />
      <section className="flex h-full flex-row gap-4 overflow-y-auto py-4 *:flex *:flex-col *:gap-4">
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
        <div className="flex-[1] *:flex *:flex-col *:gap-2 *:w-fit">
          <div>
            <Label>Estado</Label>
            <Badge variant={"default"} className="w-fit">Publicado</Badge>
          </div>
          <div>
            <Label>Categorías</Label>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" className="w-fit">Elegir categoría</Button>
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
          <div>
            <Label>Etiquetas</Label>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" className="w-fit">Elegir etiquetas</Button>
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
          <div>
            <Label>Fecha de publicación</Label>
            <Input type="date" />
          </div>
          <div>
            <Label>Fecha de creación</Label>
            <Input type="date" disabled />
          </div>
          <div>
            <Label>Última actualización</Label>
            <Input type="date" disabled />
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