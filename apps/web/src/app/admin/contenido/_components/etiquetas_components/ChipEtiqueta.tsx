import { Etiqueta } from "@web/types";
import { HTMLProps } from "react";
import { cn } from "@repo/ui/lib/utils";

function darkenColor({ hex, percent }: { hex: string; percent: number }): string {
  hex = hex.replace(/^#/, "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  r = Math.round(r * (1 - percent / 100));
  g = Math.round(g * (1 - percent / 100));
  b = Math.round(b * (1 - percent / 100));
  r = r < 0 ? 0 : r;
  g = g < 0 ? 0 : g;
  b = b < 0 ? 0 : b;
  const newHex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  return newHex;
}

function lightenColor({ hex, percent }: { hex: string; percent: number }): string {
  hex = hex.replace(/^#/, "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  r = Math.round(r + (255 - r) * (percent / 100));
  g = Math.round(g + (255 - g) * (percent / 100));
  b = Math.round(b + (255 - b) * (percent / 100));
  r = r > 255 ? 255 : r;
  g = g > 255 ? 255 : g;
  b = b > 255 ? 255 : b;
  const newHex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  return newHex;
}

function ChipEtiqueta({
  etiqueta,
  className,
  ...props
}: {
  etiqueta: Etiqueta;
  className?: string;
} & HTMLProps<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={cn(
        "w-fit rounded-3xl px-3 py-1 text-sm font-normal",
        // etiqueta.colorfondo.toLowerCase() === "#ffffff" && "border",
        className
      )}
      style={{
        backgroundColor: etiqueta.colorfondo,
        color: etiqueta.colortexto,
      }}
    >
      {etiqueta.nombre}
    </p>
  );
}
export default ChipEtiqueta;
