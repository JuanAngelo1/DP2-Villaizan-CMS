import usePagination from "@web/hooks/usePagination";
import { Publicacion, Response } from "@web/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "@repo/ui/components/button";
import { CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { cn } from "@repo/ui/lib/utils";
import ContentFooter from "../general_components/ContentFooter";
import MainContent from "../general_components/MainContent";

const mockPosts: Publicacion[] = [
  {
    id: "1",
    titulo: "Post 1",
    descripcion: "Contenido del post 1",
    urlImagen: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    titulo: "Post 2",
    descripcion: "Contenido del post 2",
    urlImagen: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    titulo: "Post 3",
    descripcion: "Contenido del post 3",
    urlImagen: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    titulo: "Post 4",
    descripcion: "Contenido del post 4",
    urlImagen: "https://via.placeholder.com/150",
  },
];

function ViewPerPostComentarios({ searchValue }: { searchValue: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);

  const {
    page,
    entriesPerPage,
    setEntriesPerPage,
    currentPageItems,
    allFilteredItems,
    indexOfFirstItemOfCurrentPage,
    indexOfLastItemOfCurrentPage,
    totalPages,
    prevPage,
    nextPage,
  } = usePagination<Publicacion>({
    items: publicaciones,
    startingEntriesPerPage: 10,
    // filters: [searchValue],
    // filterFunction: (item: Publicacion) => item.titulo.toLowerCase().includes(searchValue.toLowerCase()),
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response: Response<Publicacion[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones`
        );
        if (response.data.status === "Error") throw new Error(response.data.message);

        setPublicaciones(response.data.result);
      } catch (error) {
        console.error("Ups! Algo salio mal -> ", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <MainContent
      titleSlot={
        <CardHeader className="flex flex-row justify-between pb-4">
          <div className="flex flex-col items-start space-y-1.5">
            <CardTitle className="text-xl">Comentarios (Por publicación)</CardTitle>
            <CardDescription>
              Visualiza los comentarios realizados por los usuarios a través de las publicaciones de la
              plataforma.
            </CardDescription>
          </div>
          {/* <Button>Seleccionar</Button> */}
          <div className={cn(buttonVariants({ variant: "outline" }), "hover:bg-background gap-2")}>
            <p>Mostrando</p>
            <Input
              className="h-[30px] w-[40px] px-0 text-center"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(e.target.value)}
            />
            <p className="">por página</p>
          </div>
        </CardHeader>
      }
    >
      <section className="grid h-full grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentPageItems.map((post, idx) => {
          return (
            <Link
              href={{
                query: { content: "comentarios", view: "post", selected_post: post.id },
              }}
              key={idx}
              className="hover:bg-primary-foreground flex h-[250px] flex-col overflow-hidden rounded-md border p-3 transition-colors"
            >
              <img src={post.urlImagen} alt={post.titulo} className="w-full flex-1 object-cover" />
              <h2 className="text-lg font-semibold">{post.titulo}</h2>
              <p className="text-sm">{post.descripcion}</p>
            </Link>
          );
        })}
      </section>
      <ContentFooter
        page={page}
        totalPages={totalPages}
        allFilteredItems={allFilteredItems}
        indexOfFirstItemOfCurrentPage={indexOfFirstItemOfCurrentPage}
        indexOfLastItemOfCurrentPage={indexOfLastItemOfCurrentPage}
        prevPage={prevPage}
        nextPage={nextPage}
        itemName="publicaciones"
      />
    </MainContent>
  );
}
export default ViewPerPostComentarios;
