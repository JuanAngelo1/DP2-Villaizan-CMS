import Image from "next/image";
import { Button } from "@repo/ui/components/button";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

function PromoAction() {
  return (
    <MaxWidthWrapper className="mt-20 grid h-[800px] w-full grid-cols-1 grid-rows-7 gap-3 px-20 font-['Abhaya_Libre'] xl:h-[600px] xl:grid-cols-4 xl:grid-rows-1 xl:px-4">
      <div className="relative row-span-3 flex flex-col justify-between overflow-hidden rounded-lg bg-[#F6F3D8] p-10 xl:col-span-2 xl:row-span-1">
        <p className="text-5xl font-bold">
          Te traemos las paletas
          <br />
          que quieres, a la
          <br />
          puerta de <br /> tu casa
        </p>
        <Button className="w-fit px-9 py-6 text-xl">Tienda</Button>
        <Image
          src={"/villaizan-camion.png"}
          alt="Villaizan Camión"
          height={1200}
          width={1200}
          className="absolute -bottom-[170px] -right-[370px] aspect-square w-[800px] max-w-[1100px] object-cover"
        />
      </div>
      <div className="row-span-2 rounded-lg bg-red-800 xl:row-span-1">el 2</div>
      <div className="row-span-2 rounded-lg bg-[#FFE1E1] xl:row-span-1">el 3</div>
    </MaxWidthWrapper>
  );
}
export default PromoAction;
