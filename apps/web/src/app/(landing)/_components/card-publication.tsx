"use client";

import { Publicacion } from "@web/src/app/data/publicaciones";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/card";

interface CardPublicationProps {
  publication: Publicacion;
  isFeatured?: boolean;
}

const CardPublication: React.FC<CardPublicationProps>  = ({ publication, isFeatured = false }) => {
  return (
    <Card className={`flex flex-col ${isFeatured ? "bg-primary" : "bg-white"}`}>
      <CardHeader>
        <Image
          src={publication.imagen}
          alt={publication.titulo}
          width={isFeatured ? 800 : 400}
          height={isFeatured ? 400 : 160}
          className={`rounded-lg object-cover ${isFeatured ? "h-60 w-full" : "h-40 w-full lg:w-1/3"}`}
          priority={isFeatured}
        />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <h2 className="mb-2 text-2xl font-bold">{publication.titulo}</h2>
        <p className="flex-1 text-gray-600">{publication.descripcion}</p>
        <div className="mt-4">
          <span className="text-sm text-gray-500">Autor: {publication.autor}</span>
          <span className="ml-4 text-sm text-gray-500">
            {new Date(publication.fecha).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/publicaciones/${publication.slug}`} className="text-blue-500 hover:underline">
          Leer más
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardPublication;
