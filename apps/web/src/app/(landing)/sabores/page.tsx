"use server";

import { Fruta, Response } from "@web/types";
import axios from "axios";
import MainCarousel from "./_components/MainCarousel";

async function getFrutas() {
  try {
    const response: Response<Fruta[]> = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/frutas`);

    if (response.data.status !== "Success") throw new Error("Error al obtener las frutas");

    return response.data.result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function SaboresPage() {
  const frutas = await getFrutas();
  if (!frutas) throw new Error("Error al obtener las frutas");

  return (
    <>
      <MainCarousel frutas={frutas}/>
    </>
  );
}

export default SaboresPage;
