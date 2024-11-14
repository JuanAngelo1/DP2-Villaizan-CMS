import { Button } from '@repo/ui/components/button';
import { Label } from '@repo/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@repo/ui/components/sheet';
import { Comentario, Sentimiento } from '@web/types';
import React, { useEffect, useState } from 'react'

export const SheetComentario = ({
  open,
  onOpenChange,
  comentario,
  setComentario,
  title,
  onAction,
  sentimientos,
  sentimientoMap,
}:{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comentario: Comentario;
  setComentario: (comentario: Comentario) => void;
  title: string;
  onAction: () => Promise<void>;
  sentimientos: Sentimiento[];
  sentimientoMap: Record<string, string>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSentimiento, setSelectedSentimiento] = useState<number>(comentario.id_sentimiento);

  useEffect(()=>{
    setSelectedSentimiento(comentario.id_sentimiento);
  },[comentario.id_sentimiento]);

  const selectedSentimientoName = sentimientoMap[selectedSentimiento.toString()];

  const handleSentimientoChange = (newSentimientoId: string) => {
    const newSentimientoIdNumber = parseInt(newSentimientoId);
    setComentario({...comentario, id_sentimiento: newSentimientoIdNumber});
    setSelectedSentimiento(newSentimientoIdNumber);
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
        <SheetContent className="text-start text-xl">
          <SheetHeader>
            <SheetTitle>
              {title}
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-1">
          <Label>Sentimiento del comentario</Label>
          <div className="flex items-center gap-2">
            <Select value={selectedSentimiento.toString()} onValueChange={handleSentimientoChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={selectedSentimientoName} />
                </SelectTrigger>
                <SelectContent>
                  {sentimientos.map((sentimiento) => {
                    return (
                      <SelectItem key={sentimiento.id} value={sentimiento.id.toString()}>
                        {sentimiento.nombre}
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
  )
  
}

export default SheetComentario;