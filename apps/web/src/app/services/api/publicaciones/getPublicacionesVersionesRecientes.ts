// /apps/web/src/services/api/publicaciones/getPublicacionesVersionesRecientes.ts
import axios from 'axios';
import { Publicacion, Response } from "@web/types";

const getPublicacionesVersionesRecientes = async (): Promise<Response<Publicacion[]>> => {
  const response: Response<Publicacion[]> = await axios.get("/publicaciones/versionesRecientes");
  return response;
};

export default getPublicacionesVersionesRecientes;