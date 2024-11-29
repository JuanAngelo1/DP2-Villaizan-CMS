import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import QRCodeGenerator from "./QRCodeGenerator"; // Asegúrate de importar correctamente el componente

export default function PuntoVillaParadaList({ puntos, onEdit, onDelete, onViewQR  }) {


  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-3">Lista de VillaParadas</h2>
      <ul className="space-y-3 max-h-[240px] overflow-y-auto border p-2">
        {puntos.map((punto) => (
          <li
            key={punto.id}
            className="flex items-center justify-between p-2 border rounded-lg shadow-sm bg-white"
          >
            <span className="font-sm flex-1">🏪 {punto.nombre}</span>
            <div className="flex space-x-2">
              {/* Botón Editar */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(punto)}
                className="text-gray-700"
              >
                Editar
              </Button>

             {/* Botón Ver QR */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onViewQR(punto)} // Llama al han dler para "Ver QR"
                className="text-white bg-blue-400 hover:bg-blue-500"
              >
                Ver QR
              </Button>

              {/* Botón Eliminar */}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(punto)}
                className="text-white bg-red-500 hover:bg-red-600"
              >
                Eliminar
              </Button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}
