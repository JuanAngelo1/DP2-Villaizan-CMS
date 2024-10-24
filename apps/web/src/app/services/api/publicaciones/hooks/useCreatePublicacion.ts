// /apps/web/src/hooks/useCreatePubliacion.ts
import { useState, useEffect } from 'react';
import { Publicacion, VersionPublicacion } from '@web/types';
import { createPublicacion } from '@web/src/app/services/api/publicaciones';

interface PublicacionInfoProps {
  titulo: string;
  slug: string;
  richtext: string;
  estado: string;
  categorias: string[];
  etiquetas: string[];
  fechapublicacion: string;
  fechacreacion: string;
  fechaactualizacion: string;
  id_tipopublicacion: number;
  id_usuario: string;
  vi_version_publicacion: VersionPublicacion[];
}

const useCreatePublicacion = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPub = async (pub: PublicacionInfoProps) => {
    setIsLoading(true);
    try {
      const reponseVersiones = await createPublicacion(pub);
    } catch (err) {
      setError('Error al obtener las versiones de la publicación.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createPub,
  };
}

export default useCreatePublicacion;