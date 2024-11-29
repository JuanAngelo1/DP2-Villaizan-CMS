"use client";

import { Label, Pie, PieChart } from "recharts";
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

interface SentimentPieChartProps {
  dateRange: { start: Date | null; end: Date | null };
  selectedProduct: string;
}

// Datos iniciales con productos y sentimientos
const chartData = [
  { name: "Bueno", value: 15, producto: "Paleta de Chocolate" },
  { name: "Neutro", value: 5, producto: "Paleta de Chocolate" },
  { name: "Malo", value: 7, producto: "Paleta de Chocolate" },
  { name: "Bueno", value: 10, producto: "Cono" },
  { name: "Neutro", value: 50, producto: "Cono" },
  { name: "Malo", value: 3, producto: "Cono" },
];

// Configuración de colores consistentes
const chartConfig = {
  bueno: { label: "Bueno", color: "#4CAF50" }, // Verde para "Bueno"
  neutro: { label: "Neutro", color: "#FFC107" }, // Amarillo para "Neutro"
  malo: { label: "Malo", color: "#F44336" }, // Rojo para "Malo"
} satisfies ChartConfig;

export default function SentimentPieChart({ dateRange, selectedProduct }: SentimentPieChartProps) {
  const filteredData = chartData
    .filter((data) => data.producto === selectedProduct)
    .map((data) => ({
      ...data,
      fill: chartConfig[data.name.toLowerCase() as keyof ChartConfig].color,
    }));

  const totalComments = filteredData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribución de Sentimientos</CardTitle>
        <CardDescription>{selectedProduct}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={filteredData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalComments.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
                          Comentarios Totales
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-sm">
        Total de comentarios para { selectedProduct} en el período seleccionado.
      </CardFooter>
    </Card>
  );
}
