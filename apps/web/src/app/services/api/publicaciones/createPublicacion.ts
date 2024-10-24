// /services/api/publicaciones/createPublicacion.ts
import axios from 'axios';
import { Publicacion } from "@web/types";

interface CreatePublicacionPayload {
  titulo: string;
  slug: string;
  contenido: string;
  estado: string;
  categorias: number[];
  etiquetas: number[];
  fechaPublicacion: string;
}

const createPublicacion = async (payload: CreatePublicacionPayload): Promise<Publicacion> => {
  const response = await axios.post<Publicacion>('/publicaciones', payload);
  return response.data;
};

export default createPublicacion;