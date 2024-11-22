"use client";

import { useCarouselArrowButtons } from "@web/hooks/useCarouselArrowButtons";
import { useSelectedSnapDisplay } from "@web/hooks/useSelectedSnapDisplay";
import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { AnimationProps, Variants, useMotionValueEvent, useScroll } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownWideNarrow,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleDotDashed,
  HandHeart,
  Newspaper,
  Popsicle,
} from "lucide-react";
import { CSSProperties, useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/carousel";
import { cn } from "@repo/ui/lib/utils";

const mockText =
  "En <strong>Helados Villaizan</strong>, la paleta de <span style='color: #c0392b'>manzana</span> no es solo un sabor; es una celebración de la frescura y el dulzor de esta fruta. La inspiración para esta paleta surgió cuando, en un viaje por las tierras altas de Tarapoto, la familia Villaizan descubrió una pequeña granja donde se cultivaban manzanas de un color rojo profundo y un aroma irresistible. Fascinados por la frescura de cada mordisco, decidieron capturar esa experiencia en un helado. El sabor <span style='color: #c0392b'>manzana</span> en <strong>Helados Villaizan</strong> se elabora a partir de jugo de manzana natural, cuidadosamente seleccionado y prensado en frío para mantener su sabor auténtico y sus beneficios.";

type Modes = "history" | "benefits" | "products" | null;
type Fruta = {
  frutaImagen: string;
  frutaNombre: string;
};

function SaboresPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y", loop: true }, [
    Autoplay({ playOnInit: true, stopOnInteraction: true, delay: 2500 }),
  ]);

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    useCarouselArrowButtons(emblaApi);

  const getCurrentBackgroundColor = () => {
    if (selectedSnap === 0) return "#DB8936";
    if (selectedSnap === 1) return "#4B8936";
    if (selectedSnap === 2) return "#9918CB";
  };

  const toggleAutoplay = () => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play
    playOrStop()
  }

  const toggleMode = (snap: number, mode: Modes) => {
    setSelectedMode((prev) => {
      const newModes = [...prev];

      if (newModes[snap] === mode) {
        newModes[snap] = null;
        return newModes;
      }

      newModes[snap] = mode;
      return newModes;
    });
  };

  const frutas: Fruta[] = [
    {
      frutaImagen: "/sabores/test.png",
      frutaNombre: "Mr Manzana",
    },
    {
      frutaImagen: "/sabores/maracumango.png",
      frutaNombre: "El Maracumango",
    },
    {
      frutaImagen: "/sabores/senorpera.png",
      frutaNombre: "Sr Pera",
    },
  ];

  const [selectedMode, setSelectedMode] = useState<Modes[]>(frutas.map((fruta) => null));

  return (
    <div
      className="embla relative w-full overflow-hidden transition-colors duration-1000"
      style={{
        backgroundImage: "url(/sabores/sabores-background.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      ref={emblaRef}
    >
      <EmblaContainer className="">
        {frutas.map((fruta, index) => {
          return (
            <EmblaSlide className="relative flex">
              <Fruta fruta={fruta} selectedMode={selectedMode[index]} />
            </EmblaSlide>
          );
        })}
      </EmblaContainer>
      <div className="absolute left-0 top-0 z-[200] flex h-full flex-col items-start justify-center gap-3 p-5">
        <CircleButtonWithHiddenText Icon={CircleDotDashed} hiddenText="Ver todos"/>
        <CircleButtonWithHiddenText Icon={ArrowDownWideNarrow} hiddenText="Desplazar" onClick={toggleAutoplay}/>
      </div>

      <div className="absolute bottom-0 right-0 top-0 z-[200] flex flex-col items-end p-5">
        <CircleButton Icon={ChevronUp} onClick={onPrevButtonClick} />
        <div className="flex w-fit flex-1 flex-col items-end justify-center gap-3">
          <CircleButton
            Icon={Newspaper}
            onClick={() => toggleMode(selectedSnap, "history")}
            text="Historia"
          />
          <CircleButton
            Icon={HandHeart}
            onClick={() => toggleMode(selectedSnap, "benefits")}
            text="Beneficios"
          />
          <CircleButton
            Icon={Popsicle}
            iconClassname="rotate-90"
            onClick={() => toggleMode(selectedSnap, "products")}
            text="Productos"
          />
        </div>
        <CircleButton Icon={ChevronDown} onClick={onNextButtonClick} />
      </div>
    </div>
  );
}

function Fruta({ fruta, selectedMode }: { fruta: Fruta; selectedMode: Modes }) {
  return (
    <div
      className={cn(
        "m-auto flex max-w-7xl flex-1 flex-col items-center justify-center gap-3 overflow-hidden p-8 text-black",
        selectedMode === "history" && "flex-row items-center",
        selectedMode === "benefits" && "flex-col gap-4"
      )}
      style={{
        height: "calc(100vh - 68px)",
        maxHeight: "calc(100vh - 68px)",
      }}
    >
      <motion.div className={cn("flex h-full flex-col items-center overflow-hidden p-24")} layout>
        <motion.img src={fruta.frutaImagen} className="z-50 max-h-full flex-grow object-contain" layout />
        <motion.p className="shrink-0 text-6xl font-bold text-black" layout>
          {fruta.frutaNombre}
        </motion.p>
      </motion.div>

      <AnimatePresence mode="sync">
        {selectedMode === "history" && (
          <motion.div className="w-[700px] text-xl">
            <Typewriter
              onInit={(typewriter) => {
                const segments = mockText.split(".");

                segments.forEach((segment, index) => {
                  if (segment) {
                    const segmentToShow = segment + ".";
                    typewriter.typeString(segmentToShow);
                    typewriter.pauseFor(500);
                  }
                });

                typewriter.start();
              }}
              options={{ delay: 15 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        {selectedMode === "benefits" && (
          <motion.div
            className="flex flex-col gap-3"
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <BeneficioItem imageSide="left" image="/publicaciones/imagen1.png">
              El mango es una excelente fuente de vitaminas como la vitamina C (fortalece el sistema
              inmunológico), vitamina A (beneficia la vista y la piel) y vitamina E (antioxidante que protege
              las células).
            </BeneficioItem>
            <BeneficioItem imageSide="left" image="/publicaciones/imagen2.png">
              Contiene polifenoles que actúan como antioxidantes y ayudan a reducir el daño celular, lo cual
              es beneficioso para la prevención de enfermedades crónicas.
            </BeneficioItem>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedMode === "products" && (
        <div className="grid grid-cols-6 gap-2">
          <ProductoItem />
          <ProductoItem />
          <ProductoItem />
          <div className="col-span-3 flex cursor-pointer flex-col justify-between rounded-lg bg-red-800 p-4 text-lg text-white transition-all hover:bg-red-900">
            <p>Visita nuestra tienda para ver todos los productos.</p>
            <div className="flex flex-row items-center justify-between">
              <p className="text-white">Tienda</p>
              <ChevronRight className="stroke-black" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EmblaContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn("h-full", className)}
      style={{
        display: "flex",
        touchAction: "pan-x pinch-zoom",
        marginTop: "0px",
        height: "calc(100vh - 68px)",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}

function EmblaSlide({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn("", className)}
      style={{
        transform: "translate3d(0, 0, 0)",
        flex: "0 0 100%",
        minHeight: "0",
        paddingLeft: "1rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CircleButton({
  Icon,
  text = "",
  iconClassname,
  onClick,
}: {
  Icon: any;
  text?: string;
  iconClassname?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn(
        "flex aspect-square h-[60px] w-fit cursor-pointer items-center justify-center rounded-full border-[4px] border-black p-3 ring-black transition-all hover:ring-2",
        text !== "" && "w-[170px] justify-start px-5"
      )}
      onClick={onClick}
    >
      <Icon className={cn("aspect-square h-full shrink-0 stroke-black stroke-[2px]", iconClassname)} />
      {text != "" && (
        <p className="ml-3 mr-1 w-full text-center font-['Abhaya_Libre'] text-xl text-black">{text}</p>
      )}
    </div>
  );
}

function CircleButtonWithHiddenText({
  Icon,
  hiddenText = "",
  iconClassname,
  onClick,
}: {
  Icon: any;
  hiddenText?: string;
  iconClassname?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn(
        "group/circle flex aspect-square h-[60px] min-w-0 cursor-pointer items-center justify-center rounded-full border-[4px] border-black p-3 ring-black transition-all hover:aspect-auto hover:w-fit hover:ring-2"
        // hiddenText !== "" && "w-[170px] justify-start px-5"
      )}
      onClick={onClick}
    >
      <Icon className={cn("aspect-square h-full shrink-0 stroke-black stroke-[2px]", iconClassname)} />
      {hiddenText != "" && (
        <p className="animate-in ml-3 mr-1 hidden w-full text-center font-['Abhaya_Libre'] text-xl text-black transition-all group-hover/circle:block">
          {hiddenText}
        </p>
      )}
    </div>
  );
}

function ProductoItem() {
  return (
    <div className="group/maincard relative flex h-[120px] w-fit cursor-pointer flex-col rounded-lg bg-red-200 p-3 transition-colors hover:bg-red-300">
      <div className="absolute -left-2 -top-2 flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-red-800 bg-red-700 text-lg font-bold text-white">
        70%
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <img
          src="/sabores/paleta-producto.png"
          className="h-full flex-1 object-contain transition-all group-hover/maincard:scale-110"
        />
      </div>
      <p className="text-center text-2xl font-semibold transition-all group-hover/maincard:font-bold group-hover/maincard:underline">
        Helado 1
      </p>
    </div>
  );
}

function BeneficioItem({
  children,
  image,
  imageSide,
}: {
  children?: React.ReactNode;
  image?: string;
  imageSide: "left" | "right";
}) {
  return (
    <motion.div className="flex flex-row gap-2">
      {imageSide === "left" && image && (
        <div className="h-auto w-[100px] p-1">
          <img className="h-full rounded-lg border-red-500 object-cover object-center" src={image} />
        </div>
      )}
      <p className="flex-1 text-xl">{children}</p>
      {imageSide === "right" && image && (
        <img className="w-[100px] rounded-lg border-red-500 object-cover object-center" src={image}></img>
      )}
    </motion.div>
  );
}

export default SaboresPage;
