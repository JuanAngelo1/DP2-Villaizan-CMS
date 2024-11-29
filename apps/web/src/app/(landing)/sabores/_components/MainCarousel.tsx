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
  Newspaper,
  Popsicle,
  Swords,
} from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CSSProperties, useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { cn } from "@repo/ui/lib/utils";
import "./../allView.css";
import PointClaimDialog from "./PointClaimDialog";

type Modes = "history" | "benefits" | "products" | null;

function MainCarousel({ frutas, user }: { frutas: Fruta[]; user: User | undefined }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const villaparada = searchParams.get("villaparada");
  const id_fruta = searchParams.get("id_fruta");

  let startingIdx = 0;
  if (id_fruta) {
    startingIdx = frutas.findIndex((fruta) => fruta.id === id_fruta);
    if (startingIdx === -1) startingIdx = 0;
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y", loop: true, startIndex: startingIdx }, [
    Autoplay({ playOnInit: id_fruta === null ? true : false, stopOnInteraction: true, delay: 2500 }),
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

  const updateRadius = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      setRadius(Math.min(containerWidth, containerHeight) / 2); // Adjust for padding or item size
    }
  };

  const [isOnGeneralView, setIsOnGeneralView] = useState(false);
  const [selectedMode, setSelectedMode] = useState<Modes[]>(frutas.map((fruta) => null));

  const containerRef = useRef<HTMLDivElement>(null); // Ref for the container
  const [radius, setRadius] = useState(0);
  const angleStep = 360 / frutas.length;

  useEffect(() => {
    // Calculate radius dynamically
    updateRadius(); // Initial calculation
    window.addEventListener("resize", updateRadius); // Recalculate on resize

    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <>
      <PointClaimDialog villaparada={villaparada} id_fruta={id_fruta} user={user} />
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
              <EmblaSlide className="relative flex" key={fruta.id}>
                <FrutaDisplay fruta={fruta} selectedMode={selectedMode[index]} user={user} />
              </EmblaSlide>
            );
          })}
        </EmblaContainer>
        <div className="absolute left-0 top-0 z-[200] flex h-full flex-col items-start justify-center gap-3 p-5">
          <CircleButtonWithHiddenText
            Icon={CircleDotDashed}
            hiddenText="Ver todos"
            onClick={() => {
              setIsOnGeneralView(true);
              setTimeout(() => {
                updateRadius();
              }, 200);
            }}
          />
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
            <CircleButton Icon={Swords} onClick={() => toggleMode(selectedSnap, "benefits")} text="Poderes" />
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

      {isOnGeneralView && (
        <div
          className="absolute left-0 right-0 top-0 mt-[68px] flex items-center justify-center overflow-hidden"
          style={{
            height: "calc(100vh - 68px)",
            backgroundImage: "url(/sabores/sabores-background.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="text-center text-xl font-semibold">Selecciona una fruta</p>
            <p className="text-muted-foreground text-center">
              Selecciona alguna de nuestras frutas y enterate <br /> todo sobre ellas. No olvides pasar por
              sus Villaparadas!
            </p>
          </div>
          <div
            ref={containerRef}
            className="carousel-container my-auto"
            style={{ height: "calc(100vh - 368px)" }}
          >
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
                    className="circle-item group/circle z-[100] overflow-visible bg-red-800 transition-all hover:scale-150 hover:bg-red-700"
                    style={{
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
                    }}
                    onClick={() => {
                      setIsOnGeneralView(false);
                      emblaApi?.scrollTo(index);
                    }}
                  >
                    <Image
                      src={imagen}
                      alt={fruta.nombre}
                      width={1000}
                      height={1000}
                      className="h-full w-full object-contain transition-all group-hover/circle:scale-125"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FrutaDisplay({
  fruta,
  selectedMode,
  user,
}: {
  fruta: Fruta;
  selectedMode: Modes;
  user: User | undefined;
}) {
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
        "relative m-auto flex max-w-7xl flex-1 flex-col items-center justify-center gap-3 overflow-hidden p-8 text-black",
        selectedMode === "history" && "flex-row items-center",
        selectedMode === "benefits" && "flex-col gap-4"
      )}
      style={{
        height: "calc(100vh - 68px)",
        maxHeight: "calc(100vh - 68px)",
      }}
    >
      <div className="flex w-full flex-row gap-6 absolute top-10 left-0">
        {fruta.vi_villaparada.map((villaparada) => {
          const isUnlocked = villaparada.isUnlocked !== undefined ? villaparada.isUnlocked : false;

          const unlockedText = "Usted reclamo esta Villaparada por 20 puntos.";
          const lockedText = "No ha reclamado esta Villaparada. Ve ahora!";

          return (
            <Popover key={villaparada.id}>
              <PopoverTrigger asChild>
                <div className="relative aspect-square h-24 cursor-pointer overflow-hidden rounded-full">
                  {isUnlocked === false && (
                    <>
                      <div className="absolute bottom-0 left-0 right-0 top-0 rounded-full bg-black opacity-55" />
                      <div className="absolute bottom-0 left-0 right-0 top-0 rounded-full p-6">
                        <Image
                          src={"/sabores/lock.png"}
                          width={1000}
                          height={1000}
                          alt="lock"
                          className="h-full w-full opacity-100"
                        />
                      </div>
                    </>
                  )}
                  <Image src={"/VillaParadaIcon.png"} height={1000} width={1000} alt="VillaparadaLogo" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-4">
                <div>
                  <p className="text-sm text-red-800">Villaparada</p>
                  <p className="line-clamp-2">{villaparada.direccion}</p>
                  <div className="mt-2 flex flex-row items-center gap-2 border-l-4 border-[#FACC15] bg-[#FEFCE8] px-3 py-2 text-sm">
                    {user
                      ? isUnlocked === true
                        ? unlockedText
                        : lockedText
                      : "Inicie sesión para reclamar esta Villaparada."}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
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
