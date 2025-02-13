"use client";

import { ControlledError, Response, Usuario } from "@web/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

function useClientSession() {
  const { data: session, status, update } = useSession();
  const userId = session?.user.db_info.id;

  const [user, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    async function getUserData() {
      try {
        if (status === "authenticated" && userId) {
          const response: Response<Usuario> = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/usuarios/${userId}`
          );
          if (response.data.status === "Error") throw new ControlledError(response.data.message);
          setUser(response.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserData();
  }, [status, userId]);

  return { user, status };
}
export default useSession;
