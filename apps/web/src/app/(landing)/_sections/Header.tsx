"use client";

import { Button, buttonVariants } from "@repo/ui/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { cn } from "@repo/ui/lib/utils";
import { Usuario } from "@web/types";
import { KeySquare, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { handleSignOut } from "../../../../actions/authActions";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

function Header({ user }: { user: Required<Usuario | null> }): JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed z-50 h-[68px] w-full border-b-2 border-b-rose-800 bg-red-800 font-['Abhaya_Libre'] text-white shadow-xl">
      <MaxWidthWrapper className="flex h-full items-center justify-between">
        <div className="absolute bottom-0 left-1/2 top-0 mr-4 flex flex-1 -translate-x-1/2 items-center justify-end md:mr-0 md:justify-center">
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

        <nav className="z-[51] hidden items-center justify-center space-x-8 text-lg font-bold md:flex">
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

        <div className="z-[51] hidden items-center space-x-2 md:flex">
          {user ? (
            <Popover>
              <PopoverTrigger>
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-col">
                    <p className="text-end text-lg leading-5">{`${user.nombre} ${user.apellido}`}</p>
                    <p className="leading-3">{`${user.puntosacumulados} puntos disponibles`}</p>
                  </div>
                  <Image
                    width={20}
                    height={20}
                    src={user.imagenperfil || "/default-profile.png"}
                    className="h-full w-fit rounded-full border"
                    alt="PFP"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="flex w-fit min-w-0 max-w-[200px] flex-col gap-1 overflow-hidden p-1"
                side="bottom"
                align="end"
              >
                <p className="w-fit max-w-full truncate px-2 py-1 text-sm font-bold">
                  {user.nombre + " " + user.apellido}
                </p>
                {user.vi_rol?.nombre === "Administrador" && (
                  <Link
                    className={cn(buttonVariants({ variant: "ghost" }), "flex flex-row justify-start gap-2")}
                    href="/admin"
                  >
                    <KeySquare className="h-4 w-4 shrink-0" />
                    <p className="">Admin</p>
                  </Link>
                )}
                <Button
                  variant={"ghost"}
                  className="flex flex-row justify-start gap-2"
                  onClick={() => handleSignOut()}
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  <p className="w-fit">Cerrar sesión</p>
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "link" }), "text-lg font-bold text-white")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Iniciar sesión
            </Link>
          )}
        </div>

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

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-start space-y-8 bg-red-600 px-4 py-4">
            {user && (
              <div className="flex h-[60px] flex-row items-center gap-3 text-white">
                <Image
                  alt="PFP"
                  height={10}
                  width={10}
                  src={user.imagenperfil || "/default-profile.png"}
                  className="h-full w-auto rounded-full border border-white object-cover"
                />
                <section className="flex flex-col">
                  <p className="text-xl font-bold leading-5">{user.nombre + user.apellido}</p>
                  <p>{user.vi_rol.nombre}</p>
                </section>
              </div>
            )}
            <Link
              href="#sabores"
              className="w-full text-lg text-white hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sabores
            </Link>
            <Link
              href="#nosotros"
              className="w-full text-lg text-white hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              href="#publicaciones"
              className="w-full text-lg text-white hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Publicaciones
            </Link>

            {user?.vi_rol?.nombre === "Administrador" && (
              <Link
                className="w-full text-lg text-white hover:underline"
                href={"/admin"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pagina de administrador
              </Link>
            )}

            {user ? (
              <p
                className="w-full cursor-pointer text-lg text-white hover:underline"
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
              >
                Cerrar sesión
              </p>
            ) : (
              <Link
                href="/login"
                className="w-full text-lg text-white hover:underline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Iniciar sesión
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
