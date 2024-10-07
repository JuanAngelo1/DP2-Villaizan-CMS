import InputWithLabel from "@web/src/app/(auth)/_components/InputWithLabel";
import { Delete, Ellipsis, FilePenLine, ListFilter, Plus } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/sheet";
import { Table, TableBody, TableCell, TableRow } from "@repo/ui/components/table";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/tabs";

type Etiqueta = {
  id: string;
  nombre: string;
  descripcion: string;
};

const etiquetas: Etiqueta[] = [
  {
    id: "1",
    nombre: "Popular",
    descripcion: "Etiqueta popular",
  },
  {
    id: "2",
    nombre: "Recomendado",
    descripcion: "Etiqueta recomendada",
  },
  {
    id: "3",
    nombre: "Limitado",
    descripcion: "Etiqueta limitada",
  },
  {
    id: "4",
    nombre: "Temporada",
    descripcion: "Etiqueta de temporada",
  },
];

function Etiquetas() {
  return (
    <div className="flex w-full flex-col gap-2">
      <section className="flex flex-row justify-between">
        <Tabs defaultValue="account" className="">
          <TabsList>
            <TabsTrigger value="account">Activos</TabsTrigger>
            <TabsTrigger value="password">Archivados</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-row justify-end gap-2">
          <Input placeholder="Buscar..." />
          <Button variant={"secondary"} className="gap-2">
            <ListFilter className="h-4 w-4" />
            <p>Filtrar</p>
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <p>Agregar</p>
          </Button>
        </div>
      </section>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-xl">Etiquetas</CardTitle>
          <CardDescription>
            Administra las etiquetas de las publicaciones para que tengan una identificacion a mayor detalle.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          {etiquetas.map((etiqueta) => {
            return (
              <section key={etiqueta.id} className="flex items-center rounded-md border px-4 py-3">
                <div className="flex-1 text-sm font-semibold underline">{etiqueta.nombre}</div>
                <div className="flex-1 text-sm font-light">{etiqueta.descripcion}</div>
                <Popover>
                  <PopoverTrigger>
                    <Ellipsis />
                  </PopoverTrigger>
                  <PopoverContent className="flex w-fit flex-col gap-0 p-1" side="left" align="start">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant={"ghost"} className="justify-start">
                          <FilePenLine className="h-4 w-4" />
                          <p>Editar</p>
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle className="text-start text-xl">Editar categoría</SheetTitle>
                        </SheetHeader>
                        <div className="mt-2 flex flex-col gap-2">
                          <InputWithLabel label="Nombre de categoría" placeholder="Ej. Popular" />
                          <InputWithLabel label="Descripción breve" placeholder="Ej. Articulos de paletas" />
                          <Button className="ml-auto mt-1 w-fit">Guardar</Button>
                        </div>
                      </SheetContent>
                    </Sheet>

                    <Button variant={"ghost"} className="justify-start hover:bg-red-100/50">
                      <Delete className="h-4 w-4 stroke-red-500" />
                      <p className="text-red-500">Eliminar</p>
                    </Button>
                  </PopoverContent>
                </Popover>
              </section>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

export default Etiquetas;
