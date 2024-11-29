"use client";

import { Fruta } from "@web/types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@repo/ui/lib/utils";

function Frutas({ className, frutas }: { className?: string; frutas: Fruta[] }) {
  return (
    <section>
      <h1 className={cn("text-4xl", className)}>Quienes son los Villaheroes?</h1>
      <p className="text-lg">
        Los Villaheroes son las frutas que se unieron para proteger VillaPalmera, la ciudad de las paletas.
        Juntan sus poderes para combatir a todos los Villanos! Enterate mas sobre ellos <span className="font-bold underline cursor-pointer"><Link href={'/sabores'}>aquí!</Link></span>
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {frutas.map((fruta) => {
          return <FrutaDisplay fruta={fruta} key={fruta.id} />;
        })}
      </div>
    </section>
  );
}
export default Frutas;

function FrutaDisplay({ fruta }: { fruta: Fruta }) {
  const contenido_educativo = fruta.vi_contenidoeducativo.filter(
    (contenido) => contenido.tipocontenido === "Imagen"
  );
  let imagen;

  if (contenido_educativo.length === 0) imagen = "/sabores/missing.png";
  else imagen = contenido_educativo[0].urlcontenido;

  return (
    <Link className="group/item relative flex aspect-square p-3 transition-all hover:p-0" href={`/sabores?id_fruta=${fruta.id}`}>
      <Image
        src={imagen}
        alt={fruta.nombre}
        height={1000}
        width={1000}
        className="z-10 h-full w-full object-contain"
      />
      <circle className="absolute bottom-[15%] left-[15%] right-[15%] top-[15%] rounded-full bg-red-800 transition-all group-hover/item:bottom-[10%] group-hover/item:left-[10%] group-hover/item:right-[10%] group-hover/item:top-[10%] group-hover/item:bg-red-700 group-hover/item:shadow-xl" />
    </Link>
  );
}
