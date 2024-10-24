"use client";

import usePagination from "@web/hooks/usePagination";
import { Response, Rol, Usuario } from "@web/types";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { useEffect } from "react";
import { Button } from "@repo/ui/components/button";
import { Skeleton } from "@repo/ui/components/skeleton";
import MainContent from "./general_components/MainContent";
import SectionWrapper from "./general_components/SectionWrapper";
import SheetUsuario from "./usuarios_components/SheetUsuario";
import UsuarioTableRow from "./usuarios_components/UsuarioTableRow";
import UsuariosTableHeader from "./usuarios_components/UsuariosTableHeader";

const initUsuario: Usuario = {
  id: "",
  nombre: "",
  apellido: "",
  correo: "",
  id_rol: "",
  creadoen: new Date(),
};
function Usuarios() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [roles, setRoles] = useState<Rol[]>([]);
  const [currUsuario, setCurrUsuario] = useState<Usuario>(initUsuario);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState<boolean>(false);

  const { page, entriesPerPage, setEntriesPerPage, currentPageItems, totalPages, prevPage, nextPage } =
    usePagination<Usuario>({
      items: usuarios,
      startingEntriesPerPage: 10,
    });

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response: Response<Usuario[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/usuario`
        );
        if (response.data.status === "Error") throw new Error(response.data.message);
        setUsuarios(response.data.result);

        const responseRoles: Response<Rol[]> = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/rol`);
        if (responseRoles.data.status === "Error") throw new Error(responseRoles.data.message);
        setRoles(responseRoles.data.result);
        console.log("Roles -> ", responseRoles.data.result);
      } catch (error) {
        console.error("Ups! Algo salio mal -> ", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const updateRolUsuario = async (usuario: Usuario) => {
    try {
      console.log(usuario);
      const response: Response<null> = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/usuario/rol/${usuario.id}`,
        {
          id_rol: usuario.id_rol,
        }
      );

      if (response.data.status === "Error") throw new Error(response.data.message);

      const newUsuarios = usuarios.map((_usuario) => {
        if (_usuario.id === usuario.id) {
          return usuario;
        }
        return _usuario;
      });

      setUsuarios(newUsuarios);
      console.log(newUsuarios);
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
    }
  };

  const rolMap = useMemo(() => {
    return roles.reduce(
      (map, rol) => {
        map[rol.id] = rol.nombre;
        return map;
      },
      {} as Record<string, string>
    ); // Devuelve un objeto con { id: nombre }
  }, [roles]);

  const openEditSheet = useCallback((usuario: Usuario) => {
    setCurrUsuario(usuario);
    setIsEditSheetOpen(true);
  }, []);

  return (
    <>
      <SectionWrapper>
        <MainContent
          title="Usuarios"
          description="Administra los usuarios del sistema y sus permisos correspondientes."
        >
          <UsuariosTableHeader />
          {isLoading ? (
            <section className="flex items-center rounded-md border px-4 py-3">
              <div className="flex-1">
                <Skeleton className="w-[300px] rounded-3xl px-3 py-1 text-sm font-normal text-transparent">
                  .
                </Skeleton>
              </div>
              <div className="flex-1">
                <Skeleton className="w-[200px] rounded-3xl px-3 py-1 text-sm font-normal text-transparent">
                  .
                </Skeleton>
              </div>
              <div className="flex-1">
                <Skeleton className="w-[200px] rounded-3xl px-3 py-1 text-sm font-normal text-transparent">
                  .
                </Skeleton>
              </div>
              <div className="flex-1">
                <Skeleton className="w-[200px] rounded-3xl px-3 py-1 text-sm font-normal text-transparent">
                  .
                </Skeleton>
              </div>
            </section>
          ) : (
            <>
              <section className="h-full space-y-2 overflow-y-scroll">
                {currentPageItems.map((usuario) => (
                  <UsuarioTableRow
                    key={usuario.id}
                    usuario={usuario}
                    openEditSheet={openEditSheet}
                    rolName={rolMap[usuario.id_rol]}
                    setUsuarios={(newUsuario) => {
                      const newUsuarios = usuarios.map((_usuario) => {
                        if (_usuario.id === usuario.id) {
                          return newUsuario;
                        }
                        return _usuario;
                      });

                      setUsuarios(newUsuarios);
                    }}
                    updateRol={(updatedUsuario) => updateRolUsuario(updatedUsuario)}
                    roles={roles}
                  />
                ))}
              </section>

              <section className="flex flex-row items-center justify-between">
                <p className="text-sm">
                  Mostrando{" "}
                  <span className="font-bold">{`${(page - 1) * entriesPerPage + 1}-${page * entriesPerPage > usuarios.length ? usuarios.length : page * entriesPerPage}`}</span>{" "}
                  de <span className="font-bold">{usuarios.length}</span> usuarios
                </p>
                <div className="space-x-2">
                  <Button variant={"secondary"} onClick={prevPage} disabled={page === 1}>
                    Anterior
                  </Button>
                  <Button
                    variant={"secondary"}
                    onClick={nextPage}
                    disabled={page === totalPages || totalPages === 0}
                  >
                    Siguiente
                  </Button>
                </div>
              </section>
            </>
          )}
        </MainContent>
        <SheetUsuario
          open={isEditSheetOpen}
          onOpenChange={setIsEditSheetOpen}
          usuario={currUsuario}
          setUsuario={setCurrUsuario}
          title="Editar Usuario"
          onAction={() => updateRolUsuario(currUsuario)}
          roles={roles}
          rolMap={rolMap}
        />
      </SectionWrapper>
    </>
  );
}

export default Usuarios;
