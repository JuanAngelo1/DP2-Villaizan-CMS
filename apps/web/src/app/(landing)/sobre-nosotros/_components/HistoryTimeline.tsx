"use client";

import { HistoryItemType, historyItems } from "@web/src/app/data/about_us";
import { AnimationControls, motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@repo/ui/lib/utils";

function HistoryTimeline() {
  return (
    <section className="relative mt-10 flex w-full flex-col pl-6 md:pl-0">
      {historyItems.map((item, idx) => {
        if (idx % 2 === 0) return <ItemLeft key={idx} item={item} />;

        return <ItemRight key={idx} item={item} />;
      })}

      <div className="bg-muted absolute left-6 top-0 z-[-1] h-full w-[3px] -translate-x-1/2 rounded-xl content-none md:left-1/2" />
    </section>
  );
}
export default HistoryTimeline;

function ItemLeft({ item }: { item: any }) {
  const Icon = item.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) mainControls.start("visible");
  }, [isInView]);

  return (
    <>
      <div
        ref={ref}
        className={cn("w-full py-3 md:w-1/2", "relative left-0 pl-8 pr-0 md:left-0 md:pl-0 md:pr-8")}
      >
        <ItemCard animationControls={mainControls} position="left">
          <ItemHeader>{item.title}</ItemHeader>
          <ItemDate>{item.date}</ItemDate>
          <ItemDescription>{item.content}</ItemDescription>
          <Image
            height={1000}
            width={1000}
            alt="Paleta Villaizan"
            src={item.image}
            className="mt-2 h-auto w-full rounded-md object-contain"
          />
          <div className="absolute left-0 top-1/2 block aspect-square w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-l bg-white md:hidden" />
          <div className="absolute right-0 top-1/2 hidden aspect-square w-3 -translate-y-1/2 translate-x-1/2 rotate-45 border-r border-t bg-white md:block" />
        </ItemCard>
        <div className="absolute left-0 top-1/2 block h-10 w-10 shrink-0 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-white p-2 md:left-0 md:hidden">
          <Icon className="h-full w-full shrink-0" />
        </div>
        <div className="absolute right-0 top-1/2 hidden h-10 w-10 shrink-0 -translate-y-1/2 translate-x-1/2 rounded-full border bg-white p-2 md:block">
          <Icon className="h-full w-full shrink-0" />
        </div>
        <div className="absolute -right-7 top-1/2 hidden w-fit -translate-y-1/2 translate-x-full rounded-2xl border px-4 py-1 text-lg font-semibold italic lg:block">
          {item.date}
        </div>
      </div>
    </>
  );
}

function ItemRight({ item }: { item: HistoryItemType }) {
  const Icon = item.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) mainControls.start("visible");
  }, [isInView]);

  return (
    <div ref={ref} className={cn("w-full py-3 md:w-1/2", "relative left-0 pl-8 md:left-1/2")}>
      <ItemCard animationControls={mainControls} position="right">
        <ItemHeader>{item.title}</ItemHeader>
        <ItemDate>{item.date}</ItemDate>
        <ItemDescription>{item.content}</ItemDescription>
        <Image
          height={1000}
          width={1000}
          alt="Paleta Villaizan"
          src={item.image}
          className="mt-2 h-auto w-full rounded-md object-contain"
        />
        <div className="absolute left-0 top-1/2 aspect-square w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-l bg-white" />
      </ItemCard>
      <div className="absolute left-0 top-1/2 h-10 w-10 shrink-0 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-white p-2 md:left-0">
        <Icon className="h-full w-full shrink-0" />
      </div>

      <div className="absolute -left-7 top-1/2 hidden w-fit -translate-x-full -translate-y-1/2 rounded-2xl border px-4 py-1 text-lg font-semibold italic lg:block">
        {item.date}
      </div>
    </div>
  );
}

function ItemCard({
  children,
  animationControls,
  position,
}: {
  children: React.ReactNode;
  animationControls: AnimationControls;
  position: "left" | "right";
}) {
  return (
    <motion.div
      className="relative rounded-md border p-5"
      variants={{
        hiddenLeft: { opacity: 0, x: -50 },
        hiddenRight: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
      }}
      initial={position === "left" ? "hiddenLeft" : "hiddenRight"}
      transition={{ duration: 0.5, delay: 0.5 }}
      animate={animationControls}
    >
      {children}
    </motion.div>
  );
}

function ItemHeader({ children }: { children: React.ReactNode }) {
  return <header className="text-xl font-bold leading-4 lg:mb-1">{children}</header>;
}

function ItemDate({ children }: { children: React.ReactNode }) {
  return <p className="text-sm italic lg:hidden">{children}</p>;
}

function ItemDescription({ children }: { children: React.ReactNode }) {
  return <p className="pt-1 leading-5">{children}</p>;
}
