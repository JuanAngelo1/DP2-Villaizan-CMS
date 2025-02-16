"use server";

import { Fruta, Response } from "@web/types";
import axios from "axios";
import dynamic from "next/dynamic";
import Faqs from "./_components/faqs";
import Feats from "./_sections/Feats";
import Hero from "./_sections/Hero";
import Nosotros from "./_sections/Nosotros";
import NosotrosV2 from "./_sections/NosotrosV2";
import PromoAction from "./_sections/PromoAction";
import Publicaciones from "./_sections/Publicaciones";
import Frutas from "./_sections/Frutas";

const MapComponent = dynamic(() => import("./_components/map"), { ssr: false });

async function getFrutas() {
  try {
    const response: Response<Fruta[]> = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/frutas`);

    if (response.data.status !== "Success") throw new Error("Error al obtener las frutas");

    return response.data.result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Page() {
  const frutas = await getFrutas();

  return (
    <>
      <Hero />
      <Frutas frutas={frutas}/>
      <Feats />
      <NosotrosV2 />
      <Publicaciones />
      <PromoAction />
      <MapComponent />
      <Faqs />
    </>
  );
}
