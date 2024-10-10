"use client";

import { useSearchParams } from "next/navigation";
import ComentarioDetailView from "./comentarios_components/ComentarioDetailView";
import ComentariosListView from "./comentarios_components/ComentariosListView";
import SectionWrapper from "./general_components/SectionWrapper";

function Comentarios() {
  const searchParams = useSearchParams();
  const comment_id = searchParams.get("id");

  return (
    <SectionWrapper>
      {comment_id === null ? <ComentariosListView /> : <ComentarioDetailView id={comment_id}/>}
    </SectionWrapper>
  );
}
export default Comentarios;
