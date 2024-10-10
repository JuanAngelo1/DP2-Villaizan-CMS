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
    <header className="fixed z-50 w-full border-b-2 border-b-rose-800 bg-red-600 shadow-xl">
      <MaxWidthWrapper className="flex h-20 items-center justify-between">
        {/* Logo */}
        <Link id="logo" href="/">
          <Image src="/VIllaizanLogoV.png" alt="Logo" width={36} height={36} />
        </Link>

        {/* Menú de navegación (oculto en móviles) */}
        <nav className="hidden flex-1 items-center justify-center space-x-6 md:flex">
          <Link href="#sabores" className="text-xl text-white hover:underline">
            Sabores
          </Link>
          <Link href="#nosotros" className="text-xl text-white hover:underline">
            Nosotros
          </Link>
          <Link href="#publicaciones" className="text-xl text-white hover:underline">
            Publicaciones
          </Link>
        </nav>

        {/* Acciones de usuario (oculto en móviles) */}
        <div className="hidden items-center space-x-2 md:flex">
          {status === "loading" ? (
            <Button isLoading loaderClassname="w-6 h-6"></Button>
          ) : session ? (
            <Button className="text-xl text-white" onClick={() => handleSignOut()} variant="link">
              Cerrar sesión
            </Button>
          ) : (
            <Button className="text-xl text-white">
              <Link
                href="/login"
                className="text-xl text-white hover:underline"
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
        </div>

        {/* Botón de menú móvil */}
        <div className="flex items-center md:hidden">
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
          <nav className="flex flex-col items-center space-y-4 bg-red-600 py-4">
            <Link
              href="#sabores"
              className="text-xl text-white hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sabores
            </Link>
            <Link
              href="#nosotros"
              className="text-xl text-white hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              href="#publicaciones"
              className="text-xl text-white hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Publicaciones
            </Link>
            {status === "loading" ? (
              <Button isLoading loaderClassname="w-6 h-6" variant="ghost"></Button>
            ) : session ? (
              <Button
                className="text-xl text-white"
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
              >
                Cerrar sesión
              </Button>
            ) : (
              <Button className="text-xl text-white">
                <Link
                  href="/login"
                  className="text-xl text-white hover:underline"
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
