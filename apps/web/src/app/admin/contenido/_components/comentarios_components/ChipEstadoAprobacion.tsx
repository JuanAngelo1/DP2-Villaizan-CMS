import { Comentario } from "@web/types";
import { Badge } from "@repo/ui/components/badge";

function ChipEstadoAprobacion({ comentario }: { comentario: Comentario | null }) {
  if (!comentario) return null;
  return (
    <Badge
      variant={
        comentario.estadoaprobacion === null
          ? "secondary"
          : comentario.estadoaprobacion === true
            ? "default"
            : "destructive"
      }
    >
      {comentario.estadoaprobacion === null
        ? "Por revisar"
        : comentario.estadoaprobacion === true
          ? "Aprobado"
          : "Rechazado"}
    </Badge>
  );
}

export default ChipEstadoAprobacion;
