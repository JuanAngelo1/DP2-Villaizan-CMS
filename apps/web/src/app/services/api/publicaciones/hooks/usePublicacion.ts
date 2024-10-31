// /apps/web/src/hooks/usePublicacion.ts
import { useState, useEffect, useCallback } from 'react';
import { Publicacion, VersionPublicacion } from '@web/types';
import { getPublicacionById, getVersionesPublicacion } from '@web/src/app/services/api/publicaciones';

interface UsePublicacionReturn {
  publicacion: Publicacion | null;
  isLoading: boolean;
  error: string | null;
  fetchPublicacion: (id: Publicacion['id']) => Promise<void>;
}

const usePublicacion = (): UsePublicacionReturn => {
  const [publicacion, setPublicacion] = useState<Publicacion | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPublicacion = useCallback(async (id: Publicacion['id']) => {
    setIsLoading(true);
    setError(null);
    try {
      // Obtener la publicación por ID
      const response = await getPublicacionById({ id });
      const fetchedPublicacion = response.data.result;

      // Obtener las versiones de la publicación
      const versionesResponse = await getVersionesPublicacion({ id });
      const versiones = versionesResponse.data.result;

      // Construir el objeto de publicación con las versiones
      const publication: Publicacion = {
        ...fetchedPublicacion,
        vi_version_publicacion: versiones,
      };

      setPublicacion(publication);
    } catch (err) {
      console.error('Error al obtener la publicación:', err);
      setError('Error al obtener la publicación.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    publicacion,
    isLoading,
    error,
    fetchPublicacion,
  };
};

export default usePublicacion;