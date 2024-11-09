"use client";
import { useState } from "react";
import DateFilter from "./_components/DateFilter";
import ProductSelector from "./_components/ProductSelector";
import SentimentLineChart from "./_components/SentimentLineChart";
import StatsCard from "./_components/StatsCard";
import SentimentPieChart from "./_components/SentimentPieChart";
import StaticWordCloud from "./_components/StaticWordCloud";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs";

interface DateRange {
  start: Date | null;
  end: Date | null;
}

const DashboardSentimientos = () => {
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [selectedProduct, setSelectedProduct] = useState<string>("Paleta de Chocolate");

  return (
    <div className="p-6 space-y-6 w-full">
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
              <div className="bg-gray-100 p-4 rounded-lg">
                <DateFilter dateRange={dateRange} setDateRange={setDateRange} />
                <ProductSelector selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
              </div>
              
              <div className="space-y-4">
                <StatsCard title="Encuestas respondidas" value="252" />
                <StatsCard title="Comentarios recibidos" value="112901" />
                <StatsCard title="Satisfacción general" value="55%" />
              </div>
            </div>
            
            <div className="col-span-3 space-y-2">
              <div className="bg-blue-100 p-4 rounded-lg max-h-[40vh] flex justify-center items-center">
                <div className="w-full h-full scale-[calc(100%)]">
                  <SentimentLineChart dateRange={dateRange} selectedProduct={selectedProduct} />
                </div>
              </div>

              {/* Gráfico de Sectores y Nube de palabras más usadas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <SentimentPieChart dateRange={dateRange} selectedProduct={selectedProduct} />
                </div>
                <div className="bg-blue-100 p-4 rounded-lg flex items-center justify-center">
                  <StaticWordCloud />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="comentarios" >
          {/* Contenido para la pestaña de Comentarios */}
          <div className="p-4 bg-gray-100 rounded-lg w-full min-w-full">
            <h2 className="text-lg font-bold">Comentarios</h2>
            <p>Contenido para coemntarios</p>
          </div>
        </TabsContent>

         <TabsContent value="encuestas">
          {/* Contenido para la pestaña de Encuestas */}
          <div className="p-4 w-full bg-gray-100 rounded-lg">
            <h2 className="text-lg font-bold">Encuestas</h2>
            <p>Contenido para encuestas</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSentimientos;
