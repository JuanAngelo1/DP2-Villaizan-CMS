"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";

const getFontSize = (frequency: number): number => {
  const minFontSize = 14;
  const maxFontSize = 40;
  return Math.min(maxFontSize, minFontSize + frequency * 1.5);
};

const getColor = (frequency: number): string => {
  if (frequency > 15) return "#1E88E5"; // Azul brillante
  if (frequency > 12) return "#D32F2F"; // Rojo oscuro
  if (frequency > 9) return "#388E3C"; // Verde oscuro
  if (frequency > 7) return "#FBC02D"; // Amarillo
  if (frequency > 5) return "#8E24AA"; // Púrpura
  if (frequency > 3) return "#039BE5"; // Azul claro
  return "#F57C00"; // Naranja
};
interface StaticWordCloudProps {
  wordsData: Record<string, number>; // Aceptamos un diccionario de palabras y frecuencias
}
const StaticWordCloud: React.FC<StaticWordCloudProps> = ({ wordsData }) => {
  const wordDataArray = Object.keys(wordsData).map((key) => ({
    text: key,
    frequency: wordsData[key],
  }));

  // Ordenar las palabras por frecuencia de forma descendente y tomar las primeras 15
  const topWords = wordDataArray.sort((a, b) => b.frequency - a.frequency).slice(0, 15); // Solo las 15 más frecuentes
  return (
    <Card className="flex flex-col rounded-lg bg-gradient-to-r from-white to-gray-100 p-4 shadow-lg">
      <CardHeader className="items-center pb-4">
        <CardTitle className="text-lg font-semibold text-gray-700">Nube de Palabras</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Palabras más comunes en los comentarios
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-3 p-4">
          {topWords.map((word, index) => (
            <span
              key={index}
              style={{
                fontSize: `${getFontSize(word.frequency)}px`,
                color: getColor(word.frequency),
                fontWeight: word.frequency > 15 ? "bold" : "normal",
                position: "relative",
              }}
              className="group transform cursor-pointer transition duration-300 ease-in-out hover:scale-110"
            >
              {word.text}
              <span className="absolute bottom-full mb-1 hidden items-center justify-center rounded bg-black p-1 text-xs text-white group-hover:flex">
                Usado {word.frequency} veces
              </span>
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StaticWordCloud;
