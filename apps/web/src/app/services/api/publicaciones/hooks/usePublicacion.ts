// /apps/web/src/hooks/usePublicacion.ts
import { useState, useEffect } from 'react';
import { Publicacion, VersionPublicacion } from '@web/types';
import { getPublicacionById, getVersionesPublicacion } from '@web/src/app/services/api/publicaciones';

const usePublicacion = () => {
  const [publicacion, setPublicacion] = useState<Publicacion | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPublicacion = async (id: Publicacion["id"]) => {
    setIsLoading(true);
    try {
      const reponseVersiones = await getVersionesPublicacion({ id });
      const response = await getPublicacionById({ id });
      setPublicacion({
        ...response.data.result,
        vi_version_publicacion: reponseVersiones.data.result,
      });
    } catch (err) {
      setError('Error al obtener las versiones de la publicación.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVersionesPublicacion = async (id: Publicacion["id"]) => {
    setIsLoading(true);
    try {
      const response = await getVersionesPublicacion({ id });
      if (publicacion) {
        setPublicacion({
          ...publicacion,
          vi_version_publicacion: response.data.result,
        });
      }
    } catch (err) {
      setError('Error al obtener las versiones de la publicación.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    publicacion,
    isLoading,
    error,
    fetchPublicacion,
    fetchVersionesPublicacion,
    setPublicacion,
  };
}

export default usePublicacion;