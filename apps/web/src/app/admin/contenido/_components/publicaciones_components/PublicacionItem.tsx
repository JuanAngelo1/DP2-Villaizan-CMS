// /apps/web/src/admin/contenido/_components/PublicacionItem.tsx
import { Publicacion } from "@web/types";
import { formatDate } from "@web/utils/date";
import { Ellipsis } from "lucide-react";
import React from "react";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";

interface PublicacionItemProps {
  publicacion: Publicacion;
  onEdit: (id: number) => void;
}

const PublicacionItem: React.FC<PublicacionItemProps> = ({ publicacion, onEdit }) => {
  return (
    <Card className="mb-2 flex h-auto items-center justify-between rounded-md border p-4">
      <CardContent className="mb-0 flex h-auto flex-1 flex-row items-center justify-between p-0 text-sm *:h-auto">
        <p className="text-md underline font-semibold">{publicacion.vi_version_publicacion[0]?.titulo || "Sin Título"}</p>
        <p>
          {publicacion.vi_version_publicacion[0]?.slug
            ? `/${publicacion.vi_version_publicacion[0].slug}`
            : "Sin Slug"}
        </p>
        <p>
          {publicacion.vi_version_publicacion[0]?.fechaultimamodificacion
            ? formatDate(publicacion.vi_version_publicacion[0].fechaultimamodificacion)
            : "Sin Fecha"}
        </p>
        <Button onClick={() => onEdit(Number(publicacion.id))} variant="ghost">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PublicacionItem;
