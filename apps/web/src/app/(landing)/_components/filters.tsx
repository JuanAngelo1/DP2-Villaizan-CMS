// app/(landing)/_components/Filters.tsx

"use client";

import React from "react";
import { Checkbox } from "@repo/ui/components/checkbox";

interface FiltersProps {
  categorias: string[];
  etiquetas: string[];
  selectedCategorias: string[];
  selectedEtiquetas: string[];
  toggleCategoria: (categoria: string) => void;
  toggleEtiqueta: (etiqueta: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  categorias,
  etiquetas,
  selectedCategorias,
  selectedEtiquetas,
  toggleCategoria,
  toggleEtiqueta,
}) => {
  return (
    <div className="space-y-6">
      {/* Categorías */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Categorías</h3>
        <ul className="space-y-1">
          {categorias.map((categoria) => (
            <li key={categoria} className="flex items-center">
              <Checkbox
                id={`categoria-${categoria}`}
                checked={selectedCategorias.includes(categoria)}
                onCheckedChange={() => toggleCategoria(categoria)}
              />
              <label htmlFor={`categoria-${categoria}`} className="ml-2 text-sm">
                {categoria}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Etiquetas */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Etiquetas</h3>
        <ul className="space-y-1">
          {etiquetas.map((etiqueta) => (
            <li key={etiqueta} className="flex items-center">
              <Checkbox
                id={`etiqueta-${etiqueta}`}
                checked={selectedEtiquetas.includes(etiqueta)}
                onCheckedChange={() => toggleEtiqueta(etiqueta)}
              />
              <label htmlFor={`etiqueta-${etiqueta}`} className="ml-2 text-sm">
                {etiqueta}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filters;