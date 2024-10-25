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
        <div className="flex flex-col items-center justify-center w-[140px] gap-2">
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
          <p className="text-center font-bold leading-[17px] text-lg">Baja para conocer mas de mí!</p>
        </div>
      </section>
      <section className="h-screen w-full flex items-center gap-4">
        <div className="flex-1">
          <img src="/sabores/test.png" className="w-full h-auto"/>
        </div>
        <div className="flex-1 flex flex-col gap-6">
        <p className="text-4xl text-right font-semibold">Mira como te puedo beneficiar</p>
          <div className="flex flex-col gap-2">
            <BeneficioItem/>
            <BeneficioItem/>
            <BeneficioItem/>
            <BeneficioItem/>
            <BeneficioItem/>
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
    // </section>
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
