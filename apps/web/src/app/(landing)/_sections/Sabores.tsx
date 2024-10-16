// app/(landing)/_components/Sabores.tsx
"use client";

import Autoplay from "embla-carousel-autoplay";
import React, { useState } from "react";
import { Card, CardContent } from "@repo/ui/components/card";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/carousel";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";
import { sabores, Sabor } from "@web/src/app/data/sabores";
import { Button } from "@repo/ui/components/button"; // Asegúrate de tener un botón reutilizable

const Sabores: React.FC = () => {
  const [selectedSabor, setSelectedSabor] = useState<Sabor | null>(null);

  return (
    <section id="sabores" className="flex h-fit flex-col items-center justify-start gap-12 py-16 px-16 sm:px-8 lg:px-16">
      <MaxWidthWrapper className="flex flex-col items-center justify-center gap-y-20 w-full">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold">Nuestros Sabores</h2>
        
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
                      className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    >
                      <CardContent className="flex flex-col items-center justify-center p-4">
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                          <Image
                            src="https://drive.google.com/uc?export=view&id=1BQwyPb5lcxrMWi0qHI-h3-k3r7LLkSJe"
                            alt={sabor.name}
                            fill
                            className="object-contain rounded-full"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-center">{sabor.name}</h3>
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
          // Mostrar los detalles del sabor seleccionado
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64">
              <Image
                src={selectedSabor.image}
                alt={selectedSabor.name}
                fill
                className="object-contain rounded-full"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">{selectedSabor.name}</h3>
            <p className="text-center text-gray-600 px-4 sm:px-8 lg:px-16">
              {selectedSabor.description}
            </p>
            <Button
              onClick={() => setSelectedSabor(null)}
              className="mt-6 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300"
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