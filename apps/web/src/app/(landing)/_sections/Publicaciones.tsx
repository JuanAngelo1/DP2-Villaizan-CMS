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
      <MaxWidthWrapper className="flex flex-col items-center gap-y-20">
        {/* Título y botón */}
        <div className="flex w-full flex-col items-center justify-between gap-4 text-center md:flex-row">
          <h2 className="text-3xl md:text-7xl">Publicaciones</h2>
          <Button className="text-xl">
            <Link href="/publicaciones" className="text-xl">
              Ver todos
            </Link>
          </Button>
        </div>
        {/* Publicaciones */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {publicaciones.map((pub) => (
            <CardPublication key={pub.id} publication={pub} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Publicaciones;
