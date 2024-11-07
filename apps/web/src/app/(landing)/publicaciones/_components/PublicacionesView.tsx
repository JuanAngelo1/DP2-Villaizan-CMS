"use client";

import { Categoria, VersionPublicacion } from "@web/types";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";
import { Separator } from "@repo/ui/components/separator";
import { cn } from "@repo/ui/lib/utils";
import SearchPub from "../../_components/search-pub";

function PublicacionesView({
  publicaciones,
  categorias,
}: {
  publicaciones: VersionPublicacion[];
  categorias: Categoria[];
}) {
  const params = useSearchParams();
  const p_categoria = params.get("categoria");

  console.log(p_categoria);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="mt-2 font-['Abhaya_Libre']">
      <div className="flex flex-row gap-8">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">Navega por categorias</h2>
          <Separator orientation="horizontal" className="my-2" />
          <ul>
            {categorias.map((categoria) => {
              return (
                <li key={categoria.id}>
                  <Link
                    href={`/publicaciones?categoria=${categoria.nombre}`}
                    className={cn(
                      "text-lg hover:underline",

                      p_categoria !== null
                        ? categoria.nombre === p_categoria
                          ? "font-bold text-red-800"
                          : "text-gray-500"
                        : "text-black"
                    )}
                  >
                    {categoria.nombre}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <SearchPub searchTerm={searchTerm} setSearchTerm={(term) => setSearchTerm(term)} />
          {publicaciones
            .filter(
              (publicacion) =>
                publicacion.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (publicacion.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  publicacion.categorias.some((_categoria) => _categoria.nombre === p_categoria))
            )
            .map((publicacion) => {
              return <PublicationCard key={publicacion.id} publicacion={publicacion} />;
            })}
        </div>
      </div>
    </div>
  );
}

function PublicationCard({ publicacion }: { publicacion: VersionPublicacion }) {
  return (
    <Link
      key={publicacion.id}
      className="border-muted-foreground/30 group/card flex flex-row gap-3 border-b py-4 pb-7"
      href={`/publicaciones/${publicacion.slug}`}
    >
      <div className="h-[100px] w-[200px] overflow-hidden rounded-lg border">
        <Image
          src={publicacion.urlimagen || "/publicaciones/publicacion-placeholder.png"}
          height={100}
          width={100}
          alt="Publicación"
          className="h-full w-full rounded-lg transition-all group-hover/card:scale-110"
        />
      </div>
      <section className="flex flex-col justify-center gap-1">
        <div className="flex flex-row items-center gap-1">
          {publicacion.categorias.map((categoria, idx) => {
            if (idx === publicacion.categorias.length - 1) {
              return (
                <span key={idx} className="rounded-full text-base font-medium text-red-800">
                  {categoria.nombre}
                </span>
              );
            }

            return (
              <Fragment key={categoria.id}>
                <span className="rounded-full text-base font-medium text-red-800">{categoria.nombre}</span>
                <p className="text-xs text-red-800">|</p>
              </Fragment>
            );
          })}
        </div>
        <div className="h-fit p-0">
          <h2 className="mt-0 text-2xl font-semibold group-hover/card:underline">{publicacion.titulo}</h2>
          <div className="flex flex-row items-center gap-1">
            {publicacion.etiquetas.map((etiqueta) => {
              return (
                <span
                  key={etiqueta.id}
                  className="rounded-full px-3 py-[1.5px] text-base"
                  style={{ backgroundColor: etiqueta.colorfondo, color: etiqueta.colortexto }}
                >
                  {etiqueta.nombre}
                </span>
              );
            })}
          </div>
        </div>
        <p className="py-1 text-base text-gray-500">Fecha de publicacion: 24 de agosto de 2024</p>
      </section>
    </Link>
  );
}

export default PublicacionesView;
