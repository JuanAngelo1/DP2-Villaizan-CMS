// /apps/web/src/hooks/usePublicaciones.ts
import { useState, useEffect } from 'react';
import { Publicacion } from '@web/types';
import { getPublicacionesVersionesRecientes } from '@web/src/app/services/api/publicaciones';

const usePublicaciones = () => {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPublicaciones = async () => {
    setIsLoading(true);
    try {
      const response = await getPublicacionesVersionesRecientes();
      setPublicaciones(response.data.result);
    } catch (err) {
      setError('Error al obtener las publicaciones.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  return {
    publicaciones,
    isLoading,
    error,
    refetch: fetchPublicaciones,
    setPublicaciones,
  };
};

export default usePublicaciones;