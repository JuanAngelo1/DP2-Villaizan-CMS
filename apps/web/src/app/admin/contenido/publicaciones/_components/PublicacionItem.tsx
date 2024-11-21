// /apps/web/src/admin/contenido/_components/PublicacionItem.tsx
import { formatDate } from "@web/utils/date";
import { ArchiveIcon, ArchiveRestoreIcon, Ellipsis, Pencil } from "lucide-react";
import React from "react";
import { Button } from "@repo/ui/components/button";
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
  onEdit?: (id: number) => void;
  onArchive?: (id: number) => Promise<void>;
  onUnarchive?: (id: number) => Promise<void>;
}

const PublicacionItem: React.FC<PublicacionItemProps> = ({ publicacion, onEdit, onArchive, onUnarchive }) => {
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
          <DropdownMenuContent className="*:flex *:gap-2">
            {onEdit ? (
              <DropdownMenuItem onClick={() => onEdit(publicacion.id)}>
                <Pencil className="h-4 w-4" /> Editar
              </DropdownMenuItem>
            ) : null}
            {onArchive ? (
              <DropdownMenuItem onClick={() => onArchive(publicacion.id)}>
                <ArchiveIcon className="h-4 w-4" /> Archivar
              </DropdownMenuItem>
            ) : null}
            {onUnarchive ? (
              <DropdownMenuItem onClick={() => onUnarchive(publicacion.id)}>
                <ArchiveRestoreIcon className="h-4 w-4" /> Desarchivar
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};

export default PublicacionItem;
