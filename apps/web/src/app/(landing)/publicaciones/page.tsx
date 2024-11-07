"use server";

import { Categoria, ControlledError, Response, VersionPublicacion } from "@web/types";
import axios from "axios";
import MaxWidthWrapper from "./../_components/MaxWidthWrapper";
import PublicacionesView from "./_components/PublicacionesView";

async function getCategories() {
  try {
    const response: Response<Categoria[]> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/categoria`
    );

    if (response.data.status === "Error") throw new ControlledError(response.data.message);

    console.log("Categories data -> ", response.data.result);
    return response.data.result;
  } catch (error) {
    if (error instanceof ControlledError) {
      console.log("Error al cargar las categorias: ", error.message);
    }

    console.log("Error desconocido al cargar las categorias: ", error);
  }
}

async function getPublications() {
  try {
    const response: Response<VersionPublicacion[]> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/publicadas`
    );

    if (response.data.status === "Error") throw new ControlledError(response.data.message);

    console.log("Publicacion data -> ", response.data.result);
    return response.data.result;
  } catch (error) {
    if (error instanceof ControlledError) {
      console.log("Error al cargar las publicaciones: ", error.message);
    }

    console.log("Error desconocido al cargar las publicaciones: ", error);
  }
}

async function PublicacionesPage() {
  const publicaciones = await getPublications();
  const categorias = await getCategories();

  if (!publicaciones || !categorias) {
    return <p>Ups, algo salio mal. Intenta de nuevo.</p>;
  }

  return (
    <section className="py-12">
      <MaxWidthWrapper className="flex flex-col">
        <h1 className="font-['Abhaya_Libre'] text-4xl font-bold sm:text-5xl md:text-7xl">Publicaciones</h1>
        <PublicacionesView publicaciones={publicaciones} categorias={categorias} />
      </MaxWidthWrapper>
    </section>
  );
}

export default PublicacionesPage;
