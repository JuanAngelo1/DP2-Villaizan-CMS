import { toast } from '@repo/ui/hooks/use-toast';
import { Comentario, ControlledError, Response } from '@web/types';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import SectionWrapper from '../../contenido/_components/general_components/SectionWrapper';
import TopHeader from '../../contenido/_components/general_components/TopHeader';
import { Input } from '@repo/ui/components/input';
import { cn } from '@repo/ui/lib/utils';
import { buttonVariants } from '@repo/ui/components/button';
import usePagination from '@web/hooks/usePagination';
import MainContent from '../../contenido/_components/general_components/MainContent';
import ComentariosTableHeader from './ComentariosTableHeader';
import { Skeleton } from '@repo/ui/components/skeleton';
import ComentarioTableRow from './ComentarioTableRow';

function Comentarios() {
  const [isLoading, setIsLoading] = useState(true);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(()=>{
    async function fetchData(){
      try {
        setIsLoading(true);
        const response: Response<Comentario[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/comentario`
        )
        if (response.data.status === "Error") throw new ControlledError(response.data.message);
        setComentarios(response.data.result);

        console.log(response.data.result);
      } catch (error) {
        if(error instanceof ControlledError){
          toast({title: "Error al obtener los comentarios", description: error.message});
        }else{
          console.error("Error al obtener los comentarios", error);
          toast({ title: "Ups! Algo salió mal.", description: "Error al obtener los comentarios" });
        }
      }finally{
        setIsLoading(false);
      }
    }

    fetchData();
  }, [])

  const filteredComentarios = useMemo(()=>{
    return comentarios.filter(
      (comentario) =>
        comentario.comentario?.toLowerCase().includes(search.toLowerCase())
    );
  }, [comentarios, search]);

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
  } = usePagination<Comentario>({
    items: filteredComentarios,
    startingEntriesPerPage: 10,
  });
  return (
    <>
      <SectionWrapper>
        <TopHeader>
          <Input placeholder='Buscar...'/>
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
          title='Comentarios'
          description='Administra los comentarios de los usuarios'
        >
          <ComentariosTableHeader />
          { isLoading ? (
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
            </section>):(
              <>
                <section className="h-full space-y-2 overflow-y-scroll">
                  {currentPageItems.map((comentario)=>(
                    <ComentarioTableRow 
                    _comentario={comentario}/>
                  ))}
                </section>
              </>
            )}
        </MainContent>
      </SectionWrapper>
    </>
  )
}

export default Comentarios