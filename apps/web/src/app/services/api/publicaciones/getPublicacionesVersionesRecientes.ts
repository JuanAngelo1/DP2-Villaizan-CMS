// /apps/web/src/services/api/publicaciones/getPublicacionesVersionesRecientes.ts
import axiosInstance from "@web/src/app/services/axiosInstance";
import { Publicacion, Response } from "@web/types";

const getPublicacionesVersionesRecientes = async (): Promise<Response<Publicacion[]>> => {
  const response: Response<Publicacion[]> = await axiosInstance.get("/publicaciones/versionesRecientes");
  return response;
};

export default getPublicacionesVersionesRecientes;