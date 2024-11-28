import { Button } from "@repo/ui/components/button";

export default function VillaParadaList({ villaParadas, onEdit, onDelete }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-3">VillaParadas</h2>
      <ul className="space-y-3 max-h-[240px] overflow-y-auto border p-2">
        {villaParadas.map((parada) => (
          <li
            key={parada.id}
            className="flex items-center justify-between p-2 border rounded-lg shadow-sm bg-white"
          >
            <span className="font-sm flex-1">🏠 {parada.nombre}</span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(parada)}
                className="text-gray-700"
              >
                Editar
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(parada)}
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
