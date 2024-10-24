// /apps/web/src/services/api/publicaciones/getPublicacionById.ts
import axios from 'axios';
import { Publicacion, Response } from "@web/types";

interface PublicacionPayload {
  id: Publicacion["id"];
}

const getPublicaciones = async (payload: PublicacionPayload): Promise<Response<Publicacion[]>> => {
  const response: Response<Publicacion[]> = await axios.get("/publicaciones/obtener" + payload.id);
  return response;
};

export default getPublicaciones;