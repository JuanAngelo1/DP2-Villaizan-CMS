import Link from "next/link";
import React from "react";
import { Separator } from "@repo/ui/components/separator";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-600 px-4 py-8 font-['Abhaya_Libre'] text-white">
      <MaxWidthWrapper className="flex flex-col gap-4">
        <div className="flex flex-row">
          <div className="grid grid-cols-1 gap-8 font-['Abhaya_Libre'] md:grid-cols-3">
            {/* Información de la Empresa */}
            <div>
              <h2 className="mb-4 text-2xl font-semibold">Heladería Villaizan</h2>
              <p className="text-gray-200">
                Disfruta de los mejores helados artesanales con una variedad de sabores únicos. ¡Endulza tu
                día con nosotros!
              </p>
            </div>
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
