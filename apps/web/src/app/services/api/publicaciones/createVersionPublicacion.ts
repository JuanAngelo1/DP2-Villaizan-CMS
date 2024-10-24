// /services/api/publicaciones/createVersionPublicacion.ts
import axios from 'axios';
import { VersionPublicacion } from "@web/types";

interface CreateVersionPayload {
  id_publicacion: number;
  id_estado: number;
  titulo: string;
  urlimagen?: string;
  descripcionseo?: string;
  slug?: string;
}

const createVersionPublicacion = async (payload: CreateVersionPayload): Promise<VersionPublicacion> => {
  const response = await axios.post<VersionPublicacion>('/publicaciones/versiones', payload);
  return response.data;
};

export default createVersionPublicacion;