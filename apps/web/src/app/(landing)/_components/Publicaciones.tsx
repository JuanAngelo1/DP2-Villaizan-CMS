import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@repo/ui/components/button";
import MaxWidthWrapper from "./MaxWidthWrapper";

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

const Publicaciones: React.FC = () => {
  return (
    <section className="bg-gray-100 p-24">
      <MaxWidthWrapper className="flex flex-col items-center justify-center gap-y-20">
        <div className="flex w-full flex-row items-center justify-between">
          <h2 className="text-7xl">Publicaciones destacadas</h2>
          <Button className="text-lg">Ver todos</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <article className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
            <img className="w-full h-60 object-cover rounded-lg" src="imagen_helado.jpg" alt="Helado de aguaymanto" />
            <h3 className="text-2xl font-semibold mt-4">Helado de aguaymanto, ¿por qué?</h3>
            <p className="text-gray-500 mt-2">En esta pequeña publicación, te presentamos nuestro nuevo sabor hecho de aguaymanto, junto con sus principales beneficios y ventajas.</p>
            <div className="text-sm text-gray-400 mt-auto">
              <p>Autor: Renzo Pinto</p>
              <p>04/09/2024</p>
            </div>
          </article>

          <div className="grid grid-cols-1 gap-6">
            
            <article className="bg-white p-4 rounded-lg shadow-lg flex flex-col lg:flex-row">
              <img className="w-full lg:w-1/3 h-40 object-cover rounded-lg" src="imagen_niños1.jpg" alt="Influencia en los niños" />
              <div className="lg:ml-4 mt-4 lg:mt-0">
                <h3 className="text-2xl font-semibold">La influencia de nuestros productos en los niños</h3>
                <p className="text-gray-500 mt-2">En esta pequeña publicación, te presentamos nuestro nuevo sabor hecho de aguaymanto...</p>
                <div className="text-sm text-gray-400 mt-4">
                  <p>04/09/2024</p>
                </div>
              </div>
            </article>

            <article className="bg-white p-4 rounded-lg shadow-lg flex flex-col lg:flex-row">
              <img className="w-full lg:w-1/3 h-40 object-cover rounded-lg" src="imagen_fabrica.jpg" alt="Fábrica de productos" />
              <div className="lg:ml-4 mt-4 lg:mt-0">
                <h3 className="text-2xl font-semibold">La influencia de nuestros productos en los niños</h3>
                <p className="text-gray-500 mt-2">En esta pequeña publicación, te presentamos nuestro nuevo sabor hecho de aguaymanto...</p>
                <div className="text-sm text-gray-400 mt-4">
                  <p>04/09/2024</p>
                </div>
              </div>
            </article>

            <article className="bg-white p-4 rounded-lg shadow-lg flex flex-col lg:flex-row">
              <img className="w-full lg:w-1/3 h-40 object-cover rounded-lg" src="imagen_frutas.jpg" alt="Frutas diversas" />
              <div className="lg:ml-4 mt-4 lg:mt-0">
                <h3 className="text-2xl font-semibold">La influencia de nuestros productos en los niños</h3>
                <p className="text-gray-500 mt-2">En esta pequeña publicación, te presentamos nuestro nuevo sabor hecho de aguaymanto...</p>
                <div className="text-sm text-gray-400 mt-4">
                  <p>04/09/2024</p>
                </div>
              </div>
            </article>

          </div>
        </div>

      </MaxWidthWrapper>
    </section>
  );
};

function renderPublication(pub: Publicacion) {
  return (
    <div key={pub.id} className="flex flex-row xl:flex-col overflow-hidden rounded bg-transparent">
      <Image
        src={pub.imagen}
        alt={pub.titulo}
        width={500}
        height={300}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="mb-2 text-xl font-semibold">{pub.titulo}</h3>
        <p className="mb-4 text-gray-700">{pub.descripcion}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{pub.autor}</span>
          <span>{new Date(pub.fecha).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default Publicaciones;
