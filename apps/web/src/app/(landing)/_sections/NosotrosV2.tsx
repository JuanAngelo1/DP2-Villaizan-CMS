import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

function NosotrosV2() {
  const twStyle1 =
    "w-[350px] h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px]";

  return (
    <MaxWidthWrapper className="mt-20 flex flex-col items-center gap-6 overflow-hidden py-6 font-['Abhaya_Libre'] lg:flex-row">
      <section className={cn("BOX group/main relative shrink-0 overflow-visible", twStyle1)}>
        <div
          className="absolute bottom-0 left-1/2 z-20 aspect-square w-[80%] -translate-x-1/2 rounded-full bg-transparent transition-all group-hover/main:scale-110"
          style={{
            boxShadow: "0 100px 0 40px #fff",
          }}
        />

        <div className="CIRCLE absolute bottom-0 left-1/2 aspect-square w-[80%] -translate-x-1/2 overflow-hidden rounded-full">
          <img
            src={"/man-with-crossed-arms.png"}
            alt="Villaizan"
            className={cn(
              "absolute bottom-0 left-1/2 -translate-x-1/2 object-cover transition-all group-hover/main:scale-110",
              twStyle1
            )}
          />
        </div>

        <div className="CIRCLE BEHIND absolute bottom-0 left-1/2 aspect-square w-[80%] -translate-x-1/2 overflow-hidden rounded-full bg-red-800 transition-all group-hover/main:scale-110 group-hover/main:bg-red-700" />

        <img
          src={"/man-with-crossed-arms.png"}
          alt="Villaizan"
          className="absolute bottom-0 left-1/2 h-full -translate-x-1/2 object-cover transition-all group-hover/main:scale-110"
        />
      </section>
      <section className="flex min-w-0 flex-col items-center lg:items-start">
        <h1 className="text-3xl md:text-4xl lg:text-5xl">Sobre Paletas Villaizan</h1>
        <p className="text-md mt-2 max-w-[700px] text-center leading-6 lg:max-w-full lg:text-start lg:text-lg">
          Todo comenzó en un cálido verano, cuando la familia Villaizan decidió capturar los sabores más
          frescos de la temporada en un postre que uniera tradición y creatividad. Inspirados por las recetas
          caseras de la abuela, empezaron a crear paletas llenas de colores y sabores auténticos, usando
          frutas frescas y un toque de amor.
        </p>
        <Link
          href={'sobre-nosotros'}
          className={cn(
            buttonVariants(),
            "mt-4 bg-red-800 px-6 py-6 text-lg text-white hover:bg-red-900 lg:text-xl"
          )}
        >
          Sobre nosotros
        </Link>
      </section>
    </MaxWidthWrapper>
  );
}
export default NosotrosV2;
