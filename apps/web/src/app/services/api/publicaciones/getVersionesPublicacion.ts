// /apps/web/src/services/api/publicaciones/getVersionesPublicacion.ts
import axiosInstance from "@web/src/app/services/axiosInstance";
import { Response, Publicacion, VersionPublicacion } from "@web/types";

interface VersionesPublicacionPayload {
  id: Publicacion["id"];
}

const getVersionesPublicacion = async (payload: VersionesPublicacionPayload ): Promise<Response<VersionPublicacion[]>> => {
  const response: Response<VersionPublicacion[]> = await axiosInstance.get("/publicaciones/versiones/" + payload.id);
  return response;
};

export default getVersionesPublicacion;