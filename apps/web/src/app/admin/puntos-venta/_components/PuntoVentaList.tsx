// src/app/admin/puntos-venta/components/PuntoVentaList.tsx
import { Button } from "@repo/ui/components/button";

export default function PuntoVentaList({ puntos, onEdit, onDelete }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-3">Puntos de Venta</h2>
      <ul className="space-y-3">
        {puntos.map((punto) => (
          <li
            key={punto.id}
            className="flex items-center justify-between p-3 border rounded-lg shadow-sm bg-white"
          >
            <span className="font-sm flex-1">{punto.nombre}</span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(punto)}
                className=" text-gray-700 "
              >
                Editar
              </Button>
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
