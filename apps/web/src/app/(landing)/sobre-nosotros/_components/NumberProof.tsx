"use client";

import { useAnimation, useInView, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@repo/ui/lib/utils";
import { NumberProofType } from "../page";

function NumberProof({ numberProofs }: { numberProofs: NumberProofType[]}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

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
  }, [inView]);

  return (
    <div
      className={cn(
        "flex flex-col items-center -space-y-1 rounded-md border py-10",
        isLast && "col-span-2 md:col-span-1"
      )}
    >
      <p className="text-5xl font-extrabold text-red-800">{`${proof.textBefore || ''}${displayNumber}`}</p>
      <p className="text-xl text-red-800">{proof.label}</p>
    </div>
  );
}
