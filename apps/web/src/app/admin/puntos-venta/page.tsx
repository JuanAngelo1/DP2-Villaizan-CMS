// src/app/admin/puntos-venta/page.tsx
"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb";
import { Button } from "@repo/ui/components/button";
import PuntoVentaForm from "./_components/PuntoVentaForm";
import PuntoVentaList from "./_components/PuntoVentaList";
import PuntoVentaMap from "./_components/PuntoVentaMap";
import PuntoVentaModal from "./_components/PuntoVentaModal";

// Datos mockeados de San Miguel, Lima
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
    async function fetchPuntos() {
      try {
        const response = await fetch("/api/puntos-venta");
        if (!response.ok) throw new Error("API no disponible");
        const data = await response.json();
        setPuntos(data);
      } catch (error) {
        console.warn("Usando datos mockeados debido a un error en la API:", error);
        setPuntos(mockPuntosDeVenta);
      }
    }
    fetchPuntos();
  }, []);

  const handleAddPoint = () => {
    setCurrentEditPoint(null);
    setMarkerPosition({ lat: -12.086, lng: -77.07 });
    setAddress(""); // Limpia la dirección para un nuevo punto
    setIsEditing(true);
  };

  const handleEditPoint = (punto) => {
    setCurrentEditPoint(punto);
    setMarkerPosition({ lat: punto.lat, lng: punto.lng });
    setAddress(punto.direccion || ""); // Establece la dirección existente para el punto en edición
    setIsEditing(true);
  };

  const handleSavePoint = (updatedPoint) => {
    const finalPoint = {
      ...updatedPoint,
      direccion: address,
      lat: markerPosition.lat,
      lng: markerPosition.lng,
      nota: updatedPoint.nota || "",
    };
    if (currentEditPoint) {
      setPuntos((prevPuntos) => prevPuntos.map((p) => (p.id === finalPoint.id ? finalPoint : p)));
    } else {
      setPuntos((prevPuntos) => [...prevPuntos, { ...finalPoint, id: prevPuntos.length + 1 }]);
    }
    setIsEditing(false);
    setCurrentEditPoint(null);
    setMarkerPosition(null);
    setAddress("");
  };

  const handleDeletePoint = (punto) => {
    setCurrentEditPoint(punto);
    setModalOpen(true);
  };

  const confirmDeletePoint = () => {
    setPuntos((prevPuntos) => prevPuntos.filter((p) => p.id !== currentEditPoint.id));
    setModalOpen(false);
    setCurrentEditPoint(null);
  };

  // Actualiza la posición y realiza una geocodificación inversa
  const updateMarkerPosition = async (lat, lng) => {
    setMarkerPosition({ lat, lng });

    // Realiza una geocodificación inversa para obtener la dirección
    const reverseGeocodedAddress = await reverseGeocode(lat, lng);
    if (reverseGeocodedAddress) setAddress(reverseGeocodedAddress);
  };

  return (
    <div className="bg-primary-foreground flex h-full min-h-[600px] w-full flex-1 flex-col gap-2 p-6 lg:gap-[24px] lg:p-[32px]">
      <Breadcrumb className="px-1 lg:px-0">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Gestión de puntos de venta</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <main className="flex h-full flex-col gap-2 overflow-y-hidden lg:flex-row lg:gap-6">
        <div className="bg-primary-foreground flex h-full min-h-[600px] w-full flex-1 flex-col gap-2 p-6 lg:gap-[24px] lg:p-[32px]">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Gestión de Puntos de Venta</h1>
          </div>

          <div className="flex space-x-4 h-">
            <div className="w-full rounded border p-4 shadow">
              <PuntoVentaMap
                puntos={puntos}
                selectedPoint={markerPosition}
                onDragMarker={updateMarkerPosition}
              />
            </div>
            <div className="w-1/5 rounded border p-4 shadow">
              <PuntoVentaList puntos={puntos} onEdit={handleEditPoint} onDelete={handleDeletePoint} />
              <div className="mt-4 w-full space-x-2 space-y-3">
                <Button className="w-full gap-2" onClick={handleAddPoint}>
                  <Plus className="h-4 w-4 shrink-0" />
                  <p className="hidden sm:block">Agregar</p>
                </Button>
              </div>
              {(
                <div className="mt-4 rounded border p-4 shadow">
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
