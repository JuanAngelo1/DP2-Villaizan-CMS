"use client";

import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Card, CardContent } from "@repo/ui/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/carousel";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

const Sabores: React.FC = () => {
  return (
    <section id="sabores" className="flex min-h-[56rem] flex-col items-center justify-start gap-12 py-24 px-16">
      <MaxWidthWrapper className="flex flex-col items-center justify-center gap-y-20">
        <h2 className="text-7xl">Nuestros sabores</h2>
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          opts={{
            align: "start",
          }}
          className="z-1 w-full"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </MaxWidthWrapper>
    </section>
  );
};

export default Sabores;
