"use server";

import { Metadata } from 'next';
import { auth } from "@web/auth";
import { Categoria, Comentario, Response, VersionPublicacion, Etiqueta } from "@web/types";
import { formatDDMMAAAA_HHSS, formatDate } from "@web/utils/date";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
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
import CommentBox from "./_components/CommentBox";
import FacebookLogo from "./_components/FacebookLogo";
import WhatsappLogo from "./_components/WhatsappLogo";
import LinkedinLogo from "./_components/LinkedinLogo";
import XLogo from "./_components/XLogo";
import "./postStyles.css";

// Definición de las URLs de compartir en redes sociales
const share_urls = [
  {
    name: "facebook",
    logo: FacebookLogo,
    href: "https://www.facebook.com/share.php?u=",
  },
  {
    name: "x",
    logo: XLogo,
    href: "https://twitter.com/intent/tweet?url=",
  },
  {
    name: "linkedin",
    logo: LinkedinLogo,
    href: "https://www.linkedin.com/shareArticle?url=",
  },
  {
    name: "whatsapp",
    logo: WhatsappLogo,
    href: "https://wa.me/?text=",
  },
];

// Interfaz para los parámetros de la página
interface PublicacionPageProps {
  params: {
    slug: string;
  };
}

// Función para obtener los datos de la publicación
async function fetchPublicationData(slug: string): Promise<VersionPublicacion | null> {
  try {
    const response: Response<VersionPublicacion> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/publicaciones/slug/${slug}`
    );

    console.log("Datos de la publicación -> ", response.data.result);

    if (response.data.status !== "Success") throw new Error(response.data.message);

    return response.data.result;
  } catch (error) {
    console.error("Error al obtener los datos de la publicación -> ", error);
    return null;
  }
}

// Función para extraer encabezados del contenido richtext
function getHeadingContents(htmlString: string): string[] {
  const headingTags = ["h1", "h2", "h3"];
  const headings: string[] = [];

  headingTags.forEach((tag) => {
    const regex = new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, "gi");
    let match;
    while ((match = regex.exec(htmlString)) !== null) {
      const rawText = match[1].replace(/<[^>]*>/g, "").trim();
      if (rawText) headings.push(rawText);
    }
  });

  return headings;
}

// Exportación de la función generateMetadata para metadatos dinámicos
export async function generateMetadata({ params }: PublicacionPageProps): Promise<Metadata> {
  const { slug } = params;
  const publicacion = await fetchPublicationData(slug);

  if (!publicacion) {
    return {
      title: 'Publicación no encontrada',
      description: 'La publicación que buscas no existe.',
      openGraph: {
        title: 'Publicación no encontrada',
        description: 'La publicación que buscas no existe.',
        url: `${process.env.NEXT_PUBLIC_APP_URL}/publicaciones/${slug}`,
      },
      twitter: {
        card: 'summary',
        title: 'Publicación no encontrada',
        description: 'La publicación que buscas no existe.',
      },
    };
  }

  return {
    title: publicacion.titulo,
    description: publicacion.descripcion || 'Descripción de la publicación.',
    openGraph: {
      title: publicacion.titulo,
      description: publicacion.descripcion || 'Descripción de la publicación.',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/publicaciones/${slug}`,
      images: publicacion.urlimagen
        ? [
            {
              url: publicacion.urlimagen,
              alt: publicacion.titulo,
            },
          ]
        : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: publicacion.titulo,
      description: publicacion.descripcion || 'Descripción de la publicación.',
      images: publicacion.urlimagen ? [`${publicacion.urlimagen}`] : [],
    },
  };
}

