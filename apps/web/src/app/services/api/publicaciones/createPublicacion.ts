// /services/api/publicaciones/createPublicacion.ts
import axiosInstance from "@web/src/app/services/axiosInstance";
import { Categoria, Etiqueta, Publicacion, TipoPublicacion, Usuario } from "@web/types";

interface CreatePublicacionPayload {
  titulo: string;
  descripcionseo: string;
  richtext: string;
  slug: string;
  id_tipo_publicacion: TipoPublicacion["id"];
  id_usuario: Usuario["id"];
  categorias: Categoria[];
  etiquetas: Etiqueta[];
}

const createPublicacion = async (payload: CreatePublicacionPayload): Promise<Response> => {
  const response: Response = await axiosInstance.post("/publicaciones/crearPubliacion", payload);
  return response;
};

export default createPublicacion;