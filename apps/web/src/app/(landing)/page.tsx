// page.tsx
import dynamic from "next/dynamic";
import Faqs from "./_components/faqs";
import Hero from "./_sections/Hero";
import Nosotros from "./_sections/Nosotros";
import Publicaciones from "./_sections/Publicaciones";
import Sabores from "./_sections/Sabores";

const MapComponent = dynamic(() => import("./_components/map"), { ssr: false });

export default function Page(): JSX.Element {
  return (
    <>
      <Hero />
      <Sabores />
      <Nosotros />
      <Publicaciones />
      <MapComponent />
      <Faqs />
    </>
  );
}
