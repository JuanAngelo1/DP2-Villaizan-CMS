"use client"

import MainContent from "./general_components/MainContent";
import usePagination from "@web/hooks/usePagination";
import { useState } from "react";
import { Skeleton } from "@repo/ui/components/skeleton";
import { Button } from "@repo/ui/components/button";
import { Usuario, Response } from "@web/types";
import { useEffect } from "react";
import { formatDate } from "@web/utils/date";
import axios from "axios";

function Usuarios() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const { page, entriesPerPage, setEntriesPerPage, currentPageItems, totalPages, prevPage, nextPage } =
    usePagination<Usuario>({ items: usuarios, startingEntriesPerPage: 10 });


  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response: Response<Usuario[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/usuario`
        );
        if (response.data.status === "Error") throw new Error(response.data.message);
        setUsuarios(response.data.result);
      } catch (error) {
        console.error("Ups! Algo salio mal -> ", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <MainContent
        title="Usuarios"
        description="Administra los usuarios del sistema y sus permisos correspondientes."
      >
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
            <section className="h-full space-y-2 overflow-y-auto">
              {currentPageItems.map((usuario)=>{
                const { id, nombre, correo, id_rol, creadoen } = usuario;
                return (
                  <section key={id} className="flex items-center rounded-md border px-4 py-3">
                    <div className="flex-1">
                      <p>{nombre}</p>
                    </div>
                    <div className="flex-1">
                      <p>{correo || "No registrado"}</p>
                    </div>
                    <div className="flex-1">
                      <p>{id_rol || "No registrado"}</p>
                    </div>
                    <div className="flex-1">
                      <p>{formatDate(creadoen.toString())}</p>
                    </div>
                  </section>
                );
              })}
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
    </>
  )
}

export default Usuarios;