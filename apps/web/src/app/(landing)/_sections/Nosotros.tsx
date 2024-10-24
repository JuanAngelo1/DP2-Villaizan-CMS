"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel, { EmblaViewportRefType } from "embla-carousel-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/carousel";
import { cn } from "@repo/ui/lib/utils";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

function EmblaContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn("h-full", className)}
      style={{
        display: "flex",
        touchAction: "pan-y pinch-zoom",
        marginLeft: "calc(var(--slide-spacing) * -1)",
      }}
    >
      {children}
    </div>
  );
}

function EmblaSlide({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn("", className)}
      style={{
        transform: "translate3d(0, 0, 0)",
        flex: "0 0 auto",
        minWidth: "0",
        paddingLeft: "1rem",
      }}
    >
      {children}
    </div>
  );
}

const Nosotros: React.FC = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ playOnInit: true, speed: 3, stopOnInteraction: false }),
  ]);

  return (
    <section
      id="nosotros"
      className="bg-red-500 px-4 py-16 font-['Abhaya_Libre'] text-white" //bg-[url('/nosotros/main-background.jpg')] bg-contain bg-fixed bg-center
      style={{
        background: "rgba(0,0,0,0.6) url('/nosotros/main-background.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundBlendMode: "darken",
      }}
    >
      <MaxWidthWrapper>
        <div className="mt-[200px] flex h-screen flex-col items-center justify-start text-center">
          <h1 className="mb-2 text-4xl sm:text-5xl md:text-7xl">Conoce un poco más sobre nosotros</h1>
          <p className="text-lg md:text-2xl">
            Paletas Villaizan se enorgullece de ser una marca dedicada a la creación de paletas artesanales
            que cautivan y deleitan con sus sabores auténticos de frutas naturales y rellenos exquisitos que
            endulzan el paladar. Con una trayectoria de 8 años en el Mercado de San Martín, en la exuberante
            Selva del Perú, hemos arraigado nuestras raíces en la tradición y el saber hacer local.
          </p>

          <div className="embla mt-20 h-[50%] w-full overflow-hidden" ref={emblaRef}>
            <EmblaContainer className="">
              <EmblaSlide className="">
                <img
                  src="/nosotros/aboutus1.jpg"
                  alt="Paletas Villaizan"
                  width={200}
                  height={200}
                  className="h-full w-auto rounded-lg object-cover"
                />
              </EmblaSlide>
              <EmblaSlide className="">
                <img
                  src="/nosotros/aboutus5.jpg"
                  alt="Paletas Villaizan"
                  width={200}
                  height={200}
                  className="h-full w-auto rounded-lg object-cover"
                />
              </EmblaSlide>
              <EmblaSlide className="">
                <img
                  src="/nosotros/aboutus6.jpg"
                  alt="Paletas Villaizan"
                  width={200}
                  height={200}
                  className="h-full w-auto rounded-lg object-cover"
                />
              </EmblaSlide>
              <EmblaSlide className="">
                <img
                  src="/nosotros/aboutus7.jpg"
                  alt="Paletas Villaizan"
                  width={200}
                  height={200}
                  className="h-full w-auto rounded-lg object-cover"
                />
              </EmblaSlide>
            </EmblaContainer>
          </div>
        </div>

        <div className="flex h-dvh w-full flex-col items-center justify-center gap-10 text-left lg:flex-row lg:gap-5">
          <div className="text-center lg:w-[700px] lg:text-left">
            <h1 className="mb-2 text-4xl sm:text-5xl md:text-7xl">Cual es nuestra visión?</h1>
            <p className="text-lg md:text-2xl">
              Ser reconocidos como la heladería líder en innovación y calidad artesanal, ofreciendo productos
              que no solo deleitan el paladar, sino que también promueven un estilo de vida consciente y
              saludable. Nos esforzamos por expandir nuestro alcance, llevando nuestras paletas a nuevas
              comunidades, siempre manteniendo nuestro compromiso con la autenticidad y el respeto por las
              tradiciones locales.
            </p>
          </div>
          <img className="h-[400px] rounded-lg object-cover shadow-lg" src="/nosotros/vision.jpg"></img>
        </div>

        <div className="flex h-dvh w-full flex-col items-center justify-center gap-10 text-left lg:flex-row lg:gap-5">
          <div className="text-center lg:w-[700px] lg:text-left">
            <h1 className="mb-4 text-4xl sm:text-5xl md:text-7xl">Cual es nuestra misión?</h1>
            <p className="text-lg md:text-2xl">
              Nuestra misión es ofrecer los mejores helados artesanales, elaborados con ingredientes
              naturales, seleccionados cuidadosamente para garantizar la frescura y calidad en cada paleta.
              Nos comprometemos a brindar una experiencia única que despierte los sentidos, rescatando los
              sabores tradicionales y creando nuevas combinaciones que sorprendan a nuestros clientes, todo en
              un entorno sostenible y responsable con el medio ambiente.
            </p>
          </div>
          <img className="h-[400px] rounded-lg object-cover shadow-lg" src="/nosotros/vision.jpg"></img>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Nosotros;
