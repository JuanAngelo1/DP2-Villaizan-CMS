import { Comentario, Response } from "@web/types";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@repo/ui/components/badge";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Separator } from "@repo/ui/components/separator";
import { Textarea } from "@repo/ui/components/textarea";
import { cn } from "@repo/ui/lib/utils";
import ChipEstadoAprobacion from "./ChipEstadoAprobacion";

function formatDate(isoString: string | undefined): string {
  if (!isoString) return "--";
  const date = new Date(isoString);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

function ComentarioDetailView({ id }: { id: string }) {
  const router = useRouter();
  if (!id) router.push('/admin/contenido?content=comentarios');

  const [isLoading, setIsLoading] = useState(false);
  const [comentario, setComentario] = useState<Comentario | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response: Response<Comentario> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/comentario/obtenerxId/${id}`
        );
        if (response.data.status === "Error") throw new Error(response.data.message);

        console.log("Mira el comentario ", response);
        setComentario(response.data.result);
      } catch (error) {
        console.error("Ups! Algo salio mal -> ", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Card className="flex h-auto flex-1 flex-col overflow-y-hidden">
      <CardHeader>
        <div className="flex flex-row items-center gap-1">
          <Link
            className={cn(buttonVariants({ variant: "ghost" }), "h-7 w-6")}
            href={{ query: { content: "comentarios" } }}
          >
            <ChevronLeft className="h-5 w-5 shrink-0" />
          </Link>
          <CardTitle className="text-xl">[Contenido del comentario]</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <Separator orientation="horizontal" />
        <main className="mt-4 flex flex-1 flex-row gap-10">
          <section className="flex flex-1 flex-col gap-4">
            <h2 className="text-lg font-semibold">Informacion del contenido</h2>

            <div>
              <Label className="font-semibold">Publicación relacionada</Label>
              <div className="flex flex-row items-center gap-1">
                <Input defaultValue={comentario?.publicacion.titulo} readOnly />
                <Button>Ver publicación</Button>
              </div>
            </div>

            <div>
              <Label className="font-semibold">Comentario</Label>
              <Textarea defaultValue={comentario?.comentario} readOnly className="min-h-[100px]" />
            </div>

            <div>
              <Label className="font-semibold">Fecha de publicación de comentario</Label>
              <Input defaultValue={formatDate(comentario?.fecha)} readOnly />
            </div>
          </section>

          <Separator orientation="vertical" className="h-full" />

          <section className="flex flex-1 flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex w-fit flex-col gap-1">
                <Label>Estado</Label>
                <ChipEstadoAprobacion comentario={comentario} />
              </div>

              <div>
                <Label>Usuario relacionado</Label>
                <Input
                  defaultValue={`${comentario?.usuario.nombre} ${comentario?.usuario.apellido} (${comentario?.usuario.correo})`}
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant={"outline"}>Reestablecer a revisión</Button>
              <Button>Desaprobar comentario</Button>
            </div>
          </section>
        </main>
      </CardContent>
    </Card>
  );
}

export default ComentarioDetailView;
