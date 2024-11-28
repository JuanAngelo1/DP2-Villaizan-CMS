import { Separator } from "@repo/ui/components/separator"
import Image from "next/image"

function Mision() {
  return (
    <section className="mt-0 flex flex-col gap-2 lg:flex-row lg:gap-0 rounded-md overflow-hidden">
      <header className="mx-auto flex w-fit flex-col items-center py-2 lg:hidden">
        <h2 className="w-fit text-center text-3xl font-semibold">Cual es nuestra misión?</h2>
        <Separator className="w-3/5 bg-black" orientation="horizontal" />
      </header>
      <div className="lg:w-1/2 shrink-0 aspect-video">
        <Image
          src={"/nosotros/aboutus6.jpg"}
          height={1000}
          width={1000}
          className="h-full w-full object-cover object-center rounded-md"
          alt="Nuestra misión"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 py-0 lg:py-5 lg:px-8">
        <header className="mx-auto hidden w-fit flex-col items-center py-2 lg:flex">
          <h2 className="w-fit text-center text-3xl font-semibold">Cual es nuestra misión?</h2>
          <Separator className="w-3/5 bg-black" orientation="horizontal" />
        </header>
        <p className="text-center">
          Todo comenzó en un cálido verano, cuando la familia Villaizan decidió capturar los sabores más
          frescos de la temporada en un postre que uniera tradición y creatividad. Inspirados por las recetas
          caseras de la abuela, empezaron a crear paletas llenas de colores y sabores auténticos, usando
          frutas frescas y un toque de amor. Todo comenzó en un cálido verano, cuando la familia Villaizan
          decidió capturar los sabores más frescos de la temporada en un postre que uniera tradición y
          creatividad. Inspirados por las recetas caseras de la abuela, empezaron a crear paletas llenas de
          colores y sabores auténticos, usando frutas frescas y un toque de amor.
        </p>
      </div>
    </section>
  )
}
export default Mision