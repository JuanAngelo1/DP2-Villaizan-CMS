"use server";

import { Fruta, Response } from "@web/types";
import axios from "axios";
import MainCarousel from "./_components/MainCarousel";
import { auth } from "@web/auth";

async function getFrutasNoUser() {
  try {
    const response: Response<Fruta[]> = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/frutas`);

    if (response.data.status !== "Success") throw new Error("Error al obtener las frutas");

    return response.data.result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getFrutasByUser(userId: string) {
  try {
    const response: Response<Fruta[]> = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/frutas/porUsuario/${userId}`);

    if (response.data.status !== "Success") throw new Error("Error al obtener las frutas");

    return response.data.result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function SaboresPage() {
  const session = await auth();
  const user = session?.user;

  let frutas: Fruta[] | null = [];

  if(!user) frutas = await getFrutasNoUser();
  else frutas = await getFrutasByUser(user.db_info.id);


  // if (!frutas) throw new Error("Error al obtener las frutas");

  return (
    <>
      <MainCarousel frutas={frutas} user={user}/>
    </>
  );
}

export default SaboresPage;
