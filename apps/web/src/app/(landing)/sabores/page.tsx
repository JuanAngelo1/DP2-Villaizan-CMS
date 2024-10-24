import MaxWidthWrapper from "../_components/MaxWidthWrapper";

function SaboresPage() {
  return (
    // <section className="  min-h-[600px]">
    <MaxWidthWrapper className="gap- flex flex-1 flex-row py-12">
      <section className="w-[40%]">
        <p>Conoce a Mr Manzana</p>
      </section>
      <section className="w-[60%] border">
        {/* <div className="border flex flex-colt"> */}
        <h2 className="w-full text-right">Mira todo lo que te ofrezco</h2>
        {/* </div> */}
        <BeneficioItem />
        <div></div>
        <div></div>
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
