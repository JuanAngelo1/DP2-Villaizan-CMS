// app/(landing)/_components/Sabores.tsx
"use client";

import { Sabor, sabores } from "@web/src/app/data/sabores";
import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
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

// Asegúrate de tener un botón reutilizable

const Sabores: React.FC = () => {
  const router = useRouter();

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
          {sabores.map((sabor) => (
            <CarouselItem key={sabor.id} className="group/item h-full basis-auto">
              <Link
                className="relative flex aspect-square h-full p-3 transition-all group-hover/item:p-0"
                href={"/sabores"}
              >
                <Image
                  src={sabor.image}
                  alt={sabor.name}
                  height={1000}
                  width={1000}
                  className="z-10 h-full w-full object-contain"
                />
                <circle className="absolute bottom-[15%] left-[15%] right-[15%] top-[15%] rounded-full bg-red-800 transition-all group-hover/item:bottom-[10%] group-hover/item:left-[10%] group-hover/item:right-[10%] group-hover/item:top-[10%] group-hover/item:bg-red-700 group-hover/item:shadow-xl" />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Sabores;
