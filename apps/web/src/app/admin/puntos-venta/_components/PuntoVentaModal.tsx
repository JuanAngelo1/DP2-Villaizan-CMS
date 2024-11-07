
// src/app/admin/puntos-venta/components/PuntoVentaModal.tsx

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Button } from "@repo/ui/components/button";

export default function PuntoVentaModal({ isOpen, onClose, onConfirm }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 space-y-4 bg-white rounded shadow-lg ">
        <DialogTitle className="text-lg font-semibold">Confirmar Eliminación</DialogTitle>
        <DialogDescription>
          ¿Estás seguro de que deseas eliminar este punto de venta?
        </DialogDescription>
        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

