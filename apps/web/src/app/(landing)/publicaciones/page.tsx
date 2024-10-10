// src/app/(landing)/_components/PublicacionesPage.tsx
"use client";

import { publicaciones } from "@web/src/app/data/publicaciones";
import React, { useMemo, useState } from "react";
import { Button } from "@repo/ui/components/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/components/pagination";
import MaxWidthWrapper from "./../_components/MaxWidthWrapper";
import CardPublication from "./../_components/card-publication";
import CategoriasDropdown from "./../_components/categorias-dropdown";
import SearchPub from "./../_components/search-pub";

const PublicacionesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);

  // Obtener todas las categorías únicas
  const allCategorias = useMemo(() => {
    const categoriasSet = new Set<string>();
    publicaciones.forEach((pub) => pub.categorias.forEach((cat) => categoriasSet.add(cat)));
    return Array.from(categoriasSet);
  }, []);

  // Función para manejar la selección de categorías
  const toggleCategoria = (categoria: string) => {
    setSelectedCategorias((prev) =>
      prev.includes(categoria) ? prev.filter((c) => c !== categoria) : [...prev, categoria]
    );
  };

  // Filtrar publicaciones basado en búsqueda y filtros
  const filteredPublicaciones = useMemo(() => {
    return publicaciones.filter((pub) => {
      const matchesSearch =
        pub.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.etiquetas.some((et) => et.toLowerCase().includes(searchTerm.toLowerCase())); // Incluye etiquetas en la búsqueda

      const matchesCategorias =
        selectedCategorias.length === 0 || selectedCategorias.every((cat) => pub.categorias.includes(cat));

      return matchesSearch && matchesCategorias;
    });
  }, [searchTerm, selectedCategorias]);

  return (
    <section className="py-12">
      <MaxWidthWrapper className="flex flex-col gap-8">
        <div className="flex w-full flex-col gap-8 lg:flex-row">
          {/* Contenido Principal */}
          <div className="flex w-full flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl font-bold">Publicaciones</h1>
              {/* Barra de Búsqueda, Dropdown de Categorías y Botón de Buscar */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <SearchPub searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <CategoriasDropdown
                    categorias={allCategorias}
                    selectedCategorias={selectedCategorias}
                    toggleCategoria={toggleCategoria}
                  />
                  <Button
                    className="w-full text-lg sm:w-auto"
                    onClick={() => {
                      // Placeholder para futura integración de API
                      console.log("Buscar publicaciones");
                    }}
                  >
                    Buscar
                  </Button>
                </div>
              </div>
            </div>
            {/* Listado de Publicaciones */}
            <div className="mt-6 flex flex-col gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPublicaciones.length > 0 ? (
                filteredPublicaciones.map((pub) => <CardPublication key={pub.id} publication={pub} />)
              ) : (
                <p className="col-span-full text-center text-gray-500">No se encontraron publicaciones.</p>
              )}
            </div>
            {/* Paginación */}
            <div className="flex w-full flex-row justify-between">
              <p className="text-sm text-gray-500">
                Mostrando 1-10 de {filteredPublicaciones.length} publicaciones
              </p>
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
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default PublicacionesPage;
