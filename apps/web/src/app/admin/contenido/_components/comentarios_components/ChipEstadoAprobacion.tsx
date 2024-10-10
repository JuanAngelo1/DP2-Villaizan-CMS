import { Comentario } from "@web/types";
import { Badge } from "@repo/ui/components/badge";

const badgeVariant: Map<boolean | null, { variant: string; label: string }> = new Map([
  [null, { variant: "secondary", label: "Por revisar" }],
  [true, { variant: "default", label: "Aprobado" }],
  [false, { variant: "destructive", label: "Rechazado" }],
]);

function ChipEstadoAprobacion({
  comentario,
  disabled = false,
}: {
  comentario: Comentario | null;
  disabled?: boolean;
}) {
  if (!comentario) return null;

  const badgeOptions = badgeVariant.get(comentario.estadoaprobacion);
  if (!badgeOptions) return <Badge variant={"outline"}>Estado no identificado</Badge>;

  return (
    <Badge variant={badgeOptions.variant as any} className={disabled ? "opacity-30" : ""}>
      {badgeOptions.label}
    </Badge>
  );
}

export default ChipEstadoAprobacion;
