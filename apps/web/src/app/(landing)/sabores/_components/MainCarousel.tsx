"use client";

import { useCarouselArrowButtons } from "@web/hooks/useCarouselArrowButtons";
import { useSelectedSnapDisplay } from "@web/hooks/useSelectedSnapDisplay";
import { ContenidoEducativo, Fruta, Producto } from "@web/types";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
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
import Image from "next/image";
import Link from "next/link";
import { CSSProperties, useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import { cn } from "@repo/ui/lib/utils";
import "./../allView.css";

type Modes = "history" | "benefits" | "products" | null;

function MainCarousel({ frutas }: { frutas: Fruta[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y", loop: true }, [
    Autoplay({ playOnInit: true, stopOnInteraction: true, delay: 2500 }),
  ]);

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    useCarouselArrowButtons(emblaApi);

  const toggleAutoplay = () => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
    playOrStop();
  };

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

  const [selectedMode, setSelectedMode] = useState<Modes[]>(frutas.map((fruta) => null));

  const containerRef = useRef(null); // Ref for the container
  const [radius, setRadius] = useState(0);
  const angleStep = 360 / frutas.length;

  useEffect(() => {
    // Calculate radius dynamically
    const updateRadius = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        setRadius(Math.min(containerWidth, containerHeight) / 2); // Adjust for padding or item size
      }
    };

    updateRadius(); // Initial calculation
    window.addEventListener("resize", updateRadius); // Recalculate on resize

    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <>
      {/* <div
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
              <EmblaSlide className="relative flex" key={fruta.id}>
                <FrutaDisplay fruta={fruta} selectedMode={selectedMode[index]} />
              </EmblaSlide>
            );
          })}
        </EmblaContainer>
        <div className="absolute left-0 top-0 z-[200] flex h-full flex-col items-start justify-center gap-3 p-5">
          <CircleButtonWithHiddenText Icon={CircleDotDashed} hiddenText="Ver todos" />
          <CircleButtonWithHiddenText
            Icon={ArrowDownWideNarrow}
            hiddenText="Desplazar"
            onClick={toggleAutoplay}
          />
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
      </div> */}

      <div ref={containerRef} className="carousel-container">
        <div ref={containerRef} className="circle">
          {frutas.map((fruta, index) => {
            const angle = angleStep * index;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            const contenido_educativo = fruta.vi_contenidoeducativo.filter(
              (contenido) => contenido.tipocontenido === "Imagen"
            );
            let imagen;

            if (contenido_educativo.length === 0) imagen = "/sabores/missing.png";
            else imagen = contenido_educativo[0].urlcontenido;

            return (
              <div
                key={index}
                className="circle-item"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
                }}
              >
                <Image
                  src={imagen}
                  alt={fruta.nombre}
                  width={1000}
                  height={1000}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function FrutaDisplay({ fruta, selectedMode }: { fruta: Fruta; selectedMode: Modes }) {
  const contenido_educativo = fruta.vi_contenidoeducativo.filter(
    (contenido) => contenido.tipocontenido === "Imagen"
  );
  let imagen;

  if (contenido_educativo.length === 0) imagen = "/sabores/missing.png";
  else imagen = contenido_educativo[0].urlcontenido;

  const poderes = fruta.vi_contenidoeducativo.filter(
    (contenido) => contenido.tipocontenido === "Información"
  );

  const productos = fruta.vi_producto_fruta.slice(0, 4).map((producto) => producto.vi_producto);

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
        <Image
          height={1000}
          width={1000}
          src={imagen}
          className="z-50 max-h-full flex-grow object-contain"
          alt={fruta.nombre}
        />
        <motion.p className="shrink-0 text-6xl font-bold text-black" layout>
          {fruta.nombre}
        </motion.p>
      </motion.div>

      <AnimatePresence mode="sync">
        {selectedMode === "history" && (
          <motion.div className="w-[700px] text-xl">
            <Typewriter
              onInit={(typewriter) => {
                const segments = fruta.descripcion.split(".");

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
            className="flex flex-col gap-6"
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              duration: 0.5,
            }}
          >
            {poderes.map((poder, index) => {
              return <BeneficioItem key={index} poder={poder} idx={index + 1} />;
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {selectedMode === "products" && (
        <AnimatePresence mode="popLayout">
          <motion.div
            className="grid w-full grid-cols-5 gap-2 lg:w-[70%]"
            animate={{
              opacity: [0, 1],
              y: [100, 0],
            }}
            transition={{
              duration: 0.5,
            }}
          >
            {productos.map((producto) => {
              return <ProductoItem key={producto.id} producto={producto} />;
            })}
            <Link
              href="https://heladosvillaizan.tech/"
              style={{ gridColumn: `span ${5 - productos.length} / span ${5 - productos.length}` }}
              className="col-span-2 flex cursor-pointer flex-col justify-between rounded-lg bg-red-800 p-4 text-lg text-white transition-all hover:bg-red-900"
            >
              <p className="font-['Abhaya_Libre'] text-3xl">
                Visita nuestra tienda para ver
                <br /> todos los productos.
              </p>
              <div className="flex flex-row items-center justify-between">
                <p className="font-['Abhaya_Libre'] text-2xl text-white">Tienda</p>
                <ChevronRight className="stroke-white" />
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
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

function ProductoItem({ producto }: { producto: Producto }) {
  return (
    <Link
      href={`https://heladosvillaizan.tech/producto/${producto.id}`}
      className="group/maincard relative col-span-1 flex h-[200px] w-auto cursor-pointer flex-col rounded-lg border-2 border-red-800"
    >
      {producto.vi_promocion !== null && (
        <div className="absolute -left-2 -top-2 z-[100] flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-red-800 bg-red-700 text-lg font-bold text-white">
          {producto.vi_promocion.porcentajedescuento}%
        </div>
      )}
      <div className="h-full w-full overflow-hidden rounded-lg">
        <Image
          alt={producto.nombre}
          height={1000}
          width={1000}
          src={producto.urlimagen}
          className="h-full w-full object-cover transition-all group-hover/maincard:scale-110"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-black opacity-0 transition-all group-hover/maincard:opacity-50" />
      <p className="absolute top-1/2 w-full -translate-y-1/2 text-center text-lg font-semibold text-white opacity-0 transition-all group-hover/maincard:font-bold group-hover/maincard:underline group-hover/maincard:opacity-100">
        {producto.nombre}
      </p>
    </Link>
  );
}

function BeneficioItem({ poder, idx }: { poder: ContenidoEducativo; idx: number }) {
  return (
    <motion.div className="flex flex-row gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black p-1">
        <p className="text-md font-bold">{idx}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold">{poder.titulo}</p>
        <p className="flex-1 text-xl">{poder.contenidoinformacion}</p>
      </div>
    </motion.div>
  );
}

export default MainCarousel;
