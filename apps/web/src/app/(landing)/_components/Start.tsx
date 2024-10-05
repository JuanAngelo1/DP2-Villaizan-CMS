"use server";

import Image from "next/image";
import React from "react";
import { Button } from "@repo/ui/components/button";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Start: React.FC = () => {
  return (
    <section className="flex min-h-dvh items-center justify-center gap-32 bg-gradient-to-b from-[#e8e1c580] to-transparent">
      <div className="text-red-800">
        <h1 className="text-6xl font-medium">EL PAPÁ DE LAS</h1>
        <h1 className="text-8xl font-semibold">PALETAS</h1>
        <Button className="mt-2 bg-red-800 text-lg hover:bg-red-900" size={"lg"}>
          Compra ahora
        </Button>
      </div>
      <Image src="/Popsicle-Main.png" alt="start-image" width={500} height={500} />
    </section>
  );
};

export default Start;
