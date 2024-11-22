import Image from "next/image";
import { Button, buttonVariants } from "@repo/ui/components/button";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";
import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";

function PromoAction() {
  return (
    <MaxWidthWrapper className="mt-20 grid h-[800px] w-full grid-cols-1 grid-rows-7 gap-3 font-['Abhaya_Libre'] xl:h-[600px] xl:grid-cols-4 xl:grid-rows-1 xl:px-4">
      <div className="relative row-span-3 flex flex-col justify-between overflow-hidden rounded-lg bg-[#F6F3D8] p-10 xl:col-span-2 xl:row-span-1">
        <p className="text-2xl font-bold sm:text-4xl xl:text-5xl">
          Te traemos las paletas
          <br />
          que quieres, a la
          <br />
          puerta de <br /> tu casa.
        </p>
        <Link className={cn(buttonVariants(), "w-fit px-6 py-5 text-lg sm:px-9 sm:py-6 sm:text-2xl xl:px-9 xl:py-6 xl:text-2xl")} href={"https://heladosvillaizan.tech/"}>
          Tienda
        </Link>
        <Image
          src={"/villaizan-camion.png"}
          alt="Villaizan Camión"
          height={1200}
          width={1200}
          className="absolute -bottom-[120px] left-1/2 aspect-square w-[500px] max-w-[1100px] object-cover sm:w-[600px] xl:-bottom-[170px] xl:left-1/3 xl:w-[800px]"
        />
      </div>

      <div className="relative row-span-2 flex items-end sm:items-center xl:items-end justify-end overflow-hidden rounded-lg bg-red-800 p-6 xl:row-span-1">
        <p className="text-end text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Prueba más 
          <br />de 30 sabores!
        </p>
        <div className="absolute -bottom-10 left-0 -top-10 right-1/4 overflow-visible">
          <Image
            src="/paleta-sabores.png"
            height={500}
            width={500}
            alt="Paleta de sabores"
            className="object-cover object-top h-full w-full md:object-center overflow-visible md:rotate-[27deg] xl:rotate-0"
          />
        </div>
      </div>
      <div className="relative row-span-2 flex overflow-hidden rounded-lg bg-[#FFE1E1] xl:row-span-1">
        <Image
          src="/VillaizanLogo2png.png"
          alt="Logo Villaizan"
          height={1200}
          width={1200}
          className="m-auto h-auto w-[140px] lg:w-[180px] xl:w-[150px]"
        />
        <Image
          src="/leaf-deco.png"
          alt="Leaf"
          height={1200}
          width={1200}
          className="absolute left-0 top-0 h-full w-[100px] rotate-180 object-cover object-left sm:w-[300px] md:w-[500px] lg:w-[600px] xl:w-[210px]"
        />
        <Image
          src="/leaf-deco.png"
          alt="Leaf"
          height={1200}
          width={1200}
          className="absolute right-0 top-0 h-full w-[100px] object-cover object-left sm:w-[300px] md:w-[500px] lg:w-[600px] xl:w-[210px]"
        />
      </div>
    </MaxWidthWrapper>
  );
}
export default PromoAction;
