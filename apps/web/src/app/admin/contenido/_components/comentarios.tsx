"use client";

import { useSearchParams } from "next/navigation";
import ComentarioDetailView from "./comentarios_components/ComentarioDetailView";
import ComentariosListView from "./comentarios_components/ComentariosListView";
import SectionWrapper from "./general_components/SectionWrapper";
import ComentariosPerPostView from "./comentarios_components/ComentariosPerPostView";

function Comentarios() {
  const searchParams = useSearchParams();

  const selected_post = searchParams.get("selected_post");
  const id_comentario = searchParams.get("id_comentario");

  return (
    <SectionWrapper>
      {id_comentario !== null ? (
        <ComentarioDetailView id={id_comentario} />
      ) : selected_post !== null ? (
        <ComentariosPerPostView id={selected_post} />
      ) : (
        <ComentariosListView />
      )}
    </SectionWrapper>
  );
}
export default Comentarios;
