// src/app/admin/puntos-venta/page.tsx
"use client";

import { Plus } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { PuntoVenta, Response } from "@web/types";
import { Button } from "@repo/ui/components/button";
import PuntoVentaForm from "./_components/PuntoVentaForm";
import PuntoVentaList from "./_components/PuntoVentaList";
import dynamic from "next/dynamic";
import PuntoVentaModal from "./_components/PuntoVentaModal";

const PuntoVentaMap = dynamic(() => import("./_components/PuntoVentaMap"), { ssr: false });

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

export default function PuntosVentaPage() {
  const [puntos, setPuntos] = useState(mockPuntosDeVenta);
  const [currentEditPoint, setCurrentEditPoint] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchPuntos();
  }, []);

  const fetchPuntos = async () => {
    try {
      const response: Response<PuntoVenta[]> = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/puntosventa`);
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
  };

  const handleSavePoint = async (updatedPoint: PuntoVenta) => {
    try {
      const newPoint = {
        nombre: updatedPoint.nombre,
        direccion: updatedPoint.direccion,
        latitud: updatedPoint.lat,
        longitud: updatedPoint.lng,
        nota: updatedPoint.nota,
      };

      let response: Response<PuntoVenta>;

      if (updatedPoint.id) {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/puntosventa/actualizar/${updatedPoint.id}`,
          newPoint
        );
      } else {
        // Creación con POST
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/puntosventa/crear`,
          newPoint
        );
      }

      if (response.data.status === "Error") throw new Error(response.data.message);

      await fetchPuntos();

      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar el punto de venta:", error);
    }
  };

  const handleEditPoint = (punto) => {
    setCurrentEditPoint(punto);
    setMarkerPosition({ lat: punto.lat, lng: punto.lng });
    setAddress(punto.direccion || "");
    setIsEditing(true);
  };

  const handleDeletePoint = (punto: PuntoVenta) => {
    setCurrentEditPoint(punto);
    setModalOpen(true);
  };

  const confirmDeletePoint = async () => {
    if (currentEditPoint) {
      try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/puntosventa/eliminar/${currentEditPoint.id}`);
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

  return (
    <div className="bg-primary-foreground flex h-full min-h-[600px] w-full flex-1 flex-col gap-2 p-6 lg:gap-[2px] lg:p-[2px]">
      <main className="flex h-[95%] flex-col gap-2 overflow-y-hidden lg:flex-row lg:gap-6">
        <div className="bg-primary-foreground flex h-full min-h-[600px] w-full flex-1 flex-col gap-2 p-2 lg:gap-[24px] lg:p-[32px]">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Gestión de Puntos de Venta</h1>
          </div>
          <div className="flex space-x-4 h-[95%]">
            <div className="w-full p-2 shadow z-0">
              <PuntoVentaMap
                puntos={puntos}
                selectedPoint={markerPosition}
                onDragMarker={updateMarkerPosition}
              />
            </div>
            <div className="w-[25%] rounded border p-4 shadow">
              <PuntoVentaList puntos={puntos} onEdit={handleEditPoint} onDelete={handleDeletePoint} />
              <div className="mt-4 w-full space-x-2 space-y-3">
                <Button className="w-full gap-2" onClick={handleAddPoint}>
                  <Plus className="h-4 w-4 shrink-0" />
                  <p className="hidden sm:block">Agregar</p>
                </Button>
              </div>
              {isEditing && (
                <div className="mt-2 p-4 shadow">
                  <h2 className="text-lg font-semibold">
                    {currentEditPoint ? "Editar Punto de Venta" : "Nuevo Punto de Venta"}
                  </h2>
                  <PuntoVentaForm
                    selectedPoint={{ ...currentEditPoint, ...markerPosition, direccion: address }}
                    onSave={handleSavePoint}
                    onCancel={() => setIsEditing(false)}
                    onMapUpdate={updateMarkerPosition}
                  />
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
