import Image from "next/image";
import React from "react";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

const Nosotros: React.FC = () => {
  return (
    <section id="nosotros" className="bg-red-600 px-4 py-16 text-white">
      <MaxWidthWrapper>
        <div className="grid gap-12 md:grid-cols-2">
          {/* Misión */}
          <div className="order-2 flex flex-col items-start md:order-1">
            <h2 className="mb-4 text-3xl md:text-6xl">Misión</h2>
            <p className="text-lg md:text-2xl">
              Nuestra misión es ofrecer los mejores helados artesanales...
            </p>
          </div>
          {/* Imagen de misión */}
          <div className="order-1 lg:w-[500px] w-[200px] md:order-2">
            <AspectRatio ratio={16 / 9}>
              <Image src="/images/mision.jpg" alt="Misión" className="h-auto w-full rounded-lg" fill />
            </AspectRatio>
          </div>

          {/* Imagen de visión */}
          <div className="lg:w-[500px] w-[200px]">
            <AspectRatio ratio={16 / 9}>
              <Image
                src="/images/vision.jpg"
                alt="Visión"
                fill
                className="h-auto w-full rounded-lg"
              />
            </AspectRatio>
          </div>
          {/* Visión */}
          <div className="flex flex-col items-start text-right md:items-end">
            <h2 className="mb-4 text-3xl md:text-6xl">Visión</h2>
            <p className="text-lg md:text-2xl">Ser reconocidos como la heladería líder en innovación...</p>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Nosotros;
