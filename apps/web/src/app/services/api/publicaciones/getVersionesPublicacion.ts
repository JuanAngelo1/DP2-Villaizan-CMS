// /apps/web/src/services/api/publicaciones/getVersionesPublicacion.ts
import axios from 'axios';
import { Publicacion, Response } from "@web/types";

interface VersionesPublicacionPayload {
  publicacionId: string;
}

const getPublicaciones = async (payload: VersionesPublicacionPayload ): Promise<Response<Publicacion[]>> => {
  const response: Response<Publicacion[]> = await axios.get("/publicaciones/versiones" + payload.publicacionId);
  return response;
};

export default getPublicaciones;