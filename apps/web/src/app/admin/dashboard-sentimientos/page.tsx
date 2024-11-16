"use client";

import { ControlledError, Response } from "@web/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import { toast } from "@repo/ui/hooks/use-toast";
import Comentarios from "./_components/Comentarios";
import DateFilter from "./_components/DateFilter";
import Encuestas from "./_components/Encuestas";
import ProductSelector from "./_components/ProductSelector";
import SentimentLineChart from "./_components/SentimentLineChart";
import SentimentPieChart from "./_components/SentimentPieChart";
import StaticWordCloud from "./_components/StaticWordCloud";
import StatsCard from "./_components/StatsCard";

interface DateRange {
  start: Date | null;
  end: Date | null;
}

const DashboardSentimientos = () => {
  const [dateRange, setDateRange] = useState<DateRange>({ start: new Date(), end: new Date() });
  const [selectedProduct, setSelectedProduct] = useState<string>("Paleta de Chocolate");
  const [commentsCounter, setCommentsCounter] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const responseCommentsCounter: Response<number> = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/comentario/contarEntreFechas`,
          { start: dateRange.start, end: dateRange.end }
        );

        if (responseCommentsCounter.data.status === "Error")
          throw new ControlledError(responseCommentsCounter.data.message);
        setCommentsCounter(responseCommentsCounter.data.result);
      } catch (error) {
        if (error instanceof ControlledError) {
          toast({ title: "Error al obtener obtener información del dashboard", description: error.message });
        } else {
          console.error("Error al obtener obtener información del dashboard", error);
          toast({
            title: "Ups! Algo salió mal.",
            description: "Error al obtener obtener información del dashboard",
          });
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="w-full space-y-6 p-6">
      <h1 className="text-2xl font-bold">Dashboard de Análisis de Sentimientos</h1>

      <Tabs defaultValue="resumen" className="min-w-full">
        <TabsList className="flex space-x-2">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="comentarios">Comentarios</TabsTrigger>
          <TabsTrigger value="encuestas">Encuestas</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 space-y-4">
              {/* Filtros */}
              <div className="rounded-lg bg-gray-100 p-4">
                <DateFilter dateRange={dateRange} setDateRange={setDateRange} />
                <ProductSelector selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
              </div>

              <div className="space-y-4">
                <StatsCard title="Encuestas respondidas" value="252" />
                <StatsCard title="Comentarios recibidos" value={commentsCounter.toString()} />
                <StatsCard title="Satisfacción general" value="55%" />
              </div>
            </div>

            <div className="col-span-3 space-y-2">
              <div className="flex max-h-[40vh] items-center justify-center rounded-lg bg-blue-100 p-4">
                <div className="h-full w-full scale-[calc(100%)]">
                  <SentimentLineChart dateRange={dateRange} selectedProduct={selectedProduct} />
                </div>
              </div>

              {/* Gráfico de Sectores y Nube de palabras más usadas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-blue-100 p-4">
                  <SentimentPieChart dateRange={dateRange} selectedProduct={selectedProduct} />
                </div>
                <div className="flex items-center justify-center rounded-lg bg-blue-100 p-4">
                  <StaticWordCloud />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="comentarios">
          {/* Contenido para la pestaña de Comentarios */}
          <div className="w-full min-w-full rounded-lg bg-gray-100 p-4">
            <Comentarios />
          </div>
        </TabsContent>

        <TabsContent value="encuestas">
          {/* Contenido para la pestaña de Encuestas */}
          <div className="w-full rounded-lg bg-gray-100 p-4">
            <Encuestas />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSentimientos;
