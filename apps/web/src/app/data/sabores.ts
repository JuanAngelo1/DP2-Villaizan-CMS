// app/data/saboresData.ts

export interface Sabor {
  id: number;
  name: string;
  image: string; // Ruta relativa a la carpeta pública, e.g., "/sabores/amigoberenjena.png"
  description: string;
}

export const sabores: Sabor[] = [
  {
    id: 1,
    name: "Amigo Berenjena",
    image: "/sabores/amigoberenjena.png",
    description: "Este sabor combina notas de berenjena con especias exóticas para un gusto único.",
  },
  {
    id: 2,
    name: "Maracumango",
    image: "/sabores/maracumango.png",
    description: "Un equilibrio perfecto entre dulzura y acidez que deleita el paladar.",
  },
  {
    id: 3,
    name: "El Pinoñón",
    image: "/sabores/elpinon.png",
    description: "Un sabor robusto con toques de pino que evocan la frescura del bosque.",
  },
  {
    id: 4,
    name: "Mr. Manzana",
    image: "/sabores/mrmanzana.png",
    description: "La clásica manzana reinventada con un giro moderno y vibrante.",
  },
  {
    id: 5,
    name: "Niño Zanahoria",
    image: "/sabores/ninozanahoria.png",
    description: "Un sabor dulce y nutritivo que recuerda a la infancia y la frescura de las zanahorias.",
  },
  {
    id: 6,
    name: "Señor Pera",
    image: "/sabores/senorpera.png",
    description: "La suavidad y dulzura de la pera se combinan para crear una experiencia sublime.",
  },
];