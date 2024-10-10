'use client';
import { Publicacion } from "@web/src/app/data/publicaciones";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader } from "@repo/ui/components/card";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
import { cn } from "@repo/ui/lib/utils";
import useCardLayout from "@web/src/app/hooks/useCardLayout";

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
          "flex h-full overflow-hidden rounded-lg bg-white shadow-md",
          isRow ? "flex-row" : "flex-col"
        )}
      >
        <CardHeader className="w-full md:w-1/2">
          <AspectRatio ratio={16 / 9} className="w-full">
            <Image
              src={publication.imagen}
              alt={publication.titulo}
              fill
              className="object-cover"
              priority={false}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-4">
          <h2 className="text-primary mb-2 text-xl font-bold md:text-2xl">{publication.titulo}</h2>
          <p className="flex-1 text-gray-600">{publication.descripcion}</p>
          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <span>Autor: {publication.autor}</span>
            <span>{new Date(publication.fecha).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardPublication;