import { ResponseModuloRedes } from "@web/types";
import axios from "axios";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/components/accordion";
import { Badge } from "@repo/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/table";

type EncuestaDetalleProps = {
  id: string | number; // id obligatorio
  encuesta?: any; // encuesta opcional
  respuestas?: any; // respuestas opcional
};
type Encuesta = {
  id: string;
  title: string;
  description: string;
  status: "activo" | "inactivo";
  start_date: string;
  end_date: string;
};

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "dd MMMM yyyy", { locale: es });
};

type Respuesta = {
  id: string;
  text: string;
  sentiment: string;
};

type Pregunta = {
  id: string;
  title: string;
  type: string;
  required: boolean;
  answers: Respuesta[];
};

type RespuestaAPI = {
  id: string;
  title: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
  questions: Pregunta[];
};

function DetalleEncuesta({ id, encuesta }: EncuestaDetalleProps) {
  const sentimientoTexto = "Neutro";
  const [respuestas, setRespuestas] = useState<RespuestaAPI>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRespuestas = async () => {
      try {
        setLoading(true);
        console.log(`${process.env.NEXT_PUBLIC_REDES_SOCIALES_SERVER_URL}/encuestas/listar-todo?id=${id}`);
        const response: ResponseModuloRedes<RespuestaAPI> = await axios.get(
          `${process.env.NEXT_PUBLIC_REDES_SOCIALES_SERVER_URL}/encuestas/listar-todo?id=${id}`
        );
        setRespuestas(response.data);
        console.log("Encuesta listada:", response.data);
        console.log("Respuestas:", response.data);
        setError(null);
      } catch (err) {
        setError("Error al obtener las respuestas de la encuesta.");
      } finally {
        setLoading(false);
      }
    };

    fetchRespuestas();
  }, [id]);

  console.log("Respuestas:", respuestas);
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <div className="flex items-center gap-10">
          <CardTitle className="text-2xl font-bold">{encuesta.title}</CardTitle>
          <Badge
            variant={
              encuesta.status === "activo"
                ? "default"
                : encuesta.status === "inactivo"
                  ? "destructive"
                  : "secondary"
            }
          >
            {encuesta.status.charAt(0).toUpperCase() + encuesta.status.slice(1)}
          </Badge>
        </div>
        <span>Creado por: {encuesta.creator_name}</span>
        <CardDescription>{encuesta.description}</CardDescription>
        <div className="text-muted-foreground mt-2 flex items-center gap-5 text-sm">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Inicio: {formatDate(encuesta.start_date)}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Fin: {formatDate(encuesta.end_date)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Separator className="my-6" />
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold">Análisis de Sentimiento General </h3>
            <span className="text-sm font-medium">{sentimientoTexto}</span>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Respuestas por Encuesta</h3>

          {!loading && respuestas.questions.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {respuestas.questions.map((respuesta, index) => (
                <AccordionItem value={`item-${respuesta.id}`} key={respuesta.id}>
                  <AccordionTrigger>
                    <div className="flex w-full items-center justify-between">
                      <span>
                        {"Encuesta # "}
                        {index + 1}
                      </span>
                      {/* <span className="text-muted-foreground text-sm">
                        Respondida: {formatDate(respuesta.date)}
                      </span> */}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-1/2">Pregunta</TableHead>
                          <TableHead className="w-1/3">Respuesta</TableHead>
                          <TableHead className="w-1/6">Sentimiento</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {respuesta.answers.map((answer, respIndex) => (
                          <TableRow key={respIndex}>
                            <TableCell>{respuesta.title}</TableCell>
                            <TableCell>{answer.text}</TableCell>
                            <TableCell
                              className={` ${answer.sentiment === "Positivo" ? "bg-green-200 text-white" : ""} ${answer.sentiment === "Neutro" ? "bg-gray-300 text-white" : ""} ${answer.sentiment === "Negativo" ? "bg-red-200 text-white" : ""} `}
                            >
                              {answer.sentiment || "Neutro"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-muted-foreground text-center">No hay respuestas disponibles.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
export default DetalleEncuesta;
