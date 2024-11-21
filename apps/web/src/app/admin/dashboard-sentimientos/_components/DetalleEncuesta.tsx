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
import { ResponseModuloRedes } from "@web/types";

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

type Respuesta = {
  survey_id: string;
  question_id: string;
  question: string;
  answer: string;
  answer_id: string;
  sentiment: string;
};

type RespuestasPorEncuesta = {
  [key: string]: {
    date: string;
    respuestas: Respuesta[];
  };
};

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "dd MMMM yyyy", { locale: es });
};
// Datos mockeados
const mockData = [
  {
    id: "e0ee4a0b-6600-4b2b-9544-4144a92a14d7",
    encuesta_id: "4637d5cf-1bc8-40ed-81fe-2ace5446c858",
    date: "2024-10-29T01:04:29.051Z",
    ip: "190.235.182.184",
    answers: [
      {
        id: "8f7c30a5-8438-47fe-84c3-f29eb702ea9a",
        response_id: "e0ee4a0b-6600-4b2b-9544-4144a92a14d7",
        question_id: "¿Cuál es su sabor de paleta favorito",
        answer: "fresa",
        sentiment: "Positivo",
      },
      {
        id: "8f7c30a5-8438-47fe-84c3-f29eb702ea9a",
        response_id: "e0ee4a0b-6600-4b2b-9544-4144a92a14d7",
        question_id: "¿Con qué frecuencia compra nuestras paletas?",
        answer: "Semanalmente",
        sentiment: "Positivo",
      },
       {
        id: "8f7c30a5-8438-47fe-84c3-f29eb702ea9a",
        response_id: "e0ee4a0b-6600-4b2b-9544-4144a92a14d7",
        question_id: "¿Recomendaría nuestras paletas? ",
        answer: "Tal vez",
        sentiment: "Neutro",
      }
    ],
  },
  {
    id: "86ddc46b-7582-407b-9169-5ee2c5589e91",
    encuesta_id: "4637d5cf-1bc8-40ed-81fe-2ace5446c858",
    date: "2024-10-29T01:05:01.718Z",
    ip: "190.235.182.184",
    answers: [
      {
        id: "b2228a9a-b124-4374-a3fd-55dcd34db0a0",
        response_id: "86ddc46b-7582-407b-9169-5ee2c5589e91",
        question_id: "¿Cuál es su sabor de paleta favorito",
        answer: "manzana",
        sentiment: "Negativo",
      },
    ],
  },
  {
    id: "93687f66-6da1-45dd-b56a-6fd87ba0045b",
    encuesta_id: "4637d5cf-1bc8-40ed-81fe-2ace5446c858",
    date: "2024-10-29T01:05:08.915Z",
    ip: "190.235.182.184",
    answers: [
      {
        id: "9d7edba0-a92c-4d0e-b077-8d0ba262b176",
        response_id: "93687f66-6da1-45dd-b56a-6fd87ba0045b",
        question_id: "873869ee-87f1-42f3-b8d9-4317f72f9ee8",
        answer: "fresa",
      },
    ],
  },
  {
    id: "1e297612-f1ea-4fad-8961-b7f265449ee8",
    encuesta_id: "4637d5cf-1bc8-40ed-81fe-2ace5446c858",
    date: "2024-10-29T01:05:37.457Z",
    ip: "190.235.182.184",
    answers: [
      {
        id: "20026c85-d215-4d95-8fcf-ca9589f0273f",
        response_id: "1e297612-f1ea-4fad-8961-b7f265449ee8",
        question_id: "873869ee-87f1-42f3-b8d9-4317f72f9ee8",
        answer: "manzana",
      },
    ],
  },
];
const encuestaMock: Encuesta = {
  id: "1",
  title: "Satisfacción del Cliente - Paletas Villaizan",
  description:
    "Esta encuesta tiene como objetivo evaluar la satisfacción de nuestros clientes con las paletas de frutas elaboradas por Villaizan.",
  status: "activo",
  start_date: "2024-06-01",
  end_date: "2024-08-31",
};

const respuestasMock: RespuestasPorEncuesta = {
  "Encuesta #1": {
    date: "2024-06-15",
    respuestas: [
      {
        survey_id: "1",
        question_id: "q1",
        question: "¿Cuál es su sabor de paleta favorito?",
        answer: "Ninguno",
        answer_id: "a1",
        sentiment: "Negativo",
      },
      {
        survey_id: "1",
        question_id: "q2",
        question: "¿Con qué frecuencia compra nuestras paletas?",
        answer: "Semanalmente",
        answer_id: "a2",
        sentiment: "Positivo",
      },
      {
        survey_id: "1",
        question_id: "q2",
        question:
          "¿Ha recomendado nuestras paletas a amigos o familiares? Si es así, ¿qué les dijo sobre ellas?",
        answer: "A veces",
        answer_id: "a2",
        sentiment: "Neutro",
      },
    ],
  },
  "Encuesta #2": {
    date: "2024-06-20",
    respuestas: [
      {
        survey_id: "1",
        question_id: "q1",
        question:
          "¿Ha recomendado nuestras paletas a amigos o familiares? Si es así, ¿qué les dijo sobre ellas?",
        answer:
          "Sí, les he recomendado las paletas, especialmente el sabor de mango. Les comenté que son muy refrescantes y perfectas para el calor.",
        answer_id: "a1",
        sentiment: "Positivo",
      },
      {
        survey_id: "1",
        question_id: "q2",
        question:
          "¿Qué mejoras sugeriría para nuestros productos o servicios para hacerlos más atractivos o convenientes para usted?",
        answer:
          "Creo que deberían agregar más sabores exóticos, como maracuyá o piña colada. Además, las paletas podrían tener menos azúcar para atraer a un público más amplio.",
        answer_id: "a2",
        sentiment: "Neutro",
      },
    ],
  },
};
type RespuestaAPI = {
  id: string;
  encuesta_id: string;
  date: string;
  ip: string;
  answers: {
    id: string;
    response_id: string;
    question_id: string;
    answer: string;
    sentiment?: string | "Neutro";
  }[];
};

function DetalleEncuesta({ id, encuesta }: EncuestaDetalleProps) {
  const sentimientoTexto = "Neutro";
  const [respuestas, setRespuestas] = useState<RespuestaAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRespuestas = async () => {
      try {
        setLoading(true);
        /*
        const response = await axios.get<RespuestaAPI[]>(
          `https://helado-villaizan.vercel.app/api/encuestas/resultado?id=${id}`
        ); */
         const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REDES_SOCIALES_SERVER_URL}/encuestas/resultado?id=${id}`
        );
        setRespuestas(response.data);
        console.log("Respuestas obtenidas:", response.data);
        setError(null);
      } catch (err) {
        setError("Error al obtener las respuestas de la encuesta.");
         setRespuestas(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchRespuestas();
  }, [id]);

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
        <span> ID: {id}</span>
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
          {respuestas.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {respuestas.map((respuesta, index) => (
                <AccordionItem value={`item-${respuesta.id}`} key={respuesta.id}>
                  <AccordionTrigger>
                    <div className="flex w-full items-center justify-between">
                      <span>
                        {"Encuesta # "}
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        Respondida: {formatDate(respuesta.date)}
                      </span>
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
                            <TableCell>{answer.question_id}</TableCell>
                            <TableCell>{answer.answer}</TableCell>
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