// Componente principal de la página de publicación
export default async function PublicacionPage({ params }: PublicacionPageProps) {
  const session = await auth();
  const user = session?.user;

  const { slug } = params;

  const publicacion = await fetchPublicationData(slug);
  if (!publicacion) throw new Error("Publicación no encontrada");

  const headings = getHeadingContents(publicacion.richtext || "");

  return (
    <div>
      {publicacion.urlimagen && (
        <div className="flex h-[40vh] min-h-[300px] w-full justify-center bg-[#fff1f2]">
          <MaxWidthWrapper className="relative">
            <PublicationBreadcrumb publicacion={publicacion} className="mt-8" />
            <div className="absolute bottom-[-70px] left-4 right-4 top-[70px] overflow-hidden rounded-xl">
              <Image
                src={publicacion.urlimagen}
                width={1000}
                height={1000}
                alt="Imagen de portada de la publicación"
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          </MaxWidthWrapper>
        </div>
      )}

      <MaxWidthWrapper
        className={cn(
          "pb-16 pt-4 font-['Abhaya_Libre']",
          publicacion.urlimagen ? "mt-[85px]" : "mt-[40px]"
        )}
      >
        {!publicacion.urlimagen && <PublicationBreadcrumb publicacion={publicacion} className="" />}
        <div className={cn("flex flex-row gap-10", !publicacion.urlimagen && "pt-4")}>
          <ContentTable headings={headings} />

          <section className="flex flex-1 flex-col">
            <p className="italic leading-[15px]">
              Fecha de publicación: {formatDDMMAAAA_HHSS(publicacion.fechapublicacion || undefined)}
            </p>
            <p className="text-5xl font-semibold">{publicacion.titulo}</p>
            <CategoryDisplay categories={publicacion.categorias} tags={publicacion.etiquetas} />
            <div
              className="mt-4 flex flex-col gap-2"
              dangerouslySetInnerHTML={{ __html: publicacion.richtext || "" }}
            />

            <section className="border-b-muted-foreground border-t-muted-foreground mt-8 flex h-fit w-full flex-row items-center justify-between border-b border-t py-4">
              <p className="text-xl font-semibold">
                <span className="w-10 text-red-700">{publicacion.comentarios?.length}</span> comentario (s)
              </p>

              <div className="flex items-center gap-4">
                {share_urls.map((share_url, idx) => {
                  const Logo = share_url.logo;
                  return (
                    <Logo
                      className="cursor-pointer transition-colors hover:fill-red-800"
                      href={`${share_url.href}${encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/publicaciones/${slug}`)}`}
                    />
                  );
                })}
              </div>
            </section>

            {user ? (
              <CommentBox user={user} publicacion={publicacion} />
            ) : (
              <Link
                href={`/login?callbackUrl=/publicaciones/${slug}`}
                className="mt-5 flex w-full rounded-lg bg-red-100 p-3"
              >
                <p className="mx-auto cursor-pointer text-lg hover:underline">Inicia sesión para comentar</p>
              </Link>
            )}

            <div className="mt-5 flex flex-col gap-3 pl-4">
              {publicacion.comentarios?.map((comentario, idx) => {
                return <CommentDisplay comentario={comentario} key={idx} />;
              })}
            </div>
          </section>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

function CommentDisplay({ comentario }: { comentario: Comentario }) {
  return (
    <section className="relative flex w-full flex-col rounded-lg border">
      <div className="bg-muted flex flex-row items-center gap-2 p-2 pl-[30px]">
        <img
          src={comentario.vi_usuario?.imagenperfil || "/default-profile.png"}
          className="absolute -left-4 -top-[1px] h-10 w-10 rounded-full"
        />
        <p className="">
          <span className="font-semibold">{comentario.vi_usuario?.nombre || "Usuario"}</span>
          <span className="text-muted-foreground"> comentó el {formatDate(comentario.fechacreacion)}</span>
        </p>
      </div>
      <div className="px-4 py-3">{comentario.comentario}</div>
    </section>
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

function CategoryDisplay({
  categories,
  tags,
  className,
}: {
  categories: Categoria[];
  tags: Etiqueta[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-row items-center gap-1", className)}>
      {categories.map((category, idx) => {
        if (idx === categories.length - 1) {
          return (
            <Link
              key={category.id}
              className="cursor-pointer hover:underline"
              href={`/publicaciones?categoria=${category.id}`}
            >
              {category.nombre}
            </Link>
          );
        }

        return (
          <Fragment key={category.id}>
            <Link className="cursor-pointer hover:underline" href={`/publicaciones?categoria=${category.id}`}>
              {category.nombre}
            </Link>
            <p>,</p>
          </Fragment>
        );
      })}
      <p className="mx-2"> | </p>
      {tags.map((tag, idx) => {
        if (idx === tags.length - 1) {
          return (
            <p
              key={tag.id}
              className="rounded-md px-2 py-0"
              style={{ backgroundColor: tag.colorfondo, color: tag.colortexto }}
            >
              {tag.nombre}
            </p>
          );
        }

        return (
          <Fragment key={tag.id}>
            <p
              className="rounded-md px-2 py-0"
              style={{ backgroundColor: tag.colorfondo, color: tag.colortexto }}
            >
              {tag.nombre}
            </p>
            <p>,</p>
          </Fragment>
        );
      })}
    </div>
  );
}
