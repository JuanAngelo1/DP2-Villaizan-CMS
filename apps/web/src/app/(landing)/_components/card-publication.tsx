"use client";

import useCardLayout from "@web/src/app/hooks/useCardLayout";
import { VersionPublicacion } from "@web/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
import { Card, CardContent } from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";

interface CardPublicationProps {
  publicacion: VersionPublicacion;
}

const CardPublication: React.FC<CardPublicationProps> = ({ publicacion }) => {
  const { ref, isRow } = useCardLayout(800);

  return (
    <Link href={`/publicaciones/${publicacion.slug}`} className="text-accent hover:underline">
      <Card
        ref={ref}
        className={cn(
          "hover:bg-primary-foreground group/maincard flex h-full min-h-fit overflow-hidden rounded-lg bg-white transition-all hover:shadow-lg",
          isRow ? "flex-row" : "flex-col"
        )}
      >
        <CardContent className="flex flex-1 flex-col p-5">
          <AspectRatio ratio={16 / 9} className="w-full overflow-hidden rounded-md">
            <Image
              src={publicacion.urlimagen || "/publicaciones/publicacion-placeholder.png"}
              alt={publicacion.titulo}
              fill
              className="object-cover transition-all group-hover/maincard:scale-110"
              priority={false}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </AspectRatio>

          <h3 className="text-primary mt-3 line-clamp-1 text-lg font-bold md:text-xl">
            {publicacion.titulo}
          </h3>
          <p className="mt-2 line-clamp-5 flex-1 text-sm text-gray-600">{publicacion.descripcion}</p>
          <div className="mt-4 flex justify-between text-sm text-gray-500">
            {/* <span>{publicacion.}</span> */}
            <span>
              {new Date(publicacion.fechapublicacion || publicacion.fechacreacion).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardPublication;
