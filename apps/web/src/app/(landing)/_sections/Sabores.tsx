// app/(landing)/_components/Sabores.tsx
"use client";

import { Sabor, sabores } from "@web/src/app/data/sabores";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/carousel";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

// app/(landing)/_components/Sabores.tsx

// Asegúrate de tener un botón reutilizable

const Sabores: React.FC = () => {
  const [selectedSabor, setSelectedSabor] = useState<Sabor | null>(null);

  return (
    <section
      id="sabores"
      className="flex h-fit flex-col items-center justify-start gap-12 px-16 py-16 font-['Abhaya_Libre'] sm:px-8 lg:px-16"
    >
      <MaxWidthWrapper className="flex w-full flex-col items-center justify-center gap-y-20">
        <h1 className="font-['Abhaya_Libre'] md:text-7xl sm:text-5xl text-4xl font-bold">Nuestros Sabores</h1>

        {!selectedSabor ? (
          // Mostrar el Carousel cuando no hay un sabor seleccionado
          <Carousel
            plugins={[Autoplay({ delay: 3000 })]}
            opts={{
              align: "start",
              slidesToScroll: 1,
              containScroll: "trimSnaps",
            }}
            className="z-1 w-full"
          >
            <CarouselContent>
              {sabores.map((sabor) => (
                <CarouselItem key={sabor.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card
                      onClick={() => setSelectedSabor(sabor)}
                      className="cursor-pointer transition-shadow duration-300 hover:shadow-lg"
                    >
                      <CardContent className="flex flex-col items-center justify-center p-4">
                        <div className="relative h-32 w-32 sm:h-40 sm:w-40">
                          <Image
                            src="https://drive.google.com/uc?export=view&id=1BQwyPb5lcxrMWi0qHI-h3-k3r7LLkSJe"
                            alt={sabor.name}
                            fill
                            className="rounded-full object-contain"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <h3 className="mt-4 text-center text-xl font-semibold sm:text-2xl">{sabor.name}</h3>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-6">
            <div className="relative h-48 w-48 sm:h-64 sm:w-64">
              <Image
                src={selectedSabor.image}
                alt={selectedSabor.name}
                fill
                className="rounded-full object-contain"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h3 className="text-center text-4xl font-bold sm:text-5xl lg:text-6xl">{selectedSabor.name}</h3>
              <p className="px-4 text-center text-xl text-gray-600 sm:px-8 lg:px-16">
                {selectedSabor.description}
              </p>
            </div>
            <Button
              onClick={() => setSelectedSabor(null)}
              className="bg-primary hover:bg-primary-dark mt-6 rounded-md px-6 py-2 text-white transition-colors duration-300"
            >
              Volver
            </Button>
          </div>
        )}
      </MaxWidthWrapper>
    </section>
  );
};

export default Sabores;
