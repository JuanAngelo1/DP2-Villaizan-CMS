import { AspectRatio } from "@repo/ui/components/aspect-ratio"
import { Separator } from "@repo/ui/components/separator"
import { vision } from "@web/src/app/data/about_us"
import Image from "next/image"

function Vision() {
  return (
    <section className="mt-8 flex flex-col gap-2 lg:flex-row-reverse lg:gap-0 rounded-md overflow-hidden">
      <header className="mx-auto flex w-fit flex-col items-center py-2 lg:hidden">
        <h2 className="w-fit text-center text-3xl font-semibold">Cuál es nuestra visión?</h2>
        <Separator className="w-3/5 bg-black" orientation="horizontal" />
      </header>
      <div className="lg:w-1/2 shrink-0 aspect-video">
          <Image
            src={"/nosotros/vision.jpg"}
            height={1000}
            width={1000}
            className="h-full w-full object-cover object-center rounded-md"
            alt="Nuestra visión"
          />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 py-0 lg:py-5 lg:px-8">
        <header className="mx-auto hidden w-fit flex-col items-center py-2 lg:flex">
          <h2 className="w-fit text-center text-3xl font-semibold">Cual es nuestra visión?</h2>
          <Separator className="w-3/5 bg-black" orientation="horizontal" />
        </header>
        <p className="text-center">{vision}</p>
      </div>
    </section>
  )
}
export default Vision