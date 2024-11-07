"use client";

import React from 'react';
import axios from 'axios';
import { useToast } from '@repo/ui/hooks/use-toast';
import { Response } from '@web/types';
import { useRouter } from 'next/navigation';
import MainContent from '../../_components/general_components/MainContent';
import { Separator } from '@repo/ui/components/separator';
import { Label } from '@repo/ui/components/label';
import { Input } from '@repo/ui/components/input';
import { Textarea } from '@repo/ui/components/textarea';
import { Button } from '@repo/ui/components/button';

interface Publicacion {
  nombrereferencia: string,
  id_tipopublicacion: number,
  descripcion: string,
  id_usuario: string
}

interface PublicationResponse {
  id: number,
}

function NuevoPublicacionPage() {
  const [publicacion, setPublicacion] = React.useState<Publicacion>({
    nombrereferencia: '',
    id_tipopublicacion: 1,
    descripcion: '',
    id_usuario: 'us-cb74a272'
  });
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();
  
  const handleSave = async () => {
    setLoading(true);
    try {
      const response: Response<PublicationResponse> = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/crearPublicacion`, publicacion);
      router.push(`/admin/contenido/publicaciones/${response.data.result.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al crear la publicación.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainContent
      title='Nueva Publicación'
    >
      <Separator orientation='horizontal' className='mb-4'/>
      <div className='w-full h-full overflow-y-auto flex flex-col justify-between'>
        {/* Informacion del formulario para el creador actual */}
        <div>
          <div className='mb-4'>
            <h2 className='text-lg font-semibold'>Información de referencia</h2>
            <p className='text-sm text-muted-foreground'>
              Los siguientes campos son como referencia para el creador acerca de la publicación (no se visualizará en la página pública).
            </p>
            <p className='text-sm text-muted-foreground'>
              El contenido público podrá ser creado y editado al manejar las versiones de la publicación después de la creación.
            </p>
          </div>
          <Separator orientation='horizontal' className='mb-4'/>
          <div className='flex flex-col gap-4 *:flex *:flex-col *:gap-2'>
          </div>
          {/* Formulario */}
          <form className='flex flex-col gap-4 *:flex *:flex-col *:gap-2'>
            {/* Campos del formulario */}
            <div>
              {/* Nombre de referencia */}
              <Label>Nombre de referencia</Label>
              <Input placeholder='Nombre de referencia' value={publicacion.nombrereferencia} onChange={(e) => setPublicacion({...publicacion, nombrereferencia: e.target.value})} />
            </div>
            {/* Descripcion de referencia */}
            <div>
              <Label>Descripción de referencia</Label>
              <Textarea placeholder='Descripción de referencia' value={publicacion.descripcion} onChange={(e) => setPublicacion({...publicacion, descripcion: e.target.value})} />
            </div>
          </form> 
        </div>
        {/* Botones de acción */}
        <div className='flex flex-row gap-2 self-end mt-8'>
          <Button variant={'ghost'} onClick={() => router.push('/admin/contenido/publicaciones')}>
            Cancelar
          </Button>
          <Button variant={'default'} onClick={() => {handleSave()}} isLoading={loading} disabled={loading}>
            Guardar
          </Button>
        </div>
      </div>
    </MainContent>
  );
}

export default NuevoPublicacionPage;