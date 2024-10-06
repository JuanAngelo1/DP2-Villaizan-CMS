"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "@repo/ui/components/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { cn } from "@repo/ui/lib/utils";

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <header className="z-100 absolute left-0 top-0 w-full border-b-2 border-b-rose-800 bg-red-600 shadow-xl">
      <MaxWidthWrapper>
        <div className="flex items-center py-4">
          <div className="flex-1">
            <Link id="logo" href="/">
              <Image src="/VIllaizanLogoV.png" alt="Logo" width={36} height={36} />
            </Link>
          </div>
    
          <nav className="flex-1 flex space-x-6">
            <Button variant={"link"} className="text-xl text-white">
              <Link href="#sabores">Sabores</Link>
            </Button>
            <Button variant={"link"} className="text-xl text-white">
              <Link href="#nosotros">Nosotros</Link>
            </Button>
            <Button variant={"link"} className="text-xl text-white">
              <Link href="#publicaciones">Publicaciones</Link>
            </Button>
          </nav>
  
          <div className="flex-1 flex justify-end">
            {status === "loading" ? (
              <Button isLoading loaderClassname="w-6 h-6"></Button>
            ) : session ? (
              <Button className="text-xl text-white">
                Cerrar sesión
              </Button>
            ) : (
              <Button className="text-xl text-white">
                <Link href="/login">Iniciar sesión</Link>
              </Button>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Header;
