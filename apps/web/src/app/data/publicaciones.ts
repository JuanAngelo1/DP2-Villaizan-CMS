export interface Publicacion {
  id: number;
  titulo: string;
  slug: string;
  descripcion: string;
  imagen: string;
  autor: string;
  fecha: string;
  categorias: string[];
  etiquetas: string[];
}

export const publicaciones: Publicacion[] = [
  {
    id: 1,
    titulo: "Nuevo Sabor de Temporada",
    slug: "nuevo-sabor-temporada",
    descripcion: "Descubre nuestro nuevo sabor de temporada que está conquistando corazones.",
    imagen: "/images/publicaciones/sabor-temporada.jpg",
    autor: "Juan Pérez",
    fecha: "2024-09-15",
    categorias: ["Sabor", "Temporada"],
    etiquetas: ["aguaymanto", "nueva", "temporada"],
  },
  {
    id: 2,
    titulo: "Helados Artesanales",
    slug: "helados-artesanales",
    descripcion: "Conoce el proceso artesanal detrás de nuestros deliciosos helados.",
    imagen: "/images/publicaciones/artesanales.jpg",
    autor: "María López",
    fecha: "2024-08-20",
    categorias: ["Producción", "Artesanal"],
    etiquetas: ["hecho a mano", "calidad"],
  },
  {
    id: 3,
    titulo: "Nuestros Productos",
    slug: "nuestros-productos",
    descripcion: "Descubre la variedad de productos que tenemos para ti.",
    imagen: "/images/publicaciones/productos.jpg",
    autor: "Carlos García",
    fecha: "2024-07-10",
    categorias: ["Productos", "Variedad"],
    etiquetas: ["diversidad", "calidad"],
  },
  {
    id: 4,
    titulo: "Nuestras Sucursales",
    slug: "nuestras-sucursales",
    descripcion: "Conoce nuestras sucursales y visítanos en la más cercana.",
    imagen: "/images/publicaciones/sucursales.jpg",
    autor: "Ana Martínez",
    fecha: "2024-06-05",
    categorias: ["Ubicación", "Sucursales"],
    etiquetas: ["visítanos", "ubicación"],
  },
];