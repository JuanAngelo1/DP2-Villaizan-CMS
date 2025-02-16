"use server";

import { auth } from "@web/auth";
import { ControlledError, Response, Usuario } from "@web/types";
import axios from "axios";

export async function getUserSession(): Promise<Required<Usuario> | null> {
  const session = await auth();
  if (!session) return null;
  const userId = session.user.db_info.id;

  let result = null;
  try {
    const response: Response<Required<Usuario>> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/usuarios/${userId}`
    );
    if (response.data.status === "Error") throw new ControlledError(response.data.message);

    result = response.data.result;
  } catch (error) {
    console.log(error);
    return null;
  }

  return result;
}
