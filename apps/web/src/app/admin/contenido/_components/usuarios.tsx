"use client";

import usePagination from "@web/hooks/usePagination";
import { ControlledError, Response, Rol, Usuario } from "@web/types";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { useEffect } from "react";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Skeleton } from "@repo/ui/components/skeleton";
import { useToast } from "@repo/ui/hooks/use-toast";
import { cn } from "@repo/ui/lib/utils";
import ContentFooter from "./general_components/ContentFooter";
import DialogDelete from "./general_components/DialogDelete";
import MainContent from "./general_components/MainContent";
import SectionWrapper from "./general_components/SectionWrapper";
import TopHeader from "./general_components/TopHeader";
import SheetUsuario from "./usuarios_components/SheetUsuario";
import UsuarioTableRow from "./usuarios_components/UsuarioTableRow";
import UsuariosTableHeader from "./usuarios_components/UsuariosTableHeader";

const initUsuario: Usuario = {
  id: "",
  nombre: "",
  apellido: "",
  correo: "",
  imagenperfil: "",
  id_rol: "",
  id_persona: "",
  creadoen: new Date(),
};

function Usuarios() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [roles, setRoles] = useState<Rol[]>([]);
  const [currUsuario, setCurrUsuario] = useState<Usuario>(initUsuario);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState<boolean>(false);
  const [delUsuario, setDelUsuario] = useState<Usuario | null>(null);
  const [search, setSearch] = useState<string>("");

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response: Response<Usuario[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/usuarios`
        );
        if (response.data.status === "Error") throw new ControlledError(response.data.message);
        setUsuarios(response.data.result);

        const responseRoles: Response<Rol[]> = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/rol`);
        if (responseRoles.data.status === "Error") throw new Error(responseRoles.data.message);
        setRoles(responseRoles.data.result);
        console.log("Roles -> ", responseRoles.data.result);
      } catch (error) {
        if (error instanceof ControlledError) {
          toast({ title: "Error al obtener los usuarios", description: error.message });
        } else {
          console.error("Error al obtener los usuarios:", error);
          toast({ title: "Ups! Algo salió mal.", description: "Error al obtener los usuarios" });
        }
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/usuarios/rol/${usuario.id}`,
        {
          id_rol: usuario.id_rol,
        }
      );

      if (response.data.status === "Error") throw new ControlledError(response.data.message);

      const newUsuarios = usuarios.map((_usuario) => {
        if (_usuario.id === usuario.id) {
          return usuario;
        }
        return _usuario;
      });

      setUsuarios(newUsuarios);
      toast({
        title: "Usuario actualizado",
        description: `El usuario ${usuario.correo} ha sido actualizado correctamente`,
      });
    } catch (error) {
      if (error instanceof ControlledError) {
        toast({ title: "Error al actualizar el usuario", description: error.message });
      } else {
        console.error("Error al actualizar el usuario:", error);
        toast({ title: "Ups! Algo salió mal.", description: "Error al actualizar el usuario" });
      }
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

  const deleteUsuario = async (usuario: Usuario | null) => {
    if (!usuario) return;

    console.log(usuario)

    const response: Response<null> = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/usuarios/${usuario.id}`
    );

    if (response.data.status === "Error") throw new ControlledError(response.data.message);

    const newUsuarios = usuarios.filter((_usuario) => _usuario.id !== usuario.id);
    setUsuarios(newUsuarios);

    setDelUsuario(null);

    toast({
      title: "Usuario eliminado",
      description: `El usuario ${usuario.correo || usuario.nombre} ha sido eliminado correctamente`,
    });
  };

  const filteredUsuarios = useMemo(() => {
    return usuarios.filter(
      (usuario) =>
        usuario.nombre?.toLowerCase().includes(search.toLowerCase()) ||
        usuario.apellido?.toLowerCase().includes(search.toLowerCase()) ||
        usuario.correo?.toLowerCase().includes(search.toLowerCase()) ||
        rolMap[usuario.id_rol]?.toLowerCase().includes(search.toLowerCase())
    );
  }, [usuarios, search, rolMap]);

  const {
    page,
    entriesPerPage,
    setEntriesPerPage,
    currentPageItems,
    totalPages,
    prevPage,
    nextPage,
    allFilteredItems,
    indexOfFirstItemOfCurrentPage,
    indexOfLastItemOfCurrentPage,
  } = usePagination<Usuario>({
    items: filteredUsuarios,
    startingEntriesPerPage: 10,
  });
  return (
    <>
      <SectionWrapper>
        <TopHeader>
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 lg:w-fit"
          />
          <div className={cn(buttonVariants({ variant: "outline" }), "hover:bg-background gap-2")}>
            <p>Mostrando</p>
            <Input
              className="h-[30px] w-[40px] px-0 text-center"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(e.target.value)}
            />
            <p>por página</p>
          </div>
        </TopHeader>

        <MainContent
          title="Usuarios"
          description="Administra los usuarios del sistema y sus permisos correspondientes."
        >
          <UsuariosTableHeader />
          {isLoading ? (
            <section className="flex items-center gap-3 rounded-md border px-4 py-3 pr-8">
              <div className="hidden flex-1 lg:block">
                <Skeleton className="max-w-[200px] flex-1 rounded-3xl py-1 text-base font-normal text-transparent">
                  .
                </Skeleton>
              </div>
              <div className="flex-1">
                <Skeleton className="max-w-[200px] flex-1 rounded-3xl py-1 text-xs font-normal text-transparent md:text-base">
                  .
                </Skeleton>
              </div>
              <div className="hidden flex-1 xl:block">
                <Skeleton className="max-w-[200px] rounded-3xl py-1 text-xs font-normal text-transparent md:text-base">
                  .
                </Skeleton>
              </div>
              <div className="flex-1">
                <Skeleton className="w-[180px] flex-1 rounded-3xl py-1 text-xs font-normal text-transparent md:text-base">
                  .
                </Skeleton>
              </div>

              <div className="h-[10px] w-6 shrink-0" />
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
                    setDelUsuario={setDelUsuario}
                    setDeleteModalOpen={setDeleteModalOpen}
                  />
                ))}
              </section>

              <ContentFooter
                page={page}
                totalPages={totalPages}
                allFilteredItems={allFilteredItems}
                indexOfFirstItemOfCurrentPage={indexOfFirstItemOfCurrentPage}
                indexOfLastItemOfCurrentPage={indexOfLastItemOfCurrentPage}
                prevPage={prevPage}
                nextPage={nextPage}
                itemName="usuarios"
              />
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
        <DialogDelete
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onAction={() => deleteUsuario(delUsuario)}
          title="¿Estás absolutamente seguro?"
          description="Esta acción no se puede deshacer. Esto eliminará permanentemente al usuario."
        />
      </SectionWrapper>
    </>
  );
}

export default Usuarios;
