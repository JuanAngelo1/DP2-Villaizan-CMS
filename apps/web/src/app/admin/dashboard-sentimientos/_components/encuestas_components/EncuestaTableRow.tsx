import { Encuesta } from "@web/types";
import { formatDate } from "@web/utils/date";
import { Delete, Ellipsis, FilePenLine } from "lucide-react";
import React from "react";
import { Button } from "@repo/ui/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";

export const EncuestaTableRow = ({
  encuesta,
  onViewDetails,
  openEditSheet,
  setDelEncuesta,
  setDeleteModalOpen,
}: {
  encuesta: Encuesta;
  onViewDetails: (encuesta: Encuesta) => void;
  openEditSheet: (encuesta: Encuesta) => void;
  setDelEncuesta: (encuesta: Encuesta) => void;
  setDeleteModalOpen: (open: boolean) => void;
}) => {
  const { id, title, start_date, end_date } = encuesta;

  return (
    <>
      <section key={id} className="flex items-center gap-3 rounded-md border px-4 py-3">
        <div
          className="text-md flex-1 cursor-pointer font-semibold underline"
          onClick={() => onViewDetails(encuesta)}
        >
          <p>{title}</p>
        </div>

        <div className="flex-1 text-sm">
          <p>{formatDate(start_date)}</p>
        </div>

        <div className="flex-1 text-sm">
          <p>{formatDate(end_date)}</p>
        </div>

        <Popover>
          <PopoverTrigger>
            <Ellipsis />
          </PopoverTrigger>
          <PopoverContent className="flex w-fit flex-col gap-0 p-1" side="left" align="start">
            <Button variant={"ghost"} className="justify-start" onClick={() => openEditSheet(encuesta)}>
              <FilePenLine className="h-4 w-4" />
              <p>Editar</p>
            </Button>
            <Button
              variant={"ghost"}
              className="justify-start hover:bg-red-100/50"
              onClick={() => {
                setDelEncuesta(encuesta);
                setDeleteModalOpen(true);
              }}
            >
              <Delete className="h-4 w-4 stroke-red-500" />
              <p className="text-red-500">Eliminar</p>
            </Button>
          </PopoverContent>
        </Popover>
      </section>
    </>
  );
};

export default EncuestaTableRow;
