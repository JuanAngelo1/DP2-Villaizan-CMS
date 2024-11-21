import { Sentimiento } from "@web/types";
import { Check, Laugh, LaughIcon, ListFilter } from "lucide-react";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { cn } from "@repo/ui/lib/utils";

function ComentariosFilters({
  sentimientos,
  selectedSentimientos,
  setSelectedSentimientos,
}: {
  sentimientos: Sentimiento[];
  selectedSentimientos: Sentimiento[];
  setSelectedSentimientos: (sentimientos: Sentimiento[]) => void;
}) {
  const toggleSentimiento = (sentimiento: Sentimiento) => {
    const isSelected = selectedSentimientos.some((s) => s.id === sentimiento.id);
    if (isSelected) {
      setSelectedSentimientos(selectedSentimientos.filter((s) => s.id !== sentimiento.id));
    } else {
      setSelectedSentimientos([...selectedSentimientos, sentimiento]);
    }
  };

  const allSentimientos = () => {
    setSelectedSentimientos(sentimientos);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"}>
          <LaughIcon className="h-5 w-5 shrink-0" />
          <p>Sentimientos</p>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-2" side="bottom" align="end">
        <section className="flex flex-row items-center justify-between px-2 py-1">
          <h4 className="text-md font-medium">Sentimientos</h4>
          <p className="cursor-pointer text-sm hover:underline" onClick={allSentimientos}>
            Todos
          </p>
        </section>
        <div className="mt-1 flex flex-col gap-1">
          {sentimientos.map((sentimiento) => {
            const isSelected = selectedSentimientos.some((s) => s.id === sentimiento.id);

            return (
              <div
                className={cn(
                  "flex cursor-pointer flex-row items-center justify-between rounded-lg px-3 py-2",
                  isSelected ? "bg-secondary" : "hover:bg-secondary/50"
                )}
                onClick={() => toggleSentimiento(sentimiento)}
              >
                <Badge className="w-fit gap-1" style={{ background: sentimiento.colorfondo }}>
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: sentimiento.colortexto }} />
                  <p style={{ color: sentimiento.colortexto }}>{sentimiento.nombre}</p>
                </Badge>

                <Check className={cn("stroke-muted-foreground h-4 w-4", !isSelected && "hidden")} />
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
export default ComentariosFilters;
