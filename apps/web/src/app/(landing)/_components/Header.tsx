"use server";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@repo/ui/components/button";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Header: React.FC = () => {
  return (
    <header className="z-100 absolute left-0 top-0 w-full border-b-2 border-b-rose-800 bg-red-600 shadow-xl">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div>
            <Link id="logo" href="/">
              <Image src="/VIllaizanLogoV.png" alt="Logo" width={36} height={36} />
            </Link>
          </div>
          {/* Navegación */}
          <nav className="flex space-x-6">
            <Button asChild variant={"link"} className="text-xl text-white">
              <Link href="#sabores">Sabores</Link>
            </Button>
            <Button asChild variant={"link"} className="text-xl text-white">
              <Link href="#nosotros">Nosotros</Link>
            </Button>
            <Button asChild variant={"link"} className="text-xl text-white">
              <Link href="#publicaciones">Publicaciones</Link>
            </Button>
          </nav>
          {/* Botón de Iniciar Sesión */}
          <div>
            <Button className="text-lg">Iniciar sesión</Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Header;
