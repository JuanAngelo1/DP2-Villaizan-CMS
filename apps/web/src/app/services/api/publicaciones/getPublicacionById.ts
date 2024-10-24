// /apps/web/src/services/api/publicaciones/getPublicacionById.ts
import axiosInstance from "@web/src/app/services/axiosInstance";
import { Publicacion, Response } from "@web/types";

interface PublicacionPayload {
  id: Publicacion["id"];
}

const getPublicaciones = async (payload: PublicacionPayload): Promise<Response<Publicacion>> => {
  const response: Response<Publicacion> = await axiosInstance.get("/publicaciones/obtener/" + payload.id);
  return response;
};

export default getPublicaciones;