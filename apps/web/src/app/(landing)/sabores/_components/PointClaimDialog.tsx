"use client";

import { Response } from "@web/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";

function PointClaimDialog({
  villaparada,
  id_fruta,
  user,
}: {
  villaparada: string | null;
  id_fruta: string | null;
  user: User | undefined;
}) {
  const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(new Error("No se pudo obtener la ubicación actual."));
          }
        );
      } else {
        reject(new Error("La geolocalización no es compatible con este navegador."));
      }
    });
  };

  const router = useRouter();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    async function getLocation() {
      if (villaparada && id_fruta) {
        const current_url = window.location.href;
        if (!user) router.push(`/login/callbackUrl=${current_url}`);

        try {
          setIsLoadingLocation(true);
          const { longitude, latitude } = await getCurrentLocation();
          setIsLoadingLocation(false);
          setLocation({ latitude, longitude });
        } catch (error: any) {
          console.log(error);
          setError(error.message);
        }
      }
    }

    getLocation();
  }, [villaparada, id_fruta]);

  async function claimPoints() {
    if (!user || !location || !villaparada || !id_fruta) return;
    try {
      const response: Response<any> = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/villaparada/sumarpuntos`,
        {
          id_usuario: user?.db_info.id,
          id_villaparada: villaparada,
          puntos: 20,
          latitud: location.latitude,
          longitud: location.longitude,
        }
      );

      console.log(response)
    } catch (error) {
      console.log(error);
      setError("Error al reclamar los puntos. Intenta de nuevo luego.");
    }
  }

  const [isOpen, setIsOpen] = useState(villaparada && id_fruta ? true : false);
  const [isClaiming, setIsClaiming] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        {error !== null ? (
          <DialogTitle className="text-start text-red-800">{error}</DialogTitle>
        ) : isLoadingLocation ? (
          <DialogTitle className="flex flex-row items-center gap-2 text-start text-red-800">
            <Loader2 className="h-5 w-5 animate-spin" />
            <p>Cargando ubicación</p>
          </DialogTitle>
        ) : (
          <div className="flex flex-col">
            <DialogTitle className="text-start text-red-800">Reclamar Villaparada </DialogTitle>

            <div>
              <p className="mt-1 text-start">Usted está por reclamar la Villaparada X por 20 puntos</p>
            </div>
            <Button size={"lg"} className="mt-5 bg-red-800 hover:bg-red-900" disabled={isClaiming} isLoading={isClaiming} onClick={claimPoints}>
              Reclamar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
export default PointClaimDialog;
