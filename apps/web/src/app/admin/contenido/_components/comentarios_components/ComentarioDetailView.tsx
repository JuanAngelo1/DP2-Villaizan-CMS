import { Comentario, Response } from "@web/types";
import { formatDate } from "@web/utils/date";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@repo/ui/components/badge";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Separator } from "@repo/ui/components/separator";
import { Skeleton } from "@repo/ui/components/skeleton";
import { Textarea } from "@repo/ui/components/textarea";
import { cn } from "@repo/ui/lib/utils";
import ChipEstadoAprobacion from "./ChipEstadoAprobacion";

function ComentarioDetailView({ id }: { id: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  if (!id) router.push("/admin/contenido?content=comentarios");

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [comentario, setComentario] = useState<Comentario | null>(null);

  const handleBackButton = () => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete("id_comentario");
    router.replace(`${pathname}?${nextSearchParams}`);
  };

  

  const handleSetEstadoAprobacion = async (_comentario: Comentario, estado: boolean | null) => {
    try {
      setIsUpdating(true);
      const response: Response<Comentario> = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comentario/${id}`,
        { comentario: _comentario.comentario, estadoaprobacion: estado }
      );
      if (response.data.status === "Error") throw new Error(response.data.message);

      setComentario({ ..._comentario, estadoaprobacion: estado });
    } catch (error) {
      console.error("Ups! Algo salio mal -> ", error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response: Response<Comentario> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/comentario/${id}`
        );
        if (response.data.status === "Error") throw new Error(response.data.message);

        setComentario(response.data.result);
        console.log("Comentario: ", response.data.result);
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
          <Button variant={"ghost"} className={"h-7 w-6"} onClick={handleBackButton}>
            <ChevronLeft className="h-5 w-5 shrink-0" />
          </Button>
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
              {isLoading ? (
                <div className="flex flex-row rounded-md border px-2 py-2">
                  <Skeleton className="w-[60%] text-sm text-transparent">.</Skeleton>
                </div>
              ) : (
                <div className="flex flex-row items-center gap-1">
                  <Input defaultValue={comentario?.publicacion?.titulo} readOnly disabled={isUpdating} />
                  <Button disabled={isUpdating}>Ver publicación</Button>
                </div>
              )}
            </div>

            <div>
              <Label className="font-semibold">Comentario</Label>
              {isLoading ? (
                <div className="flex min-h-[100px] w-full flex-col rounded-md border p-2">
                  <Skeleton className="w-fit text-sm text-transparent">Este es un texto de carga</Skeleton>
                </div>
              ) : (
                <Textarea
                  defaultValue={comentario?.comentario}
                  readOnly
                  className="min-h-[100px]"
                  disabled={isUpdating}
                />
              )}
            </div>

            <div>
              <Label className="font-semibold">Fecha de publicación de comentario</Label>
              {isLoading ? (
                <div className="flex flex-row rounded-md border p-2">
                  <Skeleton className="w-40 text-sm text-transparent">.</Skeleton>
                </div>
              ) : (
                <Input defaultValue={formatDate(comentario?.fechacreacion)} readOnly disabled={isUpdating} />
              )}
            </div>
          </section>

          <Separator orientation="vertical" className="h-full" />

          <section className="flex flex-1 flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex w-fit flex-col gap-1">
                <Label>Estado</Label>
                {isLoading ? (
                  <div className="rounded-xs">
                    <Skeleton className="text-sm text-transparent">Estado en carga</Skeleton>
                  </div>
                ) : (
                  <ChipEstadoAprobacion comentario={comentario} disabled={isUpdating} />
                )}
              </div>

              <div>
                <Label>Usuario relacionado</Label>
                {isLoading ? (
                  <div className="flex flex-row rounded-md border p-2">
                    <Skeleton className="w-40 text-sm text-transparent">.</Skeleton>
                  </div>
                ) : (
                  <Input
                    defaultValue={`${comentario?.usuario.nombre} ${comentario?.usuario.apellido} (${comentario?.usuario.correo})`}
                    readOnly
                    disabled={isUpdating}
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              {isLoading || comentario === null ? (
                <>
                  <Skeleton className="h-9 w-40 text-transparent"></Skeleton>
                  <Skeleton className="h-9 w-40 text-transparent"></Skeleton>
                </>
              ) : comentario?.estadoaprobacion === null ? (
                <>
                  <Button
                    variant={"destructive"}
                    onClick={() => handleSetEstadoAprobacion(comentario, false)}
                    disabled={isUpdating}
                  >
                    Desaprobar comentario
                  </Button>
                  <Button
                    variant={"default"}
                    onClick={() => handleSetEstadoAprobacion(comentario, true)}
                    disabled={isUpdating}
                  >
                    Aprobar comentario
                  </Button>
                </>
              ) : comentario?.estadoaprobacion === true ? (
                <>
                  <Button
                    variant={"outline"}
                    onClick={() => handleSetEstadoAprobacion(comentario, null)}
                    disabled={isUpdating}
                  >
                    Reestablecer a revisión
                  </Button>
                  <Button
                    variant={"destructive"}
                    onClick={() => handleSetEstadoAprobacion(comentario, false)}
                    disabled={isUpdating}
                  >
                    Desaprobar comentario
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={"outline"}
                    onClick={() => handleSetEstadoAprobacion(comentario, null)}
                    disabled={isUpdating}
                  >
                    Reestablecer a revisión
                  </Button>
                  <Button
                    variant={"default"}
                    onClick={() => handleSetEstadoAprobacion(comentario, true)}
                    disabled={isUpdating}
                  >
                    Aprobar comentario
                  </Button>
                </>
              )}
            </div>
          </section>
        </main>
      </CardContent>
    </Card>
  );
}

export default ComentarioDetailView;
