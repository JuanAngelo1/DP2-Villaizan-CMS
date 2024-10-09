import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";

function DialogDelete({
  open,
  onOpenChange,
  onAction,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAction: () => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const executeAction = async () => {
    setIsLoading(true);
    try {
      await onAction();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-start">¿Estás absolutamente seguro?</DialogTitle>
          <DialogDescription className="text-start">
            Esta acción no se puede deshacer. Esto eliminará permanentemente la etiqueta.
          </DialogDescription>
          <DialogFooter>
            <Button variant={"outline"} onClick={(e) => onOpenChange(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button variant="destructive" disabled={isLoading} isLoading={isLoading} onClick={executeAction}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
export default DialogDelete;
