"use server";

import { auth } from "@web/auth";
import { Categoria, Comentario, ControlledError, Response, VersionPublicacion } from "@web/types";
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
import { Button } from "@repo/ui/components/button";
import { Textarea } from "@repo/ui/components/textarea";
import { cn } from "@repo/ui/lib/utils";
import MaxWidthWrapper from "../../_components/MaxWidthWrapper";
import CommentBox from "./_components/CommentBox";
import FacebookLogo from "./_components/FacebookLogo";
import InstagramLogo from "./_components/InstagramLogo";
import LinkedinLogo from "./_components/LinkedinLogo";
import XLogo from "./_components/XLogo";
import "./postStyles.css";

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
    name: "instagram",
    logo: InstagramLogo,
    href: "https://wa.me/?text=",
  },
];

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

    if (response.data.status !== "Success") throw new Error(response.data.message);

    return response.data.result;
  } catch (error) {
    console.log("Error fetching publication data -> ", error);
    return null;
  }
}

export default async function PublicacionPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  const user = session?.user;

  const slug = (await params).slug;

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
                width={100}
                height={100}
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

          <section className="flex flex-1 flex-col">
            <CategoryDisplay categories={publicacion.categorias} />
            <p className="text-5xl font-semibold">{publicacion.titulo}</p>
            <p className="italic">
              Fecha de publicación: {formatDDMMAAAA_HHSS(publicacion.fechapublicacion || undefined)}
            </p>
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
                      key={idx}
                      className="cursor-pointer transition-colors hover:fill-red-800"
                      href={`${share_url.href}${process.env.NEXT_PUBLIC_APP_URL}/publicaciones/${slug}`}
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
          <span className="font-semibold">{comentario.vi_usuario?.nombre || "Renzo Pinto"}</span>
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

function CategoryDisplay({ categories, className }: { categories: Categoria[]; className?: string }) {
  return (
    <div className={cn("flex flex-row items-center gap-2", className)}>
      {categories.map((category, idx) => {
        if (idx === categories.length - 1) {
          return (
            <Link
              key={idx}
              className="cursor-pointer hover:underline"
              href={`/publicaciones?categoria=${category.id}`}
            >
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
