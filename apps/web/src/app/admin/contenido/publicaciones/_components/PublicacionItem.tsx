// /apps/web/src/admin/contenido/_components/PublicacionItem.tsx
import { formatDate } from "@web/utils/date";
import { Ellipsis } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@repo/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";

interface PublicacionItemProps {
  publicacion: any;
  onEdit?: (id: string) => void;
  onArchive?: (id: string) => void;
}

const PublicacionItem: React.FC<PublicacionItemProps> = ({ publicacion, onEdit, onArchive }) => {
  return (
    <Card className="mb-2 flex h-auto items-center justify-between rounded-md border p-4">
      <CardContent className="mb-0 flex h-auto flex-1 flex-row items-center justify-between p-0 text-sm *:h-auto">
        <p className="text-md flex-1 font-semibold underline">
          {publicacion.nombrereferencia || "(Sin nombre de referencia)"}
        </p>
        <p className="flex-1">{publicacion.descripcion || "(Sin descripción)"}</p>
        <p className="flex-1">Últ. edición: {formatDate(publicacion?.fechamodificacion)}</p>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {onEdit ? (
              <DropdownMenuItem onClick={() => onEdit(publicacion.id)}>Editar</DropdownMenuItem>
            ) : null}
            {onArchive ? (
              <DropdownMenuItem onClick={() => onArchive(publicacion.id)}>Archivar</DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};

export default PublicacionItem;
