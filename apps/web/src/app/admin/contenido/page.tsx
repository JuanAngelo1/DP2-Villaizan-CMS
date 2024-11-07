"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function ContenidoPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/contenido/publicaciones');
  }, [router]);

  return null;
}
export default ContenidoPage;
