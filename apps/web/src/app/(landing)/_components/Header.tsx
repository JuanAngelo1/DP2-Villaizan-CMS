"use client";

import { GlobeLock } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { handleSignOut } from "../../actions/authActions";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <header className="fixed z-[300] w-full border-b-2 border-b-rose-800 bg-red-600 shadow-xl">
      <MaxWidthWrapper>
        <div className="flex items-center py-4">
          <div className="flex-1">
            <Link id="logo" href="/">
              <Image src="/VIllaizanLogoV.png" alt="Logo" width={36} height={36} />
            </Link>
          </div>

          <nav className="flex flex-1 space-x-6">
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

          <div className="flex flex-1 justify-end gap-1">
            {status === "loading" ? (
              <Button isLoading loaderClassname="w-6 h-6"></Button>
            ) : session ? (
              <Button className="text-xl text-white" onClick={() => handleSignOut()}>
                Cerrar sesión
              </Button>
            ) : (
              <Button className="text-xl text-white">
                <Link href="/login">Iniciar sesión</Link>
              </Button>
            )}
            <Link className={cn(buttonVariants(), "h-9 w-9")} href={'/admin'}>
              <GlobeLock className="h-5 w-5 shrink-0" />
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Header;
