// /services/api/publicaciones/createPublicacion.ts
import axiosInstance from "@web/src/app/services/axiosInstance";
import { Publicacion, Response } from "@web/types";

interface CreatePublicacionPayload {
  titulo: string;
  urlimagen?: string;
  descripcionSEO?: string;
  fecha_publicacion?: Date;
  slug: string;
  richtext: string;
  id_tipopublicacion: number;
  id_usuario: string;
  categorias: string[];
  etiquetas: string[];
}

const createPublicacion = async (payload: any): Promise<Response<Publicacion>> => {
  const response: Response<Publicacion> = await axiosInstance.post("/publicaciones/crearPublicacion", payload);
  return response;
};

export default createPublicacion;