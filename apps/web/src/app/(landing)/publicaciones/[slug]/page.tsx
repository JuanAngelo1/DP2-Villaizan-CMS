"use server";

import { Categoria, ControlledError, Response, VersionPublicacion } from "@web/types";
import axios from "axios";
import { Slash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb";
import { cn } from "@repo/ui/lib/utils";
import MaxWidthWrapper from "../../_components/MaxWidthWrapper";
import "./postStyles.css";

const blogContent = `
<h1><strong><em>¡Descubre Nuestra Nueva Colección de Sabores!</em></strong></h1>
<p>El verano está a la vuelta de la esquina y en <strong>Heladería Dulce Tentación</strong> estamos emocionados de presentar nuestra <strong>nueva colección de sabores</strong> que seguramente encantarán a todos nuestros clientes. Ven y disfruta de una experiencia única con nuestras deliciosas propuestas.</p>
<h1><strong>🌟 Nuevos Sabores Disponibles:</strong></h1>
<p><strong>Mango Tropical:</strong> Una explosión de frescura con el auténtico sabor del mango maduro.</p>
<p><strong>Chocolate Belga:</strong> Para los amantes del chocolate, un clásico enriquecido con cacao de alta calidad.</p>
<p><strong>Frutos del Bosque:</strong> Una mezcla vibrante de fresas, arándanos y frambuesas.</p>
<p><strong>Vainilla de Madagascar:</strong> Suave y aromático, perfecto para acompañar cualquier topping.</p>
<h1><strong>🎉 Promociones Especiales de Lanzamiento:</strong></h1>
<p>Durante el mes de lanzamiento, disfruta de las siguientes promociones:</p>
<p><strong>2x1 en conos seleccionados:</strong> Elige cualquier dos conos de nuestros nuevos sabores y paga solo uno.</p>
<p><strong>Tarjeta Fidelidad:</strong> Por cada compra, acumula puntos que podrás canjear por descuentos y productos gratis.</p>
<p><strong>Sorteo Semanal:</strong> Participa automáticamente en nuestro sorteo de una cesta de productos exclusivos cada semana.</p>
<h1><strong>📅 Próximos Eventos en la Heladería:</strong></h1>
<p><strong>Taller de Creación de Sabores:</strong> El próximo 15 de noviembre, únete a nuestro taller donde podrás crear tu propio sabor de helado.</p>
<p><strong>Noche de Degustación:</strong> El 25 de noviembre, te invitamos a una velada especial para probar todos nuestros nuevos sabores junto a música en vivo.</p>
<h1><strong>📍 Visítanos:</strong></h1>
<p>Nos encontramos en <strong>Calle Principal 123, Ciudad</strong>, de lunes a domingo de 12:00 PM a 10:00 PM. También puedes realizar pedidos en línea a través de nuestra página web <a target="_blank" rel="noopener noreferrer nofollow" href="http://www.dulcetentacion.com">www.dulcetentacion.com</a>.</p>
`;

function getHeadingContents(htmlString: string): string[] {
  const headingTags = ["h1", "h2", "h3"];

  for (const tag of headingTags) {
    const regex = new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, "gi");
    const matches = Array.from(htmlString.matchAll(regex), (match) => {
      const rawText = match[1].replace(/<[^>]*>/g, "").trim();
      return rawText;
    });

    if (matches.length > 0) {
      return matches;
    }
  }

  return [];
}

async function fetchPublicationData(slug: string) {
  try {
    const response: Response<VersionPublicacion> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/slug/${slug}`
    );
    console.log("Publicacion data -> ", response.data.result);

    if(response.data.status !== "Success") throw new Error(response.data.message);

    return response.data.result;
  } catch (error) {
    console.log("Error fetching publication data -> ", error);
    return null;
  }
}

export default async function PublicacionPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  const publicacion = await fetchPublicationData(slug);

  if (!publicacion) throw new Error("Publicación no encontrada");

  const headings = getHeadingContents(publicacion?.richtext || "");

  return (
    <div>
      {publicacion.urlimagen && (
        <div className="flex h-[40vh] min-h-[300px] w-full justify-center bg-[#fff1f2]">
          <MaxWidthWrapper className="relative">
            <PublicationBreadcrumb publicacion={publicacion} className="mt-8" />
            <div className="absolute bottom-[-70px] left-4 right-4 top-[70px] overflow-hidden rounded-xl">
              <Image
                src={publicacion.urlimagen}
                height={100}
                width={100}
                alt="Post Cover Image"
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          </MaxWidthWrapper>
        </div>
      )}

      <MaxWidthWrapper
        className={cn("pb-16 pt-4 font-['Abhaya_Libre']", publicacion.urlimagen ? "mt-[75px]" : "mt-[40px]")}
      >
        {!publicacion.urlimagen && <PublicationBreadcrumb publicacion={publicacion} className="" />}
        <div className={cn("flex flex-row gap-10", !publicacion.urlimagen && "pt-4")}>
          <ContentTable headings={headings} />

          <section className="flex flex-col">
            <CategoryDisplay categories={publicacion.categorias} />
            <p className="text-5xl font-semibold">{publicacion.titulo}</p>
            <p className="italic">Fecha de publicación: 24 de octubre de 2024</p>
            <div
              className="mt-4 flex flex-col gap-2"
              dangerouslySetInnerHTML={{ __html: publicacion.richtext || "" }}
            />
          </section>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

function PublicationBreadcrumb({
  publicacion,
  className,
}: {
  publicacion: VersionPublicacion;
  className: string;
}) {
  return (
    <Breadcrumb className={cn("font-['Abhaya_Libre']", className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="text-base">
              Inicio
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/publicaciones" className="text-base">
              Publicaciones
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-base">{publicacion.titulo}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function ContentTable({ headings }: { headings: string[] }) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <section className="sticky top-[100px] h-fit w-[320px] min-w-[320px]">
      <p className="text-2xl">Contenido</p>
      <div className="mt-1 flex flex-col gap-3 border-l border-gray-300 px-3">
        {headings.map((heading, index) => {
          return (
            <p key={index} className="cursor-pointer truncate text-base hover:underline">
              {heading}
            </p>
          );
        })}
      </div>
    </section>
  );
}

function CategoryDisplay({ categories, className }: { categories: Categoria[]; className?: string }) {
  return (
    <div className={cn("flex flex-row items-center gap-2", className)}>
      {categories.map((category, idx) => {
        if (idx === categories.length - 1) {
          return (
            <Link key={idx} className="cursor-pointer hover:underline" href={`/publicaciones?categoria=${category.id}`}>
              {category.nombre}
            </Link>
          );
        }

        return (
          <Fragment key={idx}>
            <Link className="cursor-pointer hover:underline" href={`/publicaciones?categoria=${category.id}`}>
              {category.nombre}
            </Link>
            <p>|</p>
          </Fragment>
        );
      })}
    </div>
  );
}
