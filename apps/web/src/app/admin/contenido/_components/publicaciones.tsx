"use client";
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import SectionWrapper from "./general_components/SectionWrapper";
import PublicacionManage from "./publicaciones_components/PublicacionManage";
import PublicacionesListView from "./publicaciones_components/PublicacionesListView";

function Publicaciones() {
  const searchParams = useSearchParams();
  const pub_action = searchParams.get('publication_action');
  const pub_id = searchParams.get('publication_id');
  const pathname = usePathname();
  const router = useRouter();

  // Actualiza los parámetros de la URL sin necesidad de estado local
  const handleChangeType = (type: string | null, id?: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (type) {
      params.set('publication_action', type);
    } else {
      params.delete('publication_action');
    }
    if (id) {
      params.set('publication_id', id);
    } else {
      params.delete('publication_id');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    // Este efecto se disparará cuando cambie la URL o los parámetros
  }, [pub_action, pub_id]);

  // Renderiza el componente adecuado basado en los parámetros de la URL
  const renderComponent = (currentType: string | null, pub_id?: string | null) => {
    switch (currentType) {
      case "create":
        return <PublicacionManage changeType={handleChangeType} type="create" />;
      case "edit":
        return <PublicacionManage changeType={handleChangeType} type="edit" id={pub_id} />;
      default:
        return <PublicacionesListView changeType={handleChangeType} />;
    }
  };

  return (
    <SectionWrapper>
      {renderComponent(pub_action, pub_id)}
    </SectionWrapper>
  );
}

export default Publicaciones;