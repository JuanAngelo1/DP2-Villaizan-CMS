import Image from "next/image";
import { Separator } from "@repo/ui/components/separator";
import { historia } from "@web/src/app/data/about_us";

function MainHistory() {
  return (
    <section className="gap mt-2 flex flex-col gap-2 lg:flex-row-reverse lg:gap-6">
      <header className="mx-auto flex w-fit flex-col items-center py-2 lg:hidden">
        <h2 className="w-fit text-center text-3xl font-semibold">Nuestra historia</h2>
        <Separator className="w-3/5 bg-black" orientation="horizontal" />
      </header>
      <Image
        src={"/nosotros/historia-main.jpg"}
        height={1000}
        width={1000}
        className="h-auto w-full shrink-0 rounded-md border object-cover object-center lg:w-1/2"
        alt="Nuestro inicio"
      />
      <div className="flex flex-col items-center justify-center gap-2 py-0 lg:py-5">
        <header className="mx-auto hidden w-fit flex-col items-center py-2 lg:flex">
          <h2 className="w-fit text-center text-3xl font-semibold">Nuestra historia</h2>
          <Separator className="w-3/5 bg-black" orientation="horizontal" />
        </header>
        <p className="text-center">{historia}</p>
      </div>
    </section>
  );
}
export default MainHistory;
