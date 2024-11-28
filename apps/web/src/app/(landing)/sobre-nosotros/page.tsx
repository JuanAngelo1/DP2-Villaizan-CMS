"use client";

import {
  Baby,
  Binoculars,
  Check,
  ChevronRight,
  Map,
  PackagePlus,
  Popsicle,
  Proportions,
  Smile,
  Store,
  Sun,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@repo/ui/components/button";
import { Separator } from "@repo/ui/components/separator";
import { cn } from "@repo/ui/lib/utils";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";
import HistoryTimeline from "./_components/HistoryTimeline";
import MainHistory from "./_components/MainHistory";
import Mision from "./_components/Mision";
import NumberProof from "./_components/NumberProof";
import Sabores from "./_components/Sabores";
import Vision from "./_components/Vision";

export interface NumberProofType {
  label: string;
  value: number;
  textBefore?: string;
}

export interface HistoryItemType {
  title: string;
  date: string;
  content: string;
  icon: any;
  image: string;
}

const productFeats = ["Artesanía con amor", "Frescura garantizada", "Sabores únicos", "Opciones para todos"];

const numberProofs: NumberProofType[] = [
  {
    label: "Años de experiencia",
    value: 5,
  },
  {
    label: "Puntos de venta",
    value: 200,
    textBefore: "+ ",
  },
  {
    label: "Variedad de sabores",
    value: 30,
    textBefore: "+ ",
  },
];

const historyItems: HistoryItemType[] = [
  {
    title: "Nuestro inicio",
    date: "Noviembre 2015",
    content:
      "Paletas Villaizan comenzó en Chiclayo como un pequeño emprendimiento familiar, inspirado por el amor a las frutas naturales y la frescura. Nuestro nombre es un homenaje a los hijos que nos motivan día a día.",
    icon: Sun,
    image: "/nosotros/historia-main.jpg",
  },
  {
    title: "La Llegada de María Fe",
    date: "Marzo 2017",
    content:
      "El nacimiento de mi hija María Fe marcó un antes y un después en nuestra historia. Ella se convirtió en nuestra mayor inspiración para expandirnos y compartir Villaizan con más personas.",
    icon: Baby,
    image: "/image-principal.png",
  },
  {
    title: "Expansión a Tarapoto",
    date: "Enero 2020",
    content:
      "Después de varios años creciendo en Chiclayo, decidimos abrir nuestro primer local en Tarapoto. Siempre con la misma misión: ofrecer un producto de calidad y mantener nuestros valores familiares.",
    icon: Map,
    image: "/image-secundaria.png",
  },
  {
    title: "Colaboración con Grandes Marcas",
    date: "Junio 2020",
    content:
      "A lo largo del tiempo, hemos sido reconocidos por nuestra calidad, lo que nos permitió colaborar con una importante marca nacional, consolidando nuestra presencia en el mercado.",
    icon: PackagePlus,
    image: "/nosotros/aboutus7.jpg",
  },
  {
    title: "El Lanzamiento de las MAFELETAS",
    date: "Febrero 2024",
    content:
      "Para rendir homenaje a María Fe, lanzamos las MAFELETAS, un nuevo formato mini que lleva su nombre. Este producto refleja nuestra creatividad y nuestro compromiso con innovar mientras mantenemos la tradición.",
    icon: Popsicle,
    image: "/nosotros/aboutus3.jpg",
  },
  {
    title: "Presentes y buscando crecer",
    date: "Presente",
    content:
      "Hoy, seguimos creando paletas con amor y dedicación, manteniendo la calidad y frescura que nos caracteriza. Nuestro compromiso es seguir innovando y creciendo, para llevar nuestros productos a más personas y seguir compartiendo momentos de felicidad.",
    icon: Smile,
    image: "/nosotros/aboutus4.jpg",
  },
];

function AboutUsPage() {
  return (
    <>
      <div className="relative flex flex-row justify-between overflow-hidden bg-[#ffe47a80] py-6 font-['Abhaya_Libre'] xl:py-10 overflow-x-hidden">
        <MaxWidthWrapper className="flex flex-row justify-between">
          <section className="flex w-3/4 shrink-0 flex-col gap-2 lg:w-1/2">
            <h1 className="text-2xl font-bold text-red-800 md:text-4xl lg:text-5xl">
              Hacemos las mejores paletas naturales y artesanales
            </h1>
            <ul className="flex flex-col gap-0">
              {productFeats.map((feat, idx) => {
                return (
                  <li key={idx} className="flex flex-row items-center gap-2 font-medium text-red-800">
                    <Check className="aspect-square w-4 shrink-0" />
                    <p className="text-md md:text-lg lg:text-xl">{feat}</p>
                  </li>
                );
              })}
            </ul>
            <Link
              href="as"
              className={cn(
                buttonVariants(),
                "text-md z-[100] flex w-fit flex-row items-center gap-1 bg-red-800 py-5 font-semibold hover:bg-red-900 md:px-5 md:text-lg lg:hidden"
              )}
            >
              <p>Quiero probarlos</p>
              <ChevronRight className="aspect-square w-4 shrink-0" />
            </Link>
          </section>
          <section className="absolute -bottom-0 left-1/2 right-0 top-0 rotate-0 sm:-bottom-20 md:-bottom-32 md:-top-10 md:rotate-12 lg:-bottom-20 lg:left-1/2 lg:top-0 lg:-translate-x-1/2 lg:rotate-0">
            <Image
              src={"/nosotros/popsicle.png"}
              height={1000}
              width={1000}
              className="h-full w-full object-contain object-center"
              alt="Paleta Villaizan"
            />
          </section>
          <section className="hidden w-1/2 flex-col items-start justify-center gap-2 pl-40 lg:flex">
            <h2 className="text-xl text-red-800">
              En Paletas Villaizan nos basamos en la tradición de una paleta artesanal, sin comprometer el
              delicioso sabor que ofrecemos
            </h2>
            <Link
              href="as"
              className={cn(
                buttonVariants(),
                "z-[100] flex flex-row items-center gap-1 bg-red-800 px-5 py-5 text-lg font-semibold hover:bg-red-900"
              )}
            >
              <p>Quiero probarlos</p>
              <ChevronRight className="aspect-square w-4 shrink-0" />
            </Link>
          </section>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper className="mt-4 font-['Abhaya_Libre'] overflow-x-hidden">
        <MainHistory />
        <HistoryTimeline historyItems={historyItems} />

        <NumberProof numberProofs={numberProofs} />

        <Vision />
        <Mision />

        <Sabores className="mt-5" />

        <section className="h-[300px]"></section>
      </MaxWidthWrapper>
    </>
  );
}
export default AboutUsPage;
