"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@repo/ui/components/button";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

const Start: React.FC = () => {
  return (
    <section className="flex h-full justify-center bg-gradient-to-b from-[#ae9c5280] to-transparent py-16 *:items-center">
      <MaxWidthWrapper className="flex flex-col items-center justify-center gap-8 px-4 md:gap-16 lg:flex-row">
        <div className="flex flex-col items-center text-center text-red-800 md:text-left font-['Abhaya_Libre']">
          <h1 className="md:text-7xl sm:text-5xl text-4xl font-semibold">EL PAPÁ DE LAS</h1>
          <h1 className="md:text-7xl sm:text-5xl text-4xl font-extrabold">PALETAS</h1>
          <Button className="mt-4 bg-red-800 text-lg hover:bg-red-900" size={"lg"}>
            Compra ahora
          </Button>
        </div>
        <Image
          src="/Popsicle-Main.png"
          alt="start-image"
          width={500}
          height={500}
          className="h-auto w-64 md:w-96"
        />
      </MaxWidthWrapper>
    </section>
  );
};

export default Start;
