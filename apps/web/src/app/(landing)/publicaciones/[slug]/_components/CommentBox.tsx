"use client";

import { Comentario, ControlledError, Response, VersionPublicacion } from "@web/types";
import axios from "axios";
import { User } from "next-auth";
import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Textarea } from "@repo/ui/components/textarea";
import { useToast } from "@repo/ui/hooks/use-toast";

function CommentBox({ user, publicacion }: { user: User; publicacion: VersionPublicacion }) {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [commentText, setCommentText] = useState("");

  async function createComment({
    comentario,
    id_usuario,
    id_publicacion,
  }: {
    comentario: string;
    id_usuario: string;
    id_publicacion: number;
  }) {
    try {
      setIsLoading(true);
      const response: Response<Comentario> = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comentario`,
        {
          comentario: comentario,
          id_usuario: id_usuario,
          id_publicacion: id_publicacion,
        }
      );

      console.log(response.data)

      if (response.data.status !== "Success") throw new ControlledError(response.data.message);

      setCommentText("");
      toast({
        title: "Comentario creado con exito",
        description: "Espera a que este sea aprobado para visualizarlo.",
      });
    } catch (error) {
      if (error instanceof ControlledError) {
        toast({
          title: "Error al crear el comentario",
          description: error.message,
        });
      } else {
        console.log("UnexpectedError: Mira el error al crear el comentario: ", error);
        toast({
          title: "Error al crear el comentario",
          description: "Ocurrió un error inesperado. Intenta de nuevo.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mt-5 flex flex-row items-start gap-2">
      <img src={user.db_info.imagenperfil || "/default-profile.png"} className="h-12 w-12 rounded-sm" />
      <div className="flex-1">
        <Textarea
          placeholder="Escribe tu comentario aqui"
          className=""
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={isLoading}
        />
        <div className="mt-2 flex flex-row items-center justify-end gap-1">
          <Button
            className="text-sm"
            size={"sm"}
            variant={"outline"}
            disabled={isLoading || commentText === ""}
            onClick={() => setCommentText("")}
          >
            Limpiar
          </Button>
          <Button
            className="text-sm"
            size={"sm"}
            isLoading={isLoading}
            disabled={isLoading || commentText === ""}
            onClick={() =>
              createComment({
                comentario: commentText,
                id_usuario: user.db_info.id,
                id_publicacion: publicacion.id_publicacion,
              })
            }
          >
            Comentar
          </Button>
        </div>
      </div>
    </section>
  );
}
export default CommentBox;
