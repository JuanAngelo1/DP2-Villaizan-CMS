import React from "react";

function EncuestasTableHeader() {
  return (
    <>
      <section className="text-muted-foreground flex items-center gap-3 rounded-md border bg-gray-50 px-4 py-3 pr-8">
        <div className="hidden flex-1 lg:block">
          <p>Titulo</p>
        </div>
        <div className="min-w-0 flex-1 text-xs md:text-base">
          <p>Fecha Inicio</p>
        </div>
        <div className="hidden flex-1 xl:block">
          <p>Fecha Fin</p>
        </div>
        <div className="w-6">
          {<p className="-translate-x-4 text-xs md:-translate-x-7 md:text-base">Acciones</p>}
        </div>
      </section>
    </>
  );
}

export default EncuestasTableHeader;
