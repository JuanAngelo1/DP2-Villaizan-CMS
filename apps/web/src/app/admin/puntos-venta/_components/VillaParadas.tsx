// src/app/admin/puntos-venta/page.tsx
"use client";

import { PuntoVenta, Response } from "@web/types";
import axios from "axios";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import PuntoVentaModal from "./PuntoVentaModal";
import PuntoVillaParadaForm from "./PuntoVillaParadaForm";
import PuntoVillaParadaList from "./PuntoVillaParadaList";
import QRCodeGenerator from "./QRCodeGenerator";

// src/app/admin/puntos-venta/page.tsx

// src/app/admin/puntos-venta/page.tsx

const PuntoVentaMap = dynamic(() => import("./PuntoVentaMap"), { ssr: false });

const mockPuntosDeVenta = [
  {
    id: 1,
    nombre: "Punto de Venta 1",
    direccion: "Av. La Marina 2500, San Miguel, Lima",
    lat: -12.086,
    lng: -77.07,
  },
  {
    id: 2,
    nombre: "Punto de Venta 2",
    direccion: "Av. Universitaria 1800, San Miguel, Lima",
    lat: -12.084,
    lng: -77.07,
  },
  {
    id: 3,
    nombre: "Punto de Venta 3",
    direccion: "Av. Elmer Faucett 2700, San Miguel, Lima",
    lat: -12.078,
    lng: -77.08,
  },
];

export default function VillaParadas() {
  const [puntos, setPuntos] = useState(mockPuntosDeVenta);
  const [currentEditPoint, setCurrentEditPoint] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [isViewingQR, setIsViewingQR] = useState(false);

  useEffect(() => {
    fetchPuntos();
  }, []);

  const fetchPuntos = async () => {
    try {
      const response: Response<PuntoVenta[]> = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/villaparada`
      );
      if (response.data.status === "Error") throw new Error(response.data.message);

      const puntos = response.data.result.map((punto) => ({
        ...punto,
        lat: punto.latitud,
        lng: punto.longitud,
      }));

      setPuntos(puntos);
    } catch (error) {
      console.warn("Usando datos mockeados debido a un error en la API:", error);
      setPuntos(mockPuntosDeVenta);
    }
  };

  const handleAddPoint = () => {
    setCurrentEditPoint(null);
    setMarkerPosition({ lat: -12.086, lng: -77.07 });
    setAddress("");
    setIsEditing(true);
    setIsViewingQR(false);
  };

  const handleSavePoint = async (updatedPoint: PuntoVenta) => {
    try {
      const newPoint = {
        nombre: updatedPoint.nombre,
        direccion: updatedPoint.direccion,
        latitud: updatedPoint.lat,
        longitud: updatedPoint.lng,
        nota: updatedPoint.nota,
        id_fruta: updatedPoint.id_fruta,
      };

      let response: Response<PuntoVenta>;

      if (updatedPoint.id) {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/villaparada/${updatedPoint.id}`,
          newPoint
        );
      } else {
        // Creación con POST
        response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/villaparada`, newPoint);
      }

      if (response.data.status === "Error") throw new Error(response.data.message);

      const savedPointId = response.data.result?.id;

    // Actualiza la lista completa
    await fetchPuntos();

    // Buscar el punto recién creado en la lista
    const savedPoint = puntos.find((punto) => punto.id === savedPointId);
    if (savedPoint) {
      setCurrentEditPoint(savedPoint); // Selecciona el punto recién guardado
      setIsViewingQR(true); // Muestra el QR
      setIsEditing(false); // Oculta el formulario
    } else {
      console.warn("El punto creado no fue encontrado en la lista.");
    }
    } catch (error) {
      console.error("Error al guardar el punto de venta:", error);
    }
  };

  const handleEditPoint = (punto) => {
    setCurrentEditPoint(punto);
    setMarkerPosition({ lat: punto.lat, lng: punto.lng });
    setAddress(punto.direccion || "");
    setIsEditing(true);
    setIsViewingQR(false);
  };

  const handleDeletePoint = (punto: PuntoVenta) => {
    setCurrentEditPoint(punto);
    setModalOpen(true);
  };

  const confirmDeletePoint = async () => {
    if (currentEditPoint) {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/villaparada/${currentEditPoint.id}`
        );
        if (response.data.status === "Error") throw new Error(response.data.message);

        await fetchPuntos();
        if (isEditing && currentEditPoint) {
          setIsEditing(false);
          setCurrentEditPoint(null);
        }
        setModalOpen(false);
      } catch (error) {
        console.error("Error al eliminar el punto de venta:", error);
      }
    }
  };

  // Actualiza la posición y realiza una geocodificación inversa
  const updateMarkerPosition = async (lat, lng) => {
    setMarkerPosition({ lat, lng });

    // Realiza una geocodificación inversa para obtener la dirección
    const reverseGeocodedAddress = await reverseGeocode(lat, lng);
    if (reverseGeocodedAddress) setAddress(reverseGeocodedAddress);
  };
  const handleViewQR = (punto) => {
    setCurrentEditPoint(punto);
    setIsViewingQR(true); // Muestra el QR
    setIsEditing(false); // Oculta el formulario
  };
  
  return (
    <div className="bg-primary-foreground flex h-full min-h-[600px] w-full flex-1 flex-col">
      <main className="flex h-[100%] flex-col overflow-y-hidden lg:flex-row">
        <div className="bg-primary-foreground flex h-full min-h-[600px] w-full flex-1 flex-col">
          <div className="flex h-[90%]">
            <div className="z-0 w-full p-2 shadow">
              <PuntoVentaMap
                puntos={puntos}
                selectedPoint={markerPosition}
                onDragMarker={updateMarkerPosition}
              />
            </div>
            <div className="w-[30%] rounded border p-4 shadow">
              <PuntoVillaParadaList
                puntos={puntos}
                onEdit={handleEditPoint}
                onDelete={handleDeletePoint}
                onViewQR={handleViewQR}
              />
              <div className="mt-4 w-full space-x-2 space-y-3">
                <Button
                  className="w-full gap-2 transition duration-300 ease-in-out hover:scale-105"
                  onClick={handleAddPoint}
                >
                  <Plus className="h-4 w-4 shrink-0" />
                  <p className="hidden sm:block">Agregar</p>
                </Button>
              </div>
              {isEditing && (
                <div className="mt-2 p-4 shadow">
                  <h2 className="text-lg font-semibold">
                    {currentEditPoint ? "Editar Punto de Venta" : "Nuevo Punto de Venta"}
                  </h2>
                  <PuntoVillaParadaForm
                    selectedPoint={{ ...currentEditPoint, ...markerPosition, direccion: address }}
                    onSave={handleSavePoint}
                    onCancel={() => setIsEditing(false)}
                    onMapUpdate={updateMarkerPosition}
                  />
                </div>
              )}
              {isViewingQR && (
  <div className="flex-grow flex flex-col items-center justify-center p-4 shadow">
                  <h2 className="text-center text-lg font-semibold mb-1">QR de la VillaParada</h2>
                  <span>{currentEditPoint?.nombre}</span>
    <QRCodeGenerator villaparada={currentEditPoint?.id} id_fruta={currentEditPoint?.id_fruta} />
  </div>
)}
            </div>
          </div>
          <PuntoVentaModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={confirmDeletePoint}
          />
        </div>
      </main>
    </div>
  );
}

// Función para geocodificación inversa
async function reverseGeocode(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data?.display_name || ""; // Usa la dirección completa de `display_name`
  } catch (error) {
    console.error("Error en la geocodificación inversa:", error);
    return "";
  }
}
