"use client";

import React, { useState, useCallback } from "react";
import { QrReader } from "react-qr-reader";
import { AlertTriangle, Camera, Check, Loader2, RefreshCw } from "lucide-react";

const QRScanner: React.FC = ({id_fruta, villaparada}) => {
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "processing" | "success" | "error">("idle");
  const [scanCount, setScanCount] = useState(0);

  const handleScan = useCallback((data: string | null) => {
    if (data) {
      setStatus("processing");
      setScanCount(prev => prev + 1);

      try {
        const scannedUrl = new URL(data);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude.toString();
              const lng = position.coords.longitude.toString();

              if (villaparada && lat && lng) {
                setStatus("success");
                // Pequeño retraso para mostrar el estado de éxito
                setTimeout(() => {
                  window.location.href = `/sabores?villaparada=${villaparada}&id_fruta=${id_fruta}`;
                }, 500);
              } else {
                setError("El QR o los datos de ubicación no contienen la información necesaria.");
                setStatus("error");
              }
            },
            () => {
              setError("No se pudo obtener la ubicación actual.");
              setStatus("error");
            }
          );
        } else {
          setError("La geolocalización no es compatible con este navegador.");
          setStatus("error");
        }
      } catch (err) {
        setError("Formato del QR inválido.");
        setStatus("error");
      }
    }
  }, []);

  const renderStatusMessage = () => {
    switch (status) {
      case "idle":
        return (
          <div className="text-center text-gray-600 flex items-center justify-center gap-2">
            <Camera className="w-5 h-5" />
            Enfoca el código QR para escanear
          </div>
        );
      case "scanning":
        return (
          <div className="text-center text-blue-600 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Escaneando...
          </div>
        );
      case "processing":
        return (
          <div className="text-center text-yellow-600 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Procesando información...
          </div>
        );
      case "success":
        return (
          <div className="text-center text-green-600 flex items-center justify-center gap-2">
            <Check className="w-5 h-5" />
            ¡Código QR válido!
          </div>
        );
      case "error":
        return (
          <div className="text-center text-red-600 flex items-center justify-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {error || "Error al escanear"}
          </div>
        );
    }
  };

  const resetScanner = () => {
    setError(null);
    setStatus("idle");
  };

  return (
    <div className="flex flex-col items-center p-2 space-y-4 w-full">
      <h3 className="text-2xl font-bold mb-2">Escanea el Código QR</h3>      
      <div className="w-full max-w-md relative mb-4">
        <QrReader
          onResult={(result, error) => {
            setStatus("scanning");
            if (result) handleScan(result.getText());
            if (error) {
              console.error(error);
              setStatus("idle");
            }
          }}
          constraints={{ facingMode: "environment" }}
          style={{ width: "100%" }}
        />
        {status === "error" && (
          <button 
            onClick={resetScanner} 
            className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="h-auto min-h-[40px] w-full text-center">
        {renderStatusMessage()}
      </div>

      {scanCount > 0 && (
        <div className="text-sm text-gray-500 w-full text-center">
          Escaneos realizados: {scanCount}
        </div>
      )}
    </div>
  );
};

export default QRScanner;