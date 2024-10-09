"use client";

import InputWithLabel from "@web/src/app/(auth)/_components/InputWithLabel";
import { Etiqueta } from "@web/types";
import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { ColorPicker } from "@repo/ui/components/color-picker";
import { Label } from "@repo/ui/components/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/components/sheet";
import ChipEtiqueta from "./ChipEtiqueta";

const initEtiqueta: Etiqueta = {
  id: "000-init",
  nombre: "",
  descripcion: "",
  colorfondo: "#000000",
  colortexto: "#000000",
};

function SheetEtiqueta({
  open,
  onOpenChange,
  etiqueta,
  setEtiqueta,
  title,
  onAction,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  etiqueta: Etiqueta;
  setEtiqueta: (etiqueta: Etiqueta) => void;
  title: string;
  onAction: () => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

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
    <Sheet open={open} onOpenChange={(open) => open === false && onOpenChange(open)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-start text-xl">{title}</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="mt-2 flex flex-col gap-2">
          <InputWithLabel
            label="Nombre de categoría"
            placeholder="Ej. Popular"
            value={etiqueta.nombre}
            onChange={(e) => setEtiqueta({ ...etiqueta, nombre: e.target.value })}
          />
          <InputWithLabel
            label="Descripción breve"
            placeholder="Ej. Articulos de paletas"
            value={etiqueta.descripcion}
            onChange={(e) => setEtiqueta({ ...etiqueta, descripcion: e.target.value })}
          />
          <div className="flex flex-col gap-0">
            <Label>Color principal</Label>
            <div className="flex items-center gap-2">
              <ColorPicker
                value={etiqueta?.colorfondo}
                onChange={(val) => setEtiqueta({ ...etiqueta, colorfondo: val })}
              />
              <p className="text-sm">{etiqueta?.colorfondo}</p>
            </div>
          </div>

          <div className="flex flex-col gap-0">
            <Label>Color de texto</Label>
            <div className="flex items-center gap-2">
              <ColorPicker
                value={etiqueta?.colortexto}
                onChange={(val) => setEtiqueta({ ...etiqueta, colortexto: val })}
              />
              <p className="text-sm">{etiqueta?.colortexto}</p>
            </div>
          </div>

          {etiqueta.nombre !== "" && (
            <div className="mt-2 flex flex-col gap-0">
              <Label>Prevista</Label>
              <ChipEtiqueta className="text-md" etiqueta={etiqueta} />
            </div>
          )}
          <SheetFooter className="mt-1">
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
  );
}
export default SheetEtiqueta;
