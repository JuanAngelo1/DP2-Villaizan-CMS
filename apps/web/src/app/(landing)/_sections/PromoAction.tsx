import Image from "next/image";
import { Button } from "@repo/ui/components/button";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

function PromoAction() {
  return (
    <MaxWidthWrapper className="mt-20 grid h-[800px] w-full grid-cols-1 grid-rows-7 gap-3 font-['Abhaya_Libre'] xl:h-[600px] xl:grid-cols-4 xl:grid-rows-1 xl:px-4">
      <div className="relative row-span-3 flex flex-col justify-between overflow-hidden rounded-lg bg-[#F6F3D8] p-10 xl:col-span-2 xl:row-span-1">
        <p className="text-2xl font-bold sm:text-4xl xl:text-5xl">
          Te traemos las paletas
          <br />
          que quieres, a la
          <br />
          puerta de <br /> tu casa
        </p>
        <Button className="w-fit px-6 py-5 text-lg sm:px-9 sm:py-7 sm:text-2xl xl:px-11 xl:py-8 xl:text-3xl">
          Tienda
        </Button>
        <Image
          src={"/villaizan-camion.png"}
          alt="Villaizan Camión"
          height={1200}
          width={1200}
          className="absolute -bottom-[120px] left-1/2 aspect-square w-[500px] max-w-[1100px] object-cover sm:w-[600px] xl:-bottom-[170px] xl:left-1/3 xl:w-[800px]"
        />
      </div>

      <div className="relative row-span-2 flex items-center justify-end overflow-hidden rounded-lg bg-red-800 xl:row-span-1 p-4">
        <p className="text-3xl font-bold text-white text-end">Más de<br/> 30 sabores</p>
        <Image
          src="/paleta-sabores.png"
          height={1200}
          width={1200}
          alt="Paleta de sabores"
          className="absolute -bottom-[100px] -left-[70px] aspect-square w-[600px] -rotate-[34deg] object-cover"
        />
      </div>
      <div className="relative row-span-2 flex overflow-hidden rounded-lg bg-[#FFE1E1] xl:row-span-1">
        <Image
          src="/VillaizanLogo2png.png"
          alt="Logo Villaizan"
          height={1200}
          width={1200}
          className="m-auto h-auto w-[200px]"
        />
        <Image
          src="/leaf-deco.png"
          alt="Leaf"
          height={1200}
          width={1200}
          className="absolute left-0 top-0 h-auto w-[300px] rotate-180"
        />
        <Image
          src="/leaf-deco.png"
          alt="Leaf"
          height={1200}
          width={1200}
          className="absolute right-0 top-0 h-auto w-[300px]"
        />
      </div>
    </MaxWidthWrapper>
  );
}
export default PromoAction;
