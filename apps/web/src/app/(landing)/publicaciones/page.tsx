"use client";

import { publicaciones } from "@web/src/app/data/publicaciones";
import React, { useMemo, useState } from "react";
import { Button } from "@repo/ui/components/button";
import MaxWidthWrapper from "./../_components/MaxWidthWrapper";
import CardPublication from "./../_components/card-publication";
import Filters from "./../_components/filters";
import SearchPub from "./../_components/search-pub";

const PublicacionesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);
  const [selectedEtiquetas, setSelectedEtiquetas] = useState<string[]>([]);

  // Obtener todas las categorías y etiquetas únicas
  const allCategorias = useMemo(() => {
    const categoriasSet = new Set<string>();
    publicaciones.forEach((pub) => pub.categorias.forEach((cat) => categoriasSet.add(cat)));
    return Array.from(categoriasSet);
  }, []);

  const allEtiquetas = useMemo(() => {
    const etiquetasSet = new Set<string>();
    publicaciones.forEach((pub) => pub.etiquetas.forEach((et) => etiquetasSet.add(et)));
    return Array.from(etiquetasSet);
  }, []);

  // Funciones para manejar la selección de filtros
  const toggleCategoria = (categoria: string) => {
    setSelectedCategorias((prev) =>
      prev.includes(categoria) ? prev.filter((c) => c !== categoria) : [...prev, categoria]
    );
  };

  const toggleEtiqueta = (etiqueta: string) => {
    setSelectedEtiquetas((prev) =>
      prev.includes(etiqueta) ? prev.filter((e) => e !== etiqueta) : [...prev, etiqueta]
    );
  };

  // Filtrar publicaciones basado en búsqueda y filtros
  const filteredPublicaciones = useMemo(() => {
    return publicaciones.filter((pub) => {
      const matchesSearch =
        pub.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.slug.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategorias =
        selectedCategorias.length === 0 || selectedCategorias.every((cat) => pub.categorias.includes(cat));

      const matchesEtiquetas =
        selectedEtiquetas.length === 0 || selectedEtiquetas.every((et) => pub.etiquetas.includes(et));

      return matchesSearch && matchesCategorias && matchesEtiquetas;
    });
  }, [searchTerm, selectedCategorias, selectedEtiquetas]);

  return (
    <section className="bg-gray-100 py-12">
      <MaxWidthWrapper className="flex flex-col gap-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filtros */}
          <aside className="w-full lg:w-1/4">
            <Filters
              categorias={allCategorias}
              etiquetas={allEtiquetas}
              selectedCategorias={selectedCategorias}
              selectedEtiquetas={selectedEtiquetas}
              toggleCategoria={toggleCategoria}
              toggleEtiqueta={toggleEtiqueta}
            />
          </aside>

          {/* Contenido Principal */}
          <div className="flex w-full flex-col gap-8 lg:w-3/4">
            <div className="flex flex-col gap-4">
              <h1 className="Publicaciones text-5xl font-bold">Publicaciones</h1>
              {/* Barra de Búsqueda */}
              <SearchPub searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            {/* Listado de Publicaciones */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredPublicaciones.length > 0 ? (
                filteredPublicaciones.map((pub) => <CardPublication key={pub.id} publication={pub} />)
              ) : (
                <p className="col-span-full text-center text-gray-500">No se encontraron publicaciones.</p>
              )}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default PublicacionesPage;
