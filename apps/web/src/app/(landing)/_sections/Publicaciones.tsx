"use client";

// Asegúrate de que la ruta sea correcta
import { publicaciones } from "@web/src/app/data/publicaciones";
import { ControlledError, Response, VersionPublicacion } from "@web/types";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@repo/ui/components/button";
import { useToast } from "@repo/ui/hooks/use-toast";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";
import CardPublication from "../_components/card-publication";

const Publicaciones: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [publicaciones, setPublicaciones] = useState<VersionPublicacion[]>([]);

  useEffect(() => {
    async function fetchPublicaciones() {
      try {
        setIsLoading(true);
        const response: Response<VersionPublicacion[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/versionesPublicadas/4`
        );

        if (response.data.status !== "Success") throw new ControlledError(response.data.message);

        console.log("Publicaciones: ", response.data.result);
        setPublicaciones(response.data.result);
      } catch (error) {
        if (error instanceof ControlledError) {
          toast({
            title: "Error al cargar las publicaciones",
            description: error.message,
          });
        } else {
          console.log("Mira el error al cargar las publicaciones: ", error);
          toast({
            title: "Error al cargar las publicaciones",
            description: "Ocurrió un error inesperado. Intenta de nuevo.",
          });
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchPublicaciones();
  }, []);

  return (
    <section className="bg-gray-100 px-4 py-24" id="publicaciones">
      <MaxWidthWrapper className="flex flex-col items-center">
        <div className="flex w-full flex-col items-center justify-between gap-4 text-center font-['Abhaya_Libre'] md:flex-row">
          <h1 className="text-4xl sm:text-5xl md:text-7xl">Publicaciones</h1>
          <Button className="text-md">
            <Link href="/publicaciones">Ver todos</Link>
          </Button>
        </div>
        <p className="text-muted-foreground w-full text-start">
          Enterate de las nuevas novedades dentro de la magia de nuestros helados
        </p>
        <div className="mt-5 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {publicaciones.map((pub) => (
            <CardPublication key={pub.id} publicacion={pub} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Publicaciones;
