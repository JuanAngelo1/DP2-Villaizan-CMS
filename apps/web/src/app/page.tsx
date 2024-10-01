import Image from "next/image";
import { Button } from "@repo/ui/components/button";
import Navbar from "./_components/navbar";
import Nosotros from "./_components/nosotros";
import Noticias from "./_components/noticias";
import Publicaciones from "./_components/publicaciones";
import Sabores from "./_components/sabores";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col overflow-y-auto">
      <Navbar />
      <div className="flex min-h-screen items-center justify-center gap-[100px]">
        <section className="text-red-800">
          <p className="text-6xl font-semibold">EL PAPÁ DE LAS</p>
          <p className="text-8xl font-bold">PALETAS</p>
          <Button className="mt-2 bg-red-800 hover:bg-red-900" size={"lg"}>
            Compra ahora!
          </Button>
        </section>
        <img src="Popsicle-Main.png" className="h-[500px]" />
      </div>

      <Sabores />
      <Nosotros />
      <Noticias />
      <Publicaciones />
    </main>
  );
}
