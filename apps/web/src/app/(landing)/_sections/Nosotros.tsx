import Image from "next/image";
import React from "react";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

const Nosotros: React.FC = () => {
  return (
    <section id="nosotros" className="bg-red-600 px-4 py-16 font-['Abhaya_Libre'] text-white">
      <MaxWidthWrapper>
        <div className="mt-[200px] flex h-screen flex-col items-center justify-start text-center">
          <h1 className="mb-2 text-4xl sm:text-5xl md:text-7xl">Conoce un poco más sobre nosotros</h1>
          <p className="text-lg md:text-2xl">
            Paletas Villaizan se enorgullece de ser una marca dedicada a la creación de paletas artesanales
            que cautivan y deleitan con sus sabores auténticos de frutas naturales y rellenos exquisitos que
            endulzan el paladar. Con una trayectoria de 8 años en el Mercado de San Martín, en la exuberante
            Selva del Perú, hemos arraigado nuestras raíces en la tradición y el saber hacer local.
          </p>
          <div className="mt-5 flex h-[50%] min-h-[300px] w-full flex-row gap-5 overflow-x-auto">
            <img
              src="/nosotros/aboutus1.jpg"
              alt="Paletas Villaizan"
              className="h-full w-fit rounded-md object-cover"
            />
            <img
              src="/nosotros/aboutus6.jpg"
              alt="Paletas Villaizan"
              className="h-full w-fit rounded-md object-cover"
            />
            <img
              src="/nosotros/aboutus7.jpg"
              alt="Paletas Villaizan"
              className="h-full w-fit rounded-md object-cover"
            />
          </div>
        </div>

        <div className="flex h-dvh w-[700px] flex-col items-start justify-center text-left">
          <h1 className="mb-2 text-4xl sm:text-5xl md:text-7xl">Cual es nuestra visión?</h1>
          <p className="text-lg md:text-2xl">
            Ser reconocidos como la heladería líder en innovación y calidad artesanal, ofreciendo productos
            que no solo deleitan el paladar, sino que también promueven un estilo de vida consciente y
            saludable. Nos esforzamos por expandir nuestro alcance, llevando nuestras paletas a nuevas
            comunidades, siempre manteniendo nuestro compromiso con la autenticidad y el respeto por las
            tradiciones locales.
          </p>
        </div>
        <div className="flex h-dvh w-[700px] flex-col items-start justify-center text-left">
          <h1 className="mb-4 text-4xl sm:text-5xl md:text-7xl">Misión</h1>
          <p className="text-lg md:text-2xl">
            Nuestra misión es ofrecer los mejores helados artesanales, elaborados con ingredientes naturales,
            seleccionados cuidadosamente para garantizar la frescura y calidad en cada paleta. Nos
            comprometemos a brindar una experiencia única que despierte los sentidos, rescatando los sabores
            tradicionales y creando nuevas combinaciones que sorprendan a nuestros clientes, todo en un
            entorno sostenible y responsable con el medio ambiente.
          </p>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Nosotros;
