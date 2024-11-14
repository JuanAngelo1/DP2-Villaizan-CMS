import React from 'react'

export const ComentariosTableHeader = () => {
  return (
    <>
    <section className="text-muted-foreground flex items-center gap-3 rounded-md border bg-gray-50 px-4 py-3 pr-8">
        <div className="hidden flex-1 lg:block">
          <p>Usuario</p>
        </div>
        <div className="min-w-0 flex-1 text-xs md:text-base">
          <p>Comentario</p>
        </div>
        <div className="min-w-[130px] flex-1 text-xs md:text-base">
          <p>Sentimiento</p>
        </div>
        <div className="hidden flex-1 xl:block">
          <p>Fecha de creación</p>
        </div>
        <div className="w-6">
          {<p className="-translate-x-4 text-xs md:-translate-x-7 md:text-base">Acciones</p>}
        </div>
      </section>
    </>
  )
}

export default ComentariosTableHeader;