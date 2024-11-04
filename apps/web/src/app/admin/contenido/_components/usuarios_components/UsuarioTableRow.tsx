import { Rol, Usuario } from "@web/types";
import { formatDate } from "@web/utils/date";
import { Delete, Ellipsis, FilePenLine } from "lucide-react";
import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";

function UsuarioTableRow({
  usuario,
  setUsuarios,
  rolName,
  openEditSheet,
  updateRol,
  roles,
  setDelUsuario,
  setDeleteModalOpen,
}: {
  usuario: Usuario;
  setUsuarios: (usuario: Usuario) => void;
  rolName: string;
  openEditSheet: (usuario: Usuario) => void;
  updateRol: (newUsuario: Usuario) => void;
  roles: Rol[];
  setDelUsuario: (usuario: Usuario) => void;
  setDeleteModalOpen: (open: boolean) => void;
}) {
  const { id, nombre, correo, id_rol, creadoen } = usuario;

  const handleRolChange = (newRolId: string) => {
    setUsuarios({ ...usuario, id_rol: newRolId });
    updateRol({ ...usuario, id_rol: newRolId }); // Llamamos a la función para actualizar el rol en el servidor
  };

  return (
    <>
      <section key={id} className="flex items-center gap-3 rounded-md border px-4 py-3">
        <div className="hidden flex-1 lg:block">
          <p>{nombre}</p>
        </div>
        <div className="min-w-0 flex-1 text-xs md:text-base">
          <p className="truncate">{correo || "No registrado"}</p>
        </div>
        <div className="flex-1">
          <Select value={usuario.id_rol} onValueChange={handleRolChange}>
            <SelectTrigger className="min-w-[130px] max-w-[180px] text-xs md:text-base">
              <SelectValue placeholder={rolName} />
            </SelectTrigger>
            <SelectContent>
              {roles.map((rol) => {
                return (
                  <SelectItem key={rol.id} value={rol.id} className="text-xs md:text-base">
                    {rol.nombre}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="hidden flex-1 xl:block">
          <p>{formatDate(creadoen.toString())}</p>
        </div>

        <Popover>
          <PopoverTrigger>
            <Ellipsis />
          </PopoverTrigger>
          <PopoverContent className="flex w-fit flex-col gap-0 p-1" side="left" align="start">
            <Button variant={"ghost"} className="justify-start" onClick={() => openEditSheet(usuario)}>
              <FilePenLine className="h-4 w-4" />
              <p>Editar</p>
            </Button>
            <Button
              variant={"ghost"}
              className="justify-start hover:bg-red-100/50"
              onClick={() => {
                setDelUsuario(usuario);
                setDeleteModalOpen(true);
              }}
            >
              <Delete className="h-4 w-4 stroke-red-500" />
              <p className="text-red-500">Eliminar</p>
            </Button>
          </PopoverContent>
        </Popover>
      </section>
    </>
  );
}

export default UsuarioTableRow;
