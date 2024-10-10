// src/app/(landing)/_components/CategoriasDropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@repo/ui/lib/utils";

interface CategoriasDropdownProps {
  categorias: string[];
  selectedCategorias: string[];
  toggleCategoria: (categoria: string) => void;
}

const CategoriasDropdown: React.FC<CategoriasDropdownProps> = ({
  categorias,
  selectedCategorias,
  toggleCategoria,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Manejar clics fuera del dropdown para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Categorías
        <svg
          className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.584l3.71-3.354a.75.75 0 111.14.976l-4.25 3.85a.75.75 0 01-1.14 0l-4.25-3.85a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            {categorias.map((categoria) => (
              <label
                key={categoria}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategorias.includes(categoria)}
                  onChange={() => toggleCategoria(categoria)}
                  className="mr-2 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                {categoria}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriasDropdown;