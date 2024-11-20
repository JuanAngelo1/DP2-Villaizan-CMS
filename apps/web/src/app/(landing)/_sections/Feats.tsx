import Image from "next/image";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

function Feats() {
  return (
    <MaxWidthWrapper className="mt-32 flex flex-col font-['Abhaya_Libre']">
      <h1 className="text-center text-[2.5rem] font-bold lg:text-start leading-10 lg:leading-normal">Bucamos darte las mejores paletas</h1>
      <section className="mt-4 grid w-full grid-cols-1 grid-rows-3 gap-9 md:grid-cols-3 md:grid-rows-1">
        <Feat
          title="Fresco y Natural"
          description="Paletas hechas con frutas frescas y sin aditivos artificiales, para un sabor auténtico y saludable en cada bocado."
          img="/paletas-artesanales.jpg"
        />
        <Feat
          title="Artesanales y Únicos"
          description="Descubre sabores tradicionales y originales, cuidadosamente creados para ofrecerte una experiencia refrescante y memorable."
          img="/paleta-clasica.jpg"
        />
        <Feat
          title="Hechos con amor"
          description="Cada paleta es preparada a mano con dedicación, asegurando que cada una refleje la pasión y el compromiso de Paletas Villaizan."
          img="/new1.png"
        />
      </section>
    </MaxWidthWrapper>
  );
}
export default Feats;

function Feat({ title, description, img }: { title: string; description: string; img: string }) {
  return (
    <div className="flex w-full flex-row items-center justify-start gap-4 md:flex-col group/feat">
      <div className="w-[40%] md:w-full shrink-0">
        <AspectRatio ratio={1} className="flex-1 overflow-hidden rounded-md">
          <Image className=" object-cover object-center group-hover/feat:scale-105 transition-all" fill src={img} alt={title} />
        </AspectRatio>
      </div>
      <div className="flex flex-col">
        <h2 className="mt-0 lg:mt-2 text-start leading-5 md:leading-7 text-[1.7rem] font-bold md:text-center">{title}</h2>
        <p className="mt-2 text-start text-lg leading-6 md:text-center">{description}</p>
      </div>
    </div>
  );
}
