"use client";

import { AnimationProps, TargetAndTransition, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@repo/ui/components/button";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

const Hero: React.FC = () => {
  const animation: AnimationProps = {
    initial: { opacity: 0, y: -35 },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: 0.5,
    },
  };

  return (
    <section
      className="flex min-h-[800px] justify-center bg-gradient-to-b from-[#ae9c5280] to-transparent py-10 *:items-center lg:py-16"
      style={{ height: "calc(100dvh - 68px)" }}
    >
      <MaxWidthWrapper className="justify-center xl:justify-between flex flex-col items-center gap-10 lg:gap-8 p-8 xl:flex-row">
        <div className="flex flex-col items-start text-left font-['Abhaya_Libre'] text-red-800 xl:w-[50%]">
          <motion.h1
            {...animation}
            className="text-center text-6xl font-semibold  md:text-7xl lg:text-8xl xl:text-start 2xl:text-9xl w-full"
            style={{ lineHeight: "0.8em" }}
          >
            Un rincón de frescura y sabor auténtico
          </motion.h1>
          <p className="mt-2 text-center text-base text-black md:text-lg lg:text-xl xl:text-start 2xl:text-2xl w-full">
            No son solo paletas, son momentos. Hechas a mano, pensadas para refrescar tus días con un toque
            auténtico y natural
          </p>
          <section className="mt-4 flex flex-col xl:flex-row items-center justify-center xl:justify-start gap-2 w-full">
            <Link href={"https://heladosvillaizan.tech/"}>
              <Button className="bg-red-800 text-lg hover:bg-red-900" size={"lg"}>
                Compra ahora
              </Button>
            </Link>
            <p className="italic text-black hidden xl:block">"Las mejores de Tarapoto"</p>
          </section>
        </div>
        <Image
          src="/hero-paleta2.png"
          alt="start-image"
          width={1000}
          height={1000}
          className="max-h-[800px] min-h-0 h-fit w-auto  object-contain object-center"
        />
      </MaxWidthWrapper>
    </section>
  );
};

export default Hero;
