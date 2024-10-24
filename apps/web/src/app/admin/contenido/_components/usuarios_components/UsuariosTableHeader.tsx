import { Ellipsis } from "lucide-react";

function UsuariosTableHeader() {
  return (
    <>
      <section className="text-muted-foreground flex items-center rounded-md border bg-gray-50 px-4 py-3 pr-8">
        <div className="flex-1">
          <p>Usuario</p>
        </div>
        <div className="flex-1">
          <p>Correo</p>
        </div>
        <div className="flex-1">
          <p>Rol</p>
        </div>
        <div className="flex-1">
          <p>Fecha de creación</p>
        </div>
        {/* <Ellipsis /> */}
        <div className="w-6">{<p className="-translate-x-7">Acciones</p>}</div>
      </section>
    </>
  );
}

export default UsuariosTableHeader;
