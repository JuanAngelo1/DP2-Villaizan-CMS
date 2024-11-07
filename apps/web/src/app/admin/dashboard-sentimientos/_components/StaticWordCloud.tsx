"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";

interface WordData {
  text: string;
  frequency: number;
}

// Datos de palabras y frecuencias
const wordsData: WordData[] = [
  { text: "paleta", frequency: 20 },
  { text: "chocolate", frequency: 15 },
  { text: "delicioso", frequency: 10 },
  { text: "cono", frequency: 8 },
  { text: "dulce", frequency: 7 },
  { text: "sabroso", frequency: 5 },
  { text: "satisfactorio", frequency: 4 },
  { text: "calidad", frequency: 3 },
  { text: "servicio", frequency: 2 },
  { text: "excelente", frequency: 2 },
];

const getFontSize = (frequency: number): number => {
  const minFontSize = 14;
  const maxFontSize = 40;
  return Math.min(maxFontSize, minFontSize + frequency * 1.5);
};

const getColor = (frequency: number): string => {
  if (frequency > 15) return "#1E88E5"; // Azul brillante
  if (frequency > 12) return "#D32F2F"; // Rojo oscuro
  if (frequency > 9) return "#388E3C";  // Verde oscuro
  if (frequency > 7) return "#FBC02D";  // Amarillo
  if (frequency > 5) return "#8E24AA";  // Púrpura
  if (frequency > 3) return "#039BE5";  // Azul claro
  return "#F57C00";                    // Naranja
};

const StaticWordCloud: React.FC = () => {
  return (
    <Card className="flex flex-col bg-gradient-to-r from-white to-gray-100 shadow-lg p-4 rounded-lg">
      <CardHeader className="items-center pb-4">
        <CardTitle className="text-lg font-semibold text-gray-700">Nube de Palabras</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Palabras más comunes en los comentarios
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex justify-center items-center">
        <div className="flex flex-wrap gap-3 justify-center items-center p-4">
          {wordsData.map((word, index) => (
            <span
              key={index}
              style={{
                fontSize: `${getFontSize(word.frequency)}px`,
                color: getColor(word.frequency),
                fontWeight: word.frequency > 15 ? "bold" : "normal",
                position: "relative",
              }}
              className="transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer group"
            >
              {word.text}
              <span className="absolute bottom-full mb-1 hidden group-hover:flex justify-center items-center bg-black text-white text-xs p-1 rounded">
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
