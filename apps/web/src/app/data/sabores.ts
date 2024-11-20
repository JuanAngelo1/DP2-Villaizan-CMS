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
    name: "Maracumango",
    image: "/sabores/maracumango.png",
    description: "Un equilibrio perfecto entre dulzura y acidez que deleita el paladar.",
  },
  {
    id: 2,
    name: "El Pinoñón",
    image: "/sabores/elpinon.png",
    description: "Un sabor robusto con toques de pino que evocan la frescura del bosque.",
  },
  {
    id: 3,
    name: "La Banana",
    image: "/sabores/labanana.png",
    description: "La suavidad y dulzura de la pera se combinan para crear una experiencia sublime.",
  },
  {
    id: 4,
    name: "Mr. Manzana",
    image: "/sabores/mrmanzana.png",
    description: "La clásica manzana reinventada con un giro moderno y vibrante.",
  },
  {
    id: 5,
    name: "San Sandía",
    image: "/sabores/sansandia.png",
    description: "Este sabor combina notas de berenjena con especias exóticas para un gusto único.",
  },
  {
    id: 6,
    name: "Niño Zanahoria",
    image: "/sabores/ninozanahoria.png",
    description: "Este sabor combina notas de berenjena con especias exóticas para un gusto único.",
  },
  {
    id: 7,
    name: "Señor Pera",
    image: "/sabores/senorpera.png",
    description: "Este sabor combina notas de berenjena con especias exóticas para un gusto único.",
  },
  {
    id: 8,
    name: "El uvas",
    image: "/sabores/eluvas.png",
    description: "Este sabor combina notas de berenjena con especias exóticas para un gusto único.",
  },
  {
    id: 9,
    name: "Paltoso",
    image: "/sabores/paltoso.png",
    description: "Este sabor combina notas de berenjena con especias exóticas para un gusto único.",
  },
  {
    id: 10,
    name: "Kiwiwi",
    image: "/sabores/kiwi.png",
    description: "Este sabor combina notas de berenjena con especias exóticas para un gusto único.",
  },
];
