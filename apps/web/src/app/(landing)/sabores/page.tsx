import { ChevronRight } from "lucide-react";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

function SaboresPage() {
  return (
    // <section className="  min-h-[600px]">
    <MaxWidthWrapper className="gap- flex flex-1 flex-col py-0 font-['Abhaya_Libre']">
      <section className="flex h-screen w-full">
        <div className="m-auto flex w-[700px] flex-col items-center">
          <p className="text-6xl font-bold">
            Conoce a <span className="underline">Mr Manzana</span>
          </p>
          <img src="/sabores/test.png" className="h-auto w-full object-cover" />
        </div>
        <div className="flex w-[140px] flex-col items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%" // Set width to 100%
            height="700px" // Set height to 100%
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=""
          >
            <line x1="12" y1="-100" x2="12" y2="68" />
            <polyline points="19 65 12 70 5 65" />
          </svg>
          <p className="text-center text-lg font-bold leading-[17px]">Baja para conocer mas de mí!</p>
        </div>
      </section>

      <section className="flex h-screen w-full items-center gap-4">
        <div className="flex-1">
          <img src="/sabores/test.png" className="h-auto w-full" />
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <p className="text-right text-4xl font-semibold">Mira como te puedo beneficiar</p>
          <div className="flex flex-col gap-2">
            <BeneficioItem />
            <BeneficioItem />
            <BeneficioItem />
            <BeneficioItem />
            <BeneficioItem />
          </div>
        </div>
      </section>

      <section className="flex h-screen w-full items-center gap-4">
        <div className="flex-1">
          <img src="/sabores/test.png" className="h-auto w-full" />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <p className="text-right text-4xl font-semibold">Donde me puedes encontrar?</p>
          <div className="grid grid-cols-3 gap-3">
            <ProductoItem />
            <ProductoItem />
            <ProductoItem />
            <ProductoItem />
            {/* <ProductoItem/> */}
            <div className="group/maincard flex h-[250px] cursor-pointer flex-col justify-between rounded-lg bg-red-800 p-5 text-white transition-colors hover:bg-red-900">
              <p className="text-2xl font-bold">Quieres ver todos?</p>
              <div className="flex flex-row items-center justify-between">
                <p className="text-2xl font-bold group-hover/maincard:underline">Tienda</p>
                <ChevronRight />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
    // </section>
  );
}

function ProductoItem() {
  return (
    <div className="group/maincard relative flex h-[250px] flex-col rounded-lg bg-red-200 p-3 transition-colors hover:bg-red-300">
      <div className="absolute -left-2 -top-2 flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-red-800 bg-red-700 text-lg font-bold text-white">
        70%
      </div>
      <div className="min-h-0 flex-1">
        <img
          src="/sabores/paleta-producto.png"
          className="h-full flex-1 object-cover transition-all group-hover/maincard:scale-110"
        />
      </div>
      <p className="text-center text-2xl font-semibold transition-all group-hover/maincard:font-bold group-hover/maincard:underline">
        Helado 1
      </p>
    </div>
  );
}

function BeneficioItem() {
  return (
    <div className="flex flex-row">
      <p className="flex-1">texto del beneficio</p>
      <div className="h-[100px] w-[100px] border border-red-500 object-contain"></div>
    </div>
  );
}

export default SaboresPage;
