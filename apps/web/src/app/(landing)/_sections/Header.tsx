"use client";

import { GlobeLock } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { handleSignOut } from "../../actions/authActions";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed z-50 h-[68px] w-full border-b-2 border-b-rose-800 bg-[#D6CDA8] font-['Abhaya_Libre'] shadow-xl">
      <MaxWidthWrapper className="flex h-full items-center justify-between">
        {/* Logo */}
        <div className="absolute bottom-0 left-0 right-0 top-0 mr-4 flex flex-1 items-center justify-end md:mr-0 md:justify-center">
          <Link id="logo" href="/" className="md:translate-y-5">
            <Image
              src="/VillaizanLogoV.png"
              alt="Logo"
              width={80}
              height={80}
              className="h-[48px] w-[48px] rounded-full border-2 border-red-800 md:h-[80px] md:w-[80px]"
            />
          </Link>
        </div>

        {/* Menú de navegación (oculto en móviles) */}
        <nav className="z-[51] hidden items-center justify-center space-x-8 font-bold md:flex text-lg">
          <Link href="#sabores" className="hover:underline">
            Sabores
          </Link>
          <Link href="#nosotros" className="hover:underline">
            Nosotros
          </Link>
          <Link href="#publicaciones" className="hover:underline">
            Publicaciones
          </Link>
        </nav>

        {/* Acciones de usuario (oculto en móviles) */}
        <div className="z-[51] hidden items-center space-x-2 md:flex">
          {status === "loading" ? (
            <Button isLoading loaderClassname="w-6 h-6"></Button>
          ) : session ? (
            <Button className="text-lg font-bold" onClick={() => handleSignOut()} variant="link">
              Cerrar sesión
            </Button>
          ) : (
            <Link
              href="/login"
              className={cn(buttonVariants({variant: 'link'}), "text-lg font-bold")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Iniciar sesión
            </Link>
          )}
          <Link
            className={cn(buttonVariants({variant: 'ghost'}), "h-9 w-9 hover:bg-[#c9bf9e]")}
            href={"/admin"}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <GlobeLock className="h-5 w-5 shrink-0" />
          </Link>
        </div>

        {/* Botón de menú móvil */}
        <div className="z-[51] flex items-center md:hidden">
          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </Button>
        </div>
      </MaxWidthWrapper>

      {/* Menú móvil desplegable */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-8 bg-red-600 py-4">
            <Link
              href="#sabores"
              className="text-lg text-white hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sabores
            </Link>
            <Link
              href="#nosotros"
              className="text-lg text-white hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              href="#publicaciones"
              className="text-lg text-white hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Publicaciones
            </Link>
            {status === "loading" ? (
              <Button isLoading loaderClassname="w-6 h-6" variant="ghost"></Button>
            ) : session ? (
              <Button
                className="text-lg text-white"
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
              >
                Cerrar sesión
              </Button>
            ) : (
              <Button className="text-lg text-white">
                <Link
                  href="/login"
                  className="text-lg text-white hover:underline"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
              </Button>
            )}
            <Link
              className={cn(buttonVariants(), "h-9 w-9")}
              href={"/admin"}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <GlobeLock className="h-5 w-5 shrink-0" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
