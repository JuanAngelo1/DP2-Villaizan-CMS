// app/api/publicaciones/[id]/route.ts
import { NextResponse } from "next/server";
import { publicaciones } from "@web/src/app/data/publicaciones";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const pub = publicaciones.find((p) => p.id === parseInt(id, 10));

  if (!pub) {
    return NextResponse.json({ error: "Publicación no encontrada" }, { status: 404 });
  }

  return NextResponse.json(pub);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();

  const pubIndex = publicaciones.findIndex((p) => p.id === parseInt(id, 10));

  if (pubIndex === -1) {
    return NextResponse.json({ error: "Publicación no encontrada" }, { status: 404 });
  }

  publicaciones[pubIndex] = { ...publicaciones[pubIndex], ...body };

  return NextResponse.json({ message: "Publicación actualizada exitosamente" });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const pubIndex = publicaciones.findIndex((p) => p.id === parseInt(id, 10));

  if (pubIndex === -1) {
    return NextResponse.json({ error: "Publicación no encontrada" }, { status: 404 });
  }

  publicaciones.splice(pubIndex, 1);

  return NextResponse.json({ message: "Publicación eliminada exitosamente" });
}