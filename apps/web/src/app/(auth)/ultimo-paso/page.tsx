"use client";

import { handleSignOut } from "@web/actions/authActions";
import { ControlledError, Response, Usuario } from "@web/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Separator } from "@repo/ui/components/separator";
import { cn } from "@repo/ui/lib/utils";
import ErrorMessage from "../_components/ErrorMessage";
import InputWithLabel from "../_components/InputWithLabel";
import LogoBackHome from "../_components/LogoBackHome";
import SuccessMessage from "../_components/SuccessMessage";

function LastStepPage() {
  const { data: session, status, update } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [edad, setEdad] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");

  const handleUpdateUsuario = async () => {
    setIsLoading(true);

    if (!session) {
      setError("No se encontro tu sesión.");
      setIsLoading(false);
      return;
    }

    if (edad === "" || sexo === "") {
      setError("Complete los campos.");
      setIsLoading(false);
      return;
    }

    try {
      setError(null);

      const response: Response<Usuario> = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/usuario/actualizarPersona/${session?.user.db_info.id}`,
        {
          sexo: sexo,
          edad: parseInt(edad),
        }
      );

      if (response.data.status !== "Success") throw new ControlledError(response.data.message);

      setSuccess(response.data.message);
      setIsLoading(false);

      const new_session: Session = {
        expires: session.expires,
        user: {
          ...session.user,
          db_info: response.data.result,
        },
      };

      update();
      window.location.reload();
    } catch (error) {
      if (error instanceof ControlledError) {
        setError(error.message);
      } else {
        setError("Ups! Algo salió mal.");
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {status === "authenticated" && session ? (
        <>
          <LogoBackHome />
          <p className="text-muted-foreground mt-3 text-sm">
            Ya casi terminamos, completa estos ultimos pasos
          </p>
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

                <div className="flex flex-col gap-0">
                  <Label>Sexo</Label>
                  <Select onValueChange={(value) => setSexo(value.replace("-", ""))}>
                    <SelectTrigger className={cn(sexo === "" && "text-muted-foreground")}>
                      <SelectValue placeholder="Selecciona tu sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Masculino">Masculino</SelectItem>
                        <SelectItem value="Femenino">Femenino</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                        <SelectItem value="Prefiero-no-decirlo">Prefiero no decirlo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {error && <ErrorMessage message={error} />}

                <Button
                  isLoading={isLoading}
                  disabled={isLoading || edad === "" || sexo === ""}
                  onClick={handleUpdateUsuario}
                >
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
        </>
      ) : (
        <Loader2 className="h-5 w-5 animate-spin" />
      )}
    </div>
  );
}
export default LastStepPage;
