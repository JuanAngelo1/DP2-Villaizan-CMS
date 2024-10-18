"use client";

import { Publicacion } from "@web/src/app/data/publicaciones";
import useCardLayout from "@web/src/app/hooks/useCardLayout";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
import { Card, CardContent, CardHeader } from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";

interface CardPublicationProps {
  publication: Publicacion;
}

const CardPublication: React.FC<CardPublicationProps> = ({ publication }) => {
  const { ref, isRow } = useCardLayout(800);

  return (
    <Link href={`/publicaciones/${publication.slug}`} className="text-accent hover:underline">
      <Card
        ref={ref}
        className={cn(
          "flex h-full min-h-fit overflow-hidden rounded-lg bg-white hover:bg-primary-foreground hover:shadow-lg transition-all group/maincard",
          isRow ? "flex-row" : "flex-col"
        )}
      >
        <CardContent className="flex flex-1 flex-col p-5">
          <AspectRatio ratio={16 / 9} className="w-full overflow-hidden rounded-md">
            <Image
              src={publication.imagen}
              alt={publication.titulo}
              fill
              className="object-cover group-hover/maincard:scale-110 transition-all"
              priority={false}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </AspectRatio>

          <h3 className="text-primary mt-3 line-clamp-1 text-lg font-bold md:text-xl">
            {publication.titulo}
          </h3>
          <p className="mt-2 line-clamp-5 flex-1 text-gray-600 text-sm">{publication.descripcion}</p>
          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <span>{publication.autor}</span>
            <span>{new Date(publication.fecha).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardPublication;
