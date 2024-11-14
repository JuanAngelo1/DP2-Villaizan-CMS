import { Comentario } from "@web/types";
import { formatDate } from "@web/utils/date";
import Link from "next/link";
import { cn } from "@repo/ui/lib/utils";
import ChipEstadoAprobacion from "./ChipEstadoAprobacion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function ComentarioCard({
  comentario,
  showPublicacionData = false,
}: {
  comentario: Comentario;
  showPublicacionData?: boolean;
}) {
  const Cell = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cn("flex-1", className)}>{children}</div>;
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePushToComment = () => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.set("id_comentario", comentario.id.toString());
    router.push(`${pathname}?${nextSearchParams}`);
  }

  console.log("Comentario: ", comentario);

  return (
    <div
      onClick={handlePushToComment}
      className="hover:bg-secondary flex cursor-pointer items-center rounded-md border px-4 py-3 text-sm transition-colors"
    >
      <Cell>{comentario.comentario}</Cell>
      {/* <Cell className="text-center">{comentario.publicacion.titulo}</Cell> */}
      <Cell className="text-center">
        <ChipEstadoAprobacion comentario={comentario} />
      </Cell>
      <Cell className="text-end">{formatDate(comentario.fechacreacion)}</Cell>
    </div>
  );
}

export default ComentarioCard;
