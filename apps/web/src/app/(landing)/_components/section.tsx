import React from "react";
import { cn } from "@repo/ui/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, children, className }) => {
  return (
    <section id={id} className={cn("px-4 py-16", className)}>
      {children}
    </section>
  );
};

export default Section;