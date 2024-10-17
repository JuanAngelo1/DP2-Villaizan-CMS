import Link from "next/link";
import React from "react";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";
import { Separator } from "@repo/ui/components/separator";

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-600 px-4 py-8 text-white font-['Abhaya_Libre']">
      <MaxWidthWrapper className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 font-['Abhaya_Libre']">
          {/* Información de la Empresa */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Heladería Villaizan</h2>
            <p className="text-gray-200">
              Disfruta de los mejores helados artesanales con una variedad de sabores únicos. ¡Endulza tu día
              con nosotros!
            </p>
          </div>
        </div>
        <Separator />
          <p className="text-center text-sm text-gray-300">
            &copy; {new Date().getFullYear()} Heladería Villaizan. Todos los derechos reservados.
          </p>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
