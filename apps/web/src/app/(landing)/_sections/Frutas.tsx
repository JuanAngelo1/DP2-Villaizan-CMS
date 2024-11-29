"use client";

import { sabores } from "@web/src/app/data/sabores";
import { Fruta } from "@web/types";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@repo/ui/components/carousel";

// Asegúrate de tener un botón reutilizable

function Frutas({ frutas }: { frutas: Fruta[] }) {
  return (
    <section id="sabores" className="flex flex-col items-center justify-start font-['Abhaya_Libre']">
      <Carousel
        plugins={[
          AutoScroll({
            playOnInit: true,
            speed: 1,
            stopOnInteraction: false,
            startDelay: 0,
            stopOnMouseEnter: false,
          }),
        ]}
        opts={{ loop: true, align: "start", dragFree: true }}
        className="w-full"
      >
        <CarouselContent className="h-36 md:h-44 lg:h-48 xl:h-52 2xl:h-64">
          {frutas.map((fruta) => {
            const contenido_educativo = fruta.vi_contenidoeducativo.filter(
              (contenido) => contenido.tipocontenido === "Imagen"
            );
            let imagen;

            if (contenido_educativo.length === 0) imagen = "/sabores/missing.png";
            else imagen = contenido_educativo[0].urlcontenido;
            return (
              <CarouselItem key={fruta.id} className="h-full basis-auto">
                <Link
                  className="group/item relative flex aspect-square h-full p-3 transition-all hover:p-0"
                  href={"/sabores"}
                >
                  <Image
                    src={imagen}
                    alt={fruta.nombre}
                    height={1000}
                    width={1000}
                    className="z-10 h-full w-full object-contain"
                  />
                  <circle className="absolute bottom-[15%] left-[15%] right-[15%] top-[15%] rounded-full bg-red-800 transition-all group-hover/item:bottom-[10%] group-hover/item:left-[10%] group-hover/item:right-[10%] group-hover/item:top-[10%] group-hover/item:bg-red-700 group-hover/item:shadow-xl" />
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export default Frutas;
