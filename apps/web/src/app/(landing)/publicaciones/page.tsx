"use client";

import usePagination from "@web/hooks/usePagination";
import { Categoria, ControlledError, Response, VersionPublicacion } from "@web/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/components/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { useToast } from "@repo/ui/hooks/use-toast";
import SearchPub from "../_components/search-pub";
import MaxWidthWrapper from "./../_components/MaxWidthWrapper";

async function getCategories() {
  const response: Response<Categoria[]> = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/categoria`);

  if (response.data.status === "Error") throw new ControlledError(response.data.message);

  console.log("Categories data -> ", response.data.result);
  return response.data.result;
}

async function getPublications() {
  const response: Response<VersionPublicacion[]> = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/publicadas`
  );
  console.log("Publicacion data -> ", response.data.result);
  return response.data.result;
}

function PublicacionesPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [publicaciones, setPublicaciones] = useState<VersionPublicacion[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const {
    allFilteredItems,
    currentPageItems,
    entriesPerPage,
    indexOfFirstItemOfCurrentPage,
    indexOfLastItemOfCurrentPage,
    nextPage,
    page,
    prevPage,
    setEntriesPerPage,
    totalPages,
  } = usePagination<VersionPublicacion>({
    items: publicaciones,
    startingEntriesPerPage: 10,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const publicaciones = await getPublications();
        const categorias = await getCategories();

        setPublicaciones(publicaciones);
        setCategorias(categorias);
      } catch (error) {
        if (error instanceof ControlledError) {
          toast({
            title: "Error al cargar las publicaciones",
            description: error.message,
          });
        } else {
          console.log("Mira el error al cargar las publicaciones: ", error);
          toast({
            title: "Error al cargar las publicaciones",
            description: "Ocurrió un error inesperado. Intenta de nuevo.",
          });
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="py-12">
      <MaxWidthWrapper className="flex flex-col">
        <h1 className="font-['Abhaya_Libre'] text-4xl font-bold sm:text-5xl md:text-7xl">Publicaciones</h1>

        <div className="flex flex-row gap-4">
          <SearchPub searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Select>
            <SelectTrigger className="w-[180px]">
              {/* <SelectValue placeholder="Select a fruit" /> */}
              <p>Categorías</p>
            </SelectTrigger>
            <SelectContent>
              {categorias.map((categoria) => {
                return (
                  <SelectItem value={categoria.nombre.replace(" ", "-").toLowerCase()} key={categoria.id}>
                    {categoria.nombre}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        {/* Lista de Publicaciones */}

        <div className="mt-8 flex flex-col gap-3">
          {currentPageItems.map((publicacion) => {
            return <PublicationCard key={publicacion.id} publicacion={publicacion} />;
          })}
        </div>

        <div className="mt-5 flex w-full flex-row justify-between">
          {/* <p className="text-sm text-gray-500">
                Mostrando 1-10 de {filteredPublicaciones.length} publicaciones
              </p> */}
          <Pagination className="flex flex-row justify-end">
            <PaginationPrevious>
              <PaginationLink href="#">Anterior</PaginationLink>
            </PaginationPrevious>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationEllipsis />
              <PaginationItem>
                <PaginationLink href="#">10</PaginationLink>
              </PaginationItem>
            </PaginationContent>
            <PaginationNext>
              <PaginationLink href="#">Siguiente</PaginationLink>
            </PaginationNext>
          </Pagination>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default PublicacionesPage;

function PublicationCard({ publicacion }: { publicacion: VersionPublicacion }) {
  return (
    <Link
      key={publicacion.id}
      className="border-muted-foreground/30 flex flex-row gap-3 border-b py-4 pb-7"
      href={`/publicaciones/${publicacion.slug}`}
    >
      <Image
        src={publicacion.urlimagen || "/publicaciones/publicacion-placeholder.png"}
        height={100}
        width={100}
        alt="Publicación"
        className="h-[100px] w-[200px] rounded-lg border"
      />
      <section className="flex flex-col justify-center gap-1">
        <div className="flex flex-row items-center gap-1">
          {publicacion.categorias.map((categoria, idx) => {
            if (idx === publicacion.categorias.length - 1) {
              return (
                <span key={idx} className="rounded-full text-xs font-medium text-red-800">
                  {categoria.nombre}
                </span>
              );
            }

            return (
              <Fragment key={categoria.id}>
                <span className="rounded-full text-xs font-medium text-red-800">{categoria.nombre}</span>
                <p className="text-xs text-red-800">|</p>
              </Fragment>
            );
          })}
        </div>
        <div className="h-fit p-0">
          <h2 className="text-lg font-semibold mt-0">{publicacion.titulo}</h2>
          <div className="flex flex-row items-center gap-1">
            {publicacion.etiquetas.map((etiqueta) => {
              return (
                <span
                  key={etiqueta.id}
                  className="rounded-full px-2 py-1 text-[11px]"
                  style={{ backgroundColor: etiqueta.colorfondo, color: etiqueta.colortexto }}
                >
                  {etiqueta.nombre}
                </span>
              );
            })}
          </div>
        </div>
        <p className="text-xs text-gray-500 py-1">Fecha de publicacion: 24 de agosto de 2024</p>
      </section>
    </Link>
  );
}
