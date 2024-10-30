// /services/api/publicaciones/createVersionPublicacion.ts
import axiosInstance from "@web/src/app/services/axiosInstance";
import { VersionPublicacion } from "@web/types";

interface CreateVersionPayload {
  id_publicacion: number;
  id_estado: number;
  titulo: string;
  richtext: string;
  urlimagen?: string;
  descripcionseo?: string;
  slug?: string;
}

const createVersionPublicacion = async (payload: CreateVersionPayload): Promise<VersionPublicacion> => {
  const response = await axiosInstance.post<VersionPublicacion>('/publicaciones/versiones', payload);
  return response.data;
};

export default createVersionPublicacion;