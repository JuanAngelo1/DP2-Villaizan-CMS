import Link from "next/link";
import React from "react";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-600 p-24 py-8 text-white">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Información de la Empresa */}
          <div>
            <h4 className="mb-4 text-xl font-semibold">Heladería Villaizan</h4>
            <p className="text-gray-200">
              Disfruta de los mejores helados artesanales con una variedad de sabores únicos. ¡Endulza tu día
              con nosotros!
            </p>
          </div>
        </div>

        {/* Línea Divisoria */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-center text-sm text-gray-300">
            &copy; {new Date().getFullYear()} Heladería Villaizan. Todos los derechos reservados.
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
