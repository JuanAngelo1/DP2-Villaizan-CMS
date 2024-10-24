import { Rol, Usuario } from "@web/types";
import React, { useEffect, useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/components/sheet";

function SheetUsuario({
  open,
  onOpenChange,
  usuario,
  setUsuario,
  title,
  onAction,
  roles,
  rolMap,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  usuario: Usuario;
  setUsuario: (usuario: Usuario) => void;
  title: string;
  onAction: () => Promise<void>;
  roles: Rol[];
  rolMap: Record<string, String>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRol, setSelectedRol] = useState<string>(usuario.id_rol);

  useEffect(() => {
    setSelectedRol(usuario.id_rol);
  }, [usuario.id_rol]);

  const selectedRolName = rolMap[selectedRol];

  const handleRolChange = (newRolId: string) => {
    setUsuario({ ...usuario, id_rol: newRolId });
    setSelectedRol(newRolId); // Actualiza el rol seleccionado en el estado
  };

  async function executeAction() {
    setIsLoading(true);
    try {
      await onAction();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={(open) => open === false && onOpenChange(open)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-start text-xl">{title}</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-1">
            <Label>Rol del usuario</Label>
            <div className="flex items-center gap-2">
              <Select value={selectedRol} onValueChange={handleRolChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={selectedRolName} />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((rol) => {
                    return (
                      <SelectItem key={rol.id} value={rol.id}>
                        {rol.nombre}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <SheetFooter className="mt-3">
              <SheetClose asChild disabled={isLoading}>
                <Button variant={"outline"} disabled={isLoading || open === false}>
                  Cancelar
                </Button>
              </SheetClose>
              <Button onClick={executeAction} isLoading={isLoading} disabled={isLoading || open === false}>
                Guardar
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default SheetUsuario;
