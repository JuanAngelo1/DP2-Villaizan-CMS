// /apps/web/src/admin/contenido/_components/VersionItem.tsx
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
import { Badge } from "@repo/ui/components/badge";

interface PublicacionItemProps {
  version_publicacion: any;
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

const VersionItem: React.FC<PublicacionItemProps> = ({ version_publicacion, onEdit, onDuplicate }) => {
  return (
    <Card className="mb-2 flex h-auto items-center justify-between rounded-md border p-4">
      <CardContent className="mb-0 flex h-auto flex-1 flex-row items-center justify-between p-0 text-sm *:h-auto">
        <p className="text-md flex-1 font-semibold underline">
          {version_publicacion.titulo || "(Sin titulo)"}
        </p>
        <p className="flex-1">/{version_publicacion.slug || "(Sin slug)"}</p>
        <p className="flex-1">Últ. edición: {formatDate(version_publicacion?.ultimamodificacion)}</p>
        <div className="flex-1">
          <Badge className="w-fit" variant={'default'}>
            {version_publicacion.estado}
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {onEdit ? (
              <DropdownMenuItem onClick={() => onEdit(version_publicacion.id)}>Editar</DropdownMenuItem>
            ) : null}
            {onDuplicate ? (
              <DropdownMenuItem onClick={() => onDuplicate(version_publicacion.id)}>Duplicar</DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};

export default VersionItem;
