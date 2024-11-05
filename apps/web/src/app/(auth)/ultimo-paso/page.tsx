"use client";

import { handleSignOut } from "@web/actions/authActions";
import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Separator } from "@repo/ui/components/separator";
import ErrorMessage from "../_components/ErrorMessage";
import InputWithLabel from "../_components/InputWithLabel";
import LogoBackHome from "../_components/LogoBackHome";
import SuccessMessage from "../_components/SuccessMessage";

function LastStepPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [edad, setEdad] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <LogoBackHome />
      <p className="text-muted-foreground mt-3 text-sm">Ya casi terminamos, completa estos ultimos pasos</p>
      <Separator orientation="horizontal" className="mt-7 w-[460px]" />
      <div className="mt-5 flex w-[400px] flex-col gap-3">
        {success && <SuccessMessage message={success} />}

        {success === null && (
          <>
            <InputWithLabel
              label="Edad"
              type="number"
              placeholder="Ingresa tu edad"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
            />

            <InputWithLabel
              label="Sexo"
              type="text"
              placeholder="Ingresa tu sexo"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
            />

            {error && <ErrorMessage message={error} />}

            <Button isLoading={isLoading} disabled={isLoading || edad === "" || sexo === ""}>
              Confirmar
            </Button>
            <section className="flex flex-row items-center justify-center">
              <Button variant={"link"} onClick={handleSignOut}>
                Cerrar sesión
              </Button>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
export default LastStepPage;
