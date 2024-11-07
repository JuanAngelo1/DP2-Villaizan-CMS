"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/chart";

interface SentimentLineChartProps {
  dateRange: { start: Date | null; end: Date | null };
  selectedProduct: string;
}

// Mapeo de nombres de meses a índices numéricos
const monthToIndex = {
  "Enero": 0, "Febrero": 1, "Marzo": 2, "Abril": 3,
  "Mayo": 4, "Junio": 5, "Julio": 6, "Agosto": 7,
  "Septiembre": 8, "Octubre": 9, "Noviembre": 10, "Diciembre": 11,
};

// Datos del gráfico
const chartData = [
  { month: "Enero", bueno: 186, neutro: 80, malo: 50, producto: "Paleta de Chocolate" },
  { month: "Febrero", bueno: 305, neutro: 200, malo: 70, producto: "Paleta de Chocolate" },
  { month: "Marzo", bueno: 250, neutro: 150, malo: 85, producto: "Paleta de Chocolate" },
  { month: "Abril", bueno: 195, neutro: 130, malo: 60, producto: "Paleta de Chocolate" },
  { month: "Mayo", bueno: 209, neutro: 130, malo: 55, producto: "Paleta de Chocolate" },
  { month: "Junio", bueno: 290, neutro: 160, malo: 80, producto: "Paleta de Chocolate" },
  { month: "Julio", bueno: 320, neutro: 210, malo: 100, producto: "Paleta de Chocolate" },
  { month: "Agosto", bueno: 285, neutro: 170, malo: 90, producto: "Paleta de Chocolate" },
  { month: "Septiembre", bueno: 330, neutro: 190, malo: 75, producto: "Paleta de Chocolate" },
  { month: "Octubre", bueno: 340, neutro: 210, malo: 90, producto: "Paleta de Chocolate" },
  { month: "Noviembre", bueno: 360, neutro: 220, malo: 100, producto: "Paleta de Chocolate" },
  { month: "Diciembre", bueno: 390, neutro: 240, malo: 110, producto: "Paleta de Chocolate" },

  { month: "Enero", bueno: 800, neutro: 120, malo: 65, producto: "Cono" },
  { month: "Febrero", bueno: 500, neutro: 120, malo: 65, producto: "Cono" },
  { month: "Marzo", bueno: 237, neutro: 120, malo: 65, producto: "Cono" },
  { month: "Abril", bueno: 73, neutro: 190, malo: 40, producto: "Cono" },
  { month: "Mayo", bueno: 214, neutro: 140, malo: 60, producto: "Cono" },
  { month: "Junio", bueno: 275, neutro: 155, malo: 75, producto: "Cono" },
  { month: "Julio", bueno: 320, neutro: 170, malo: 85, producto: "Cono" },
  { month: "Agosto", bueno: 300, neutro: 160, malo: 70, producto: "Cono" },
  { month: "Septiembre", bueno: 350, neutro: 180, malo: 80, producto: "Cono" },
  { month: "Octubre", bueno: 360, neutro: 190, malo: 85, producto: "Cono" },
  { month: "Noviembre", bueno: 400, neutro: 200, malo: 95, producto: "Cono" },
  { month: "Diciembre", bueno: 420, neutro: 210, malo: 105, producto: "Cono" },
];

// Configuración de los colores para cada tipo de sentimiento
const chartConfig = {
  bueno: { label: "Bueno", color: "#4CAF50" },
  neutro: { label: "Neutro", color: "#FFC107" },
  malo: { label: "Malo", color: "#F44336" },
} satisfies ChartConfig;

export default function SentimentLineChart({ dateRange, selectedProduct }: SentimentLineChartProps) {
  const filteredData = chartData.filter((data) => {
    const monthIndex = monthToIndex[data.month];
    const startMonth = dateRange.start ? dateRange.start.getMonth() : null;
    const endMonth = dateRange.end ? dateRange.end.getMonth() : null;
    return (
      data.producto === selectedProduct &&
      (startMonth === null || monthIndex >= startMonth) &&
      (endMonth === null || monthIndex <= endMonth)
    );
  });


  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolución de Sentimientos</CardTitle>
        <CardDescription>Sentimientos para {selectedProduct}</CardDescription>
      </CardHeader>
      <CardContent className="h-[25vh] max-h-[20vh] border-solid ">
        <ChartContainer config={chartConfig} className="h-full w-full border-2 ">
          <ResponsiveContainer>
            <AreaChart data={filteredData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis allowDecimals={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Area 
                dataKey="bueno" 
                type="natural" 
                fill={chartConfig.bueno.color} 
                stroke={chartConfig.bueno.color} 
                fillOpacity={0.6} 
              />
              <Area 
                dataKey="neutro" 
                type="natural" 
                fill={chartConfig.neutro.color} 
                stroke={chartConfig.neutro.color} 
                fillOpacity={0.6} 
              />
              <Area 
                dataKey="malo" 
                type="natural" 
                fill={chartConfig.malo.color} 
                stroke={chartConfig.malo.color} 
                fillOpacity={0.6} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex items-start gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Crecimiento de 5.2% en este mes <TrendingUp className="h-4 w-4" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
