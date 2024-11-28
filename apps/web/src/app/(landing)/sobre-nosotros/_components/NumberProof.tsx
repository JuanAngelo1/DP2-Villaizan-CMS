"use client";

import { useAnimation, useInView, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@repo/ui/lib/utils";
import { numberProofs, NumberProofType } from "@web/src/app/data/about_us";

function NumberProof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });

  return (
    <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3" ref={ref}>
      {numberProofs.map((proof, idx) => {
        return (
          <ProofCard key={idx} proof={proof} isLast={idx === numberProofs.length - 1} inView={isInView} />
        );
      })}
    </section>
  );
}
export default NumberProof;

function ProofCard({
  proof,
  isLast,
  inView,
}: {
  proof: NumberProofType;
  isLast: boolean;
  inView: boolean;
}) {
  const [displayNumber, setDisplayNumber] = useState<number>(0);

  const springNumberCount = useSpring(0, {
    bounce: 0,
    duration: 1500,
  });

  springNumberCount.on("change", (value) => {
    setDisplayNumber(Math.round(value));
  });

  useEffect(() => {
    if (inView) springNumberCount.set(proof.value);
    else springNumberCount.set(0);
  }, [inView]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center -space-y-1 rounded-md border py-10 overflow-hidden",
        isLast && "col-span-2 md:col-span-1"
      )}
      style={{
        backgroundImage: `url(${proof.image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <p className="text-5xl font-extrabold text-red-800 z-50">{`${proof.textBefore || ''}${displayNumber}`}</p>
      <p className="text-xl text-red-800 z-50">{proof.label}</p>

      <div className="bg-white absolute top-0 right-0 left-0 bottom-0 z-20 opacity-85"/>
    </div>
  );
}
