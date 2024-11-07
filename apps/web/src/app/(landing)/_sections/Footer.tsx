import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Separator } from "@repo/ui/components/separator";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#D6CDA8] px-4 py-8 font-['Abhaya_Libre'] text-black">
      <MaxWidthWrapper className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="sm:mb-3 mb-5 flex flex-col md:flex-row items-center justify-between sm:gap-0 gap-3">
            <h2 className="text-2xl font-semibold">Heladería Villaizan</h2>

            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-6">
              <SocialLink
                href="https://www.facebook.com/@VillaizanArtesanal"
                image="/facebook-logo.png"
                label="@VillaizanArtesanal"
              />
              <SocialLink
                href="https://www.instagram.com/villaizanpaletasartesanales/"
                image="/instagram-logo.png"
                label="@villaizanpaletasartesanales"
              />
            </div>
          </div>
          <p className="text-inherit md:max-w-[400px]">
            Disfruta de los mejores helados artesanales con una variedad de sabores únicos. ¡Endulza tu día
            con nosotros!
          </p>
        </div>
        <Separator className="bg-black" />
        <p className="text-center text-sm text-inherit">
          &copy; {new Date().getFullYear()} Heladería Villaizan. Todos los derechos reservados.
        </p>
      </MaxWidthWrapper>
    </footer>
  );
};

function SocialLink({ href, image, label }: { href: string; image: string; label: string }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="flex h-fit w-fit flex-row items-end gap-2 hover:underline"
    >
      <Image height={4} width={4} alt="logo" src={image} className="h-5 w-5 shrink-0 rounded" />
      <p className="font-semibold leading-[17px]">{label}</p>
    </a>
  );
}

export default Footer;
