// app/api/publicaciones/route.ts
import { NextResponse } from "next/server";
import { publicaciones } from "@web/src/app/data/publicaciones";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  const categorias = searchParams.getAll("categorias");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  // Filtrar publicaciones
  let filtered = publicaciones.filter((pub) => {
    const matchesSearch =
      pub.titulo.toLowerCase().includes(searchTerm) ||
      pub.slug.toLowerCase().includes(searchTerm) ||
      pub.etiquetas.some((et) => et.toLowerCase().includes(searchTerm));

    const matchesCategorias =
      categorias.length === 0 || categorias.every((cat) => pub.categorias.includes(cat));

    return matchesSearch && matchesCategorias;
  });

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const paginated = filtered.slice(offset, offset + limit);

  return NextResponse.json({
    data: paginated,
    meta: {
      total,
      totalPages,
      currentPage: page,
    },
  });
}
