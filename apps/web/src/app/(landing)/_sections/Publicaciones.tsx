import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardTitle } from "@repo/ui/components/card";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

interface Publicacion {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  autor: string;
  fecha: string;
}

const publicaciones: Publicacion[] = [
  {
    id: 1,
    titulo: "Nuevo Sabor de Temporada",
    descripcion: "Descubre nuestro nuevo sabor de temporada que está conquistando corazones.",
    imagen: "/images/publicaciones/sabor-temporada.jpg",
    autor: "Juan Pérez",
    fecha: "2024-09-15",
  },
  {
    id: 2,
    titulo: "Helados Artesanales",
    descripcion: "Conoce el proceso artesanal detrás de nuestros deliciosos helados.",
    imagen: "/images/publicaciones/artesanales.jpg",
    autor: "María López",
    fecha: "2024-08-20",
  },
  {
    id: 3,
    titulo: "Nuestros Productos",
    descripcion: "Descubre la variedad de productos que tenemos para ti.",
    imagen: "/images/publicaciones/productos.jpg",
    autor: "Carlos García",
    fecha: "2024-07-10",
  },
  {
    id: 4,
    titulo: "Nuestras Sucursales",
    descripcion: "Conoce nuestras sucursales y visítanos en la más cercana.",
    imagen: "/images/publicaciones/sucursales.jpg",
    autor: "Ana Martínez",
    fecha: "2024-06-05",
  },
];

interface PublicationCardProps {
  publication: Publicacion;
  isFeatured?: boolean;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication, isFeatured = false }) => {
  return (
    <Card className={`flex flex-col gap-4 bg-white p-4 ${isFeatured ? "justify-between" : "xl:flex-row"}`}>
      <Image
        className={`rounded-lg object-cover ${isFeatured ? "h-60 w-full" : "h-40 w-full lg:w-1/3"}`}
        src={publication.imagen}
        alt={publication.titulo}
        width={isFeatured ? 800 : 400}
        height={isFeatured ? 400 : 160}
        priority={isFeatured}
      />
      <CardContent className={`m-0 flex w-full flex-col justify-around p-0`}>
        <CardTitle className="text-2xl font-semibold">{publication.titulo}</CardTitle>
        <CardDescription className="flex flex-1 text-gray-500">{publication.descripcion}</CardDescription>
        <div className="mt-4 flex w-full flex-row justify-between text-sm text-gray-400">
          <p>Autor: {publication.autor}</p>
          <p>{new Date(publication.fecha).toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const Publicaciones: React.FC = () => {
  const [featuredPublication, ...otherPublications] = publicaciones;

  return (
    <section className="flex min-h-[56rem] flex-col bg-gray-100 px-4 py-24" id="publicaciones">
      <MaxWidthWrapper className="flex flex-col items-center justify-center gap-y-20">
        {/* Título y botón */}
        <div className="flex w-full flex-col items-center justify-between gap-4 text-center md:flex-row">
          <h2 className="text-3xl md:text-7xl">Publicaciones destacadas</h2>
          <Button className="text-xl text-white">
            <Link href="/publicaciones" className="text-xl text-white">
              Ver todos
            </Link>
          </Button>
        </div>
        {/* Publicaciones */}
        <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Publicación destacada */}
          <PublicationCard publication={featuredPublication} isFeatured />

          {/* Resto de publicaciones */}
          <div className="grid grid-cols-1 gap-6">
            {otherPublications.map((pub) => (
              <PublicationCard key={pub.id} publication={pub} />
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Publicaciones;
