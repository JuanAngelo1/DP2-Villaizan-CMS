import { Response } from "@web/types";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Separator } from "@repo/ui/components/separator";
import ErrorMessage from "../../_components/ErrorMessage";
import InputWithLabel from "../../_components/InputWithLabel";
import LogoBackHome from "../../_components/LogoBackHome";
import SuccessMessage from "../../_components/SuccessMessage";

function RequestView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [email, setEmail] = useState<string>("");

  const handleSendEmail = async () => {
    try {
      setIsLoading(true);

      const response: Response<any> = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/solicitarCambiarContrasena`,
        {
          email: email,
        }
      );

      console.log(response);
      if (response.data.status === "Error") throw new Error(response.data.message);

      setSuccess(response.data.message);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <LogoBackHome />
      <p className="text-muted-foreground mt-3 text-sm">
        Ingresa el correo relacionado para recuperar la contraseña
      </p>
      <Separator orientation="horizontal" className="mt-7 w-[460px]" />
      <div className="mt-5 flex w-[400px] flex-col gap-3">
        {success && <SuccessMessage message={success} />}

        {success === null && (
          <>
            <InputWithLabel
              label="Correo electrónico"
              type="email"
              placeholder="Ej. alb_marq@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && <ErrorMessage message={error} />}

            <Button isLoading={isLoading} disabled={isLoading || email === ""} onClick={handleSendEmail}>
              Confirmar
            </Button>
            <section className="flex flex-row items-center justify-center">
              <Link className={buttonVariants({ variant: "link" })} href={"/login"}>
                ¿Ya tienes una cuenta?
              </Link>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
export default RequestView;
