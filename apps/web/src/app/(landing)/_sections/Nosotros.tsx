import Image from "next/image";
import React from "react";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

const Nosotros: React.FC = () => {
  return (
    <section id="nosotros" className="bg-red-600 px-4 py-16 text-white font-['Abhaya_Libre']">
      <MaxWidthWrapper>
        <div className="grid gap-12 md:grid-cols-2">
          {/* Misión */}
          <div className="order-2 flex flex-col items-start md:order-1">
            <h1 className="mb-4 md:text-7xl sm:text-5xl text-4xl">Misión</h1>
            <p className="text-lg md:text-2xl">
            Nuestra misión es ofrecer los mejores helados artesanales, elaborados con ingredientes naturales, seleccionados cuidadosamente para garantizar la frescura y calidad en cada paleta. Nos comprometemos a brindar una experiencia única que despierte los sentidos, rescatando los sabores tradicionales y creando nuevas combinaciones que sorprendan a nuestros clientes, todo en un entorno sostenible y responsable con el medio ambiente.
            </p>
          </div>
          {/* Imagen de misión */}
          <div className="order-1 lg:w-[500px] md:w-[400px] w-[300px] md:order-2 place-self-end">
            <AspectRatio ratio={6 / 4}>
              <Image src="/nosotros/mision.png" alt="Misión" className="h-auto w-full rounded-lg" fill />
            </AspectRatio>
          </div>

          {/* Imagen de visión */}
          <div className="lg:w-[500px] md:w-[400px] w-[300px]">
            <AspectRatio ratio={6 / 4}>
              <Image
                src="/nosotros/vision.png"
                alt="Visión"
                fill
                className="h-auto w-full rounded-lg"
              />
            </AspectRatio>
          </div>
          {/* Visión */}
          <div className="flex flex-col items-start text-right md:items-end">
            <h1 className="mb-4 md:text-7xl sm:text-5xl text-4xl">Visión</h1>
            <p className="text-lg md:text-2xl">Ser reconocidos como la heladería líder en innovación y calidad artesanal, ofreciendo productos que no solo deleitan el paladar, sino que también promueven un estilo de vida consciente y saludable. Nos esforzamos por expandir nuestro alcance, llevando nuestras paletas a nuevas comunidades, siempre manteniendo nuestro compromiso con la autenticidad y el respeto por las tradiciones locales.</p>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Nosotros;
