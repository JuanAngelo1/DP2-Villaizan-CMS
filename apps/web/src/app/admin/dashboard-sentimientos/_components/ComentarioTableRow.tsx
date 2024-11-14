import { Comentario } from '@web/types';
import React from 'react'

export const ComentarioTableRow = ({
  _comentario,
  setComentarios,
  openEditSheet,
  setDelComentario,
  setDeleteModalOpen
}:{
  _comentario: Comentario;
  setComentarios: (comentario: Comentario) => void;
  openEditSheet: (comentario: Comentario) => void;
  setDelComentario: (comentario: Comentario) => void;
  setDeleteModalOpen: (open: boolean) => void;
}) => {
  const {id, comentario, estadoaprobacion, fechacreacion, id_publicacion, usuario} = _comentario;
  return (
    <>
      <section key={id} className="flex items-center gap-3 rounded-md border px-4 py-3">
        <div className="hidden flex-1 lg:block">
          <p>{usuario.nombre + " " + usuario.apellido}</p>
        </div>

        <div className="min-w-0 flex-1 text-xs md:text-base">
          <p className="truncate">{comentario || "Comentario vacío"}</p>
        </div>

        <div className="min-w-0 flex-1 text-xs md:text-base">
          <p className="truncate">{comentario || "Comentario vacío"}</p>
        </div>

      </section>
    </>
  )
}

export default ComentarioTableRow;