"use server";

import { Fruta, Response } from "@web/types";
import axios from "axios";
import { Check, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { productFeats } from "../../data/about_us";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";
import HistoryTimeline from "./_components/HistoryTimeline";
import MainHistory from "./_components/MainHistory";
import Mision from "./_components/Mision";
import NumberProof from "./_components/NumberProof";
import Frutas from "./_components/Frutas";
import Vision from "./_components/Vision";


async function getFrutas() {
  try {
    const response: Response<Fruta[]> = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/frutas`);

    if (response.data.status !== "Success") throw new Error("Error al obtener las frutas");

    return response.data.result;
  } catch (error) {
    console.log(error);
    return [];
  }
}


async function AboutUsPage() {
  const frutas = await getFrutas();
  // if (!frutas) throw new Error("Error al obtener las frutas");

  console.log(frutas)

  return (
    <>
      <div className="relative flex flex-row justify-between overflow-hidden overflow-x-hidden bg-[#ffe47a80] py-6 font-['Abhaya_Libre'] xl:py-10">
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
              href="https://heladosvillaizan.tech/"
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
              href="https://heladosvillaizan.tech/"
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
      <MaxWidthWrapper className="mt-4 overflow-x-hidden font-['Abhaya_Libre']">
        <MainHistory />
        <HistoryTimeline />

        <NumberProof />

        <Vision />
        <Mision />

        <Frutas className="mt-10" frutas={frutas}/>

        <section className="h-[300px]"></section>
      </MaxWidthWrapper>
    </>
  );
}
export default AboutUsPage;
