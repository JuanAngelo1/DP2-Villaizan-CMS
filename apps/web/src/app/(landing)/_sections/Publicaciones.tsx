// Asegúrate de que la ruta sea correcta
import { publicaciones } from "@web/src/app/data/publicaciones";
import Link from "next/link";
import React from "react";
import { Button } from "@repo/ui/components/button";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";
import CardPublication from "../_components/card-publication";

const Publicaciones: React.FC = () => {
  return (
    <section className="bg-gray-100 px-4 py-24" id="publicaciones">
      <MaxWidthWrapper className="flex flex-col items-center">
        {/* Título y botón */}
        <div className="flex w-full flex-col items-center justify-between gap-4 text-center md:flex-row font-['Abhaya_Libre']">
          <h1 className="md:text-7xl sm:text-5xl text-4xl ">Publicaciones</h1>
          <Button className="text-md">
            <Link href="/publicaciones">
              Ver todos
            </Link>
          </Button>
        </div>
        <p className="text-start w-full text-muted-foreground">Enterate de las nuevas novedades dentro de la magia de nuestros helados</p>
        {/* Publicaciones */}
        <div className="mt-5 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {publicaciones.map((pub) => (
            <CardPublication key={pub.id} publication={pub} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Publicaciones;
