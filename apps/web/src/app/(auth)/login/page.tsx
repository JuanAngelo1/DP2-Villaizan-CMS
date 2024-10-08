"use client";

import { handleCredentialsSignIn } from "@web/src/app/actions/authActions";
import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Separator } from "@repo/ui/components/separator";
import LogoBackHome from "../_components/LogoBackHome";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const result = await handleCredentialsSignIn({ email, password });
    } catch (error) {
      console.log("An unexpected error ocurred. Please try again.");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <LogoBackHome/>
      <p className="text-muted-foreground mt-3 text-sm">
        Ingresa tus credenciales para acceder en el sistema
      </p>
      <Separator orientation="horizontal" className="mt-7 w-[460px]" />
      <div className="mt-7 flex w-[400px] flex-col gap-2">
        <Input placeholder="Correo electrónico" onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          onClick={() => onLogin({ email: email, password: password })}
        >
          Ingresar
        </Button>
        <section className="flex flex-row items-center justify-between">
          <Link className={buttonVariants({ variant: "link" })} href={"/crear-cuenta"}>
            Crea una cuenta
          </Link>
          <Link className={buttonVariants({ variant: "link" })} href={"/recuperar-contrasena"}>
            Recuperar contraseña
          </Link>
        </section>
      </div>
    </div>
  );
}
export default LoginPage;
