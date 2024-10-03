import { Ellipsis, ListFilter, Plus } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { CardTable } from "@repo/ui/components/card-table";
import { Input } from "@repo/ui/components/input";
import { Table, TableBody, TableCell, TableRow } from "@repo/ui/components/table";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/tabs";

function Publicaciones() {
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
          <CardTitle className="text-xl">Publicaciones</CardTitle>
          <CardDescription>
            Administra las noticias y blogs más recientes relacionados a la empresa, productos, eventos, etc.
          </CardDescription>
        </CardHeader>

        <CardContent >

        <CardTable>
            <p className="text-sm font-semibold underline">Popular</p>
            <p className="text-sm font-light">Descripcion 1</p>
            <Ellipsis />
        </CardTable>
        </CardContent>
      </Card>
    </div>
  );
}
export default Publicaciones;
