import Image from "next/image";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

function NosotrosV2() {
  const twStyle1 =
    "w-[350px] h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px]";

  return (
    <MaxWidthWrapper className="mt-20 flex flex-col items-center gap-6 font-['Abhaya_Libre'] lg:flex-row">
      <section className={cn("BOX relative shrink-0 overflow-hidden", twStyle1)}>
        <div
          className="absolute bottom-0 left-1/2 z-20 aspect-square w-[80%] -translate-x-1/2 rounded-full bg-transparent"
          style={{
            boxShadow: "0 100px 0 40px #fff",
          }}
        />

        <div className="CIRCLE absolute bottom-0 left-1/2 aspect-square w-[80%] -translate-x-1/2 overflow-hidden rounded-full bg-red-800">
          <img
            src={"/man-with-crossed-arms.png"}
            alt="Villaizan"
            className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 object-cover", twStyle1)}
          />
        </div>
        <img
          src={"/man-with-crossed-arms.png"}
          alt="Villaizan"
          className="absolute bottom-0 left-1/2 h-full -translate-x-1/2 border border-white object-cover"
        />
      </section>
      <section className="flex min-w-0 flex-col items-center lg:items-start">
        <h1 className="text-3xl md:text-4xl lg:text-5xl">Sobre Paletas Villaizan</h1>
        <p className="text-md mt-2 text-center leading-6 lg:text-start lg:text-lg max-w-[700px] lg:max-w-full">
          Todo comenzó en un cálido verano, cuando la familia Villaizan decidió capturar los sabores más
          frescos de la temporada en un postre que uniera tradición y creatividad. Inspirados por las recetas
          caseras de la abuela, empezaron a crear paletas llenas de colores y sabores auténticos, usando
          frutas frescas y un toque de amor.
        </p>
        <Button className="mt-4 bg-red-800 hover:bg-red-900 px-6 py-6 text-lg lg:text-xl text-white">Sobre nosotros</Button>
      </section>
    </MaxWidthWrapper>
  );
}
export default NosotrosV2;
